import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getAttendanceByStudent,
  updateAttendance,
} from "../../apis/attendance";
import {
  AttendanceState,
  PeriodType,
  SemesterType,
  UpdateAttendanceProps,
} from "../../types/attendance";
import { useLoading } from "../../stores/LoadingProvider";

interface Props {
  studentId: number;
  selectedMonth?: string;
  miniview?: boolean;
  canEdit?: boolean; // ✅ 추가: 교사 여부 판단
}

const AttendanceList = ({
                          studentId,
                          selectedMonth = "전체",
                          miniview,
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

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        if (!miniview) showLoading();
        else setLoading(true);

        const data = await getAttendanceByStudent(studentId);

        const filtered = data.filter((item) => {
          if (!selectedMonth || selectedMonth === "전체") return true;
          const month = new Date(item.date).getMonth() + 1;
          return selectedMonth === `${month}월`;
        });

        const transformed = filtered
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
  }, [studentId, selectedMonth]);

  const attendanceStates: AttendanceState[] = ["출석", "결석", "지각", "조퇴"];

  const getNextState = (current: AttendanceState | ""): AttendanceState => {
    const index = attendanceStates.indexOf(current as AttendanceState);
    return attendanceStates[(index + 1) % attendanceStates.length];
  };

  const handleCellClick = async (dayIndex: number, periodIndex: number) => {
    if (!canEdit || miniview) return; // ✅ 수정 권한 없으면 아무 동작도 안 함

    const target = attendanceData[dayIndex];
    const updatedState = getNextState(target.periods[periodIndex].state);

    const updatedPeriods = [...target.periods];
    updatedPeriods[periodIndex] = {
      ...updatedPeriods[periodIndex],
      state: updatedState,
    };

    const validPeriods = updatedPeriods.filter(
      (p): p is { period: PeriodType; state: AttendanceState } =>
        p.state === "출석" ||
        p.state === "결석" ||
        p.state === "지각" ||
        p.state === "조퇴",
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
      case "출석":
        return "O";
      case "결석":
        return "🖤";
      case "지각":
        return "×";
      case "조퇴":
        return "◎";
      default:
        return "-";
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
                    cursor: canEdit && !miniview ? "pointer" : "default", // ✅ 비활성화 시 기본 커서
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
