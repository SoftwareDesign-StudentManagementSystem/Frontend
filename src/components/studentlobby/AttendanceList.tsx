import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getFilteredMyAttendance,
  getFilteredStudentAttendance,
  updateAttendance,
} from "../../apis/attendance";
import {
  AttendanceState,
  PeriodType,
  SemesterType,
  UpdateAttendanceProps,
} from "../../types/attendance";
import { useLoading } from "../../stores/LoadingProvider";
import useUserStore from "../../stores/useUserStore";
// import { UserDetailInfo } from "../../types/members";

interface Props {
  studentId: number;
  selectedGrade: number;
  selectedMonth?: string;
  miniview?: boolean;
  // studentInfo?: UserDetailInfo;
  canEdit?: boolean;
}

// ⬇️ 현재월 구해서 기본값으로 사용
const getCurrentMonthLabel = () => {
  const now = new Date();
  return `${now.getMonth() + 1}월`;
};
const parseMonthFromLabel = (label: string): number => {
  return parseInt(label.replace("월", ""), 10);
};

const getCurrentSemester = (month: number): number => {
  if (month >= 3 && month <= 7) {
    return 1;
  } else if (month >= 9 && month <= 12) {
    return 2;
  } else {
    throw new Error("유효하지 않은 학기 범위입니다.");
  }
};

const AttendanceList = ({
  studentId,
  selectedGrade,
  selectedMonth = getCurrentMonthLabel(), // ✅ 현재월로 기본값 설정
  miniview,
  // studentInfo,
  canEdit = false,
}: Props) => {
  const [attendanceData, setAttendanceData] = useState<
    {
      id: number;
      year: number;
      semester: string;
      date: string;
      rawDate: string;
      periods: { period: PeriodType; state: AttendanceState | "" }[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { showLoading, hideLoading } = useLoading();
  const { userInfo } = useUserStore(); // ✅ 현재 로그인한 사용자 정보

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        if (!miniview) showLoading();
        else setLoading(true);

        const month = parseMonthFromLabel(selectedMonth); // ✅ 여기서 숫자로 변환
        const currentSemester = getCurrentSemester(month);

        const data =
          userInfo.role === "ROLE_STUDENT"
            ? await getFilteredMyAttendance(
                selectedGrade,
                currentSemester,
                month,
              )
            : await getFilteredStudentAttendance(
                studentId,
                selectedGrade,
                currentSemester,
                month,
              );

        const transformed = data
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((item) => ({
            id: item.id,
            year: item.year,
            semester: item.semester,
            date: formatDate(item.date),
            rawDate: item.date,
            periods: Array.from({ length: 8 }, (_, i) => {
              const period = item.periodAttendanceDtos.find(
                (p) => p.period === `PERIOD_${i + 1}`,
              );
              return {
                period: `PERIOD_${i + 1}` as PeriodType,
                state: (period?.state ?? "") as AttendanceState | "",
              };
            }),
          }));

        setAttendanceData(miniview ? transformed.slice(0, 3) : transformed);

        if (!miniview) hideLoading();
        else setLoading(false);
      } catch (error) {
        console.error("출결 정보를 불러오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studentId, userInfo.role, selectedMonth, selectedGrade]);
  const attendanceStates: AttendanceState[] = ["출석", "결석", "지각", "조퇴"];

  const getNextState = (current: AttendanceState | ""): AttendanceState => {
    const index = attendanceStates.indexOf(current as AttendanceState);
    return attendanceStates[(index + 1) % attendanceStates.length];
  };

  const handleCellClick = async (dayIndex: number, periodIndex: number) => {
    if (!canEdit || miniview) return;

    const target = attendanceData[dayIndex];
    const updatedState = getNextState(target.periods[periodIndex].state);

    const updatedPeriods = [...target.periods];
    updatedPeriods[periodIndex] = {
      ...updatedPeriods[periodIndex],
      state: updatedState,
    };

    const validPeriods = updatedPeriods.filter(
      (p): p is { period: PeriodType; state: AttendanceState } =>
        ["출석", "결석", "지각", "조퇴"].includes(p.state),
    );

    const updatedAttendance: UpdateAttendanceProps = {
      year: target.year,
      semester: target.semester as SemesterType,
      date: target.rawDate,
      periodAttendances: validPeriods,
    };

    try {
      await updateAttendance(target.id, updatedAttendance);
      const newData = [...attendanceData];
      newData[dayIndex] = {
        ...newData[dayIndex],
        periods: updatedPeriods,
      };
      setAttendanceData(newData);
    } catch (err) {
      alert("출결 수정 실패");
      console.error(err);
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const convertState = (state: string) => {
    switch (state) {
      // case "출석":
      //   return "";
      case "결석":
        return "🖤";
      case "지각":
        return "×";
      case "조퇴":
        return "◎";
      default:
        return "O";
    }
  };

  return (
    <AttendanceTableWrapper>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            {[...Array(8)].map((_, i) => (
              <th key={i}>{i + 1}교시</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={9} className="nodata">
                로딩 중...
              </td>
            </tr>
          ) : attendanceData.length === 0 ? (
            <tr>
              <td colSpan={9} className="nodata">
                출결 정보가 없습니다.
              </td>
            </tr>
          ) : (
            attendanceData.map((day, dayIndex) => (
              <tr key={dayIndex}>
                <td>{day.date}</td>
                {day.periods.map((p, periodIndex) => (
                  <td
                    key={periodIndex}
                    onClick={() => handleCellClick(dayIndex, periodIndex)}
                    style={{
                      cursor: canEdit && !miniview ? "pointer" : "default",
                      opacity: canEdit ? 1 : 0.6,
                    }}
                  >
                    {convertState(p.state)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AttendanceTableWrapper>
  );
};

export default AttendanceList;

const AttendanceTableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #f1f2f8;
    padding: 10px;
    text-align: center;
  }

  th {
    font-weight: bold;
    text-align: center;
  }

  .nodata {
    text-align: center;
    padding: 60px 0;
    color: #888;
    font-size: 15px;
    background-color: #f8f8f8;
  }
`;
