import styled from "styled-components";
import { useEffect, useState } from "react";
import { Consult } from "../../types/consults.ts";
import { getConsult } from "../../apis/consult.ts";
import { useLoading } from "../../stores/LoadingProvider.tsx";

const ConsultList = ({
  studentId,
  onSelect,
  miniView,
}: {
  studentId: number;
  onSelect?: (consult: Consult) => void;
  miniView?: boolean;
}) => {
  const { showLoading, hideLoading } = useLoading();
  const [consultations, setConsultations] = useState<Consult[]>([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        showLoading();
        const res = await getConsult(studentId);
        const sortedConsultations = res.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setConsultations(sortedConsultations);
      } catch (error) {
        console.error("상담 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        hideLoading();
      }
    };

    fetchConsultations();
  }, [studentId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

  return (
    <ConsultListWrapper>
      <table>
        <thead>
          <tr>
            <th>상담일</th>
            <th>다음 상담</th>
            <th>작성 교사</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {consultations.length === 0 ? (
            <tr>
              <td colSpan={4} className="nodata">
                상담 정보가 없습니다.
              </td>
            </tr>
          ) : (
            (miniView ? consultations.slice(0, 3) : consultations).map(
              (consultation, index) => (
                <tr
                  key={index}
                  onClick={() => onSelect?.(consultation)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{formatDate(consultation.date)}</td>
                  <td>{formatDate(consultation.nextCounselDate)}</td>
                  <td>{consultation.teacherName}</td>
                  <td className="content">{consultation.content}</td>
                </tr>
              ),
            )
          )}
        </tbody>
      </table>
    </ConsultListWrapper>
  );
};

export default ConsultList;

const ConsultListWrapper = styled.div`
  width: 100%;
  display: flex;
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

  .content {
    text-align: left;
    min-width: 200px;
    max-width: 250px; /* 필요에 따라 너비 조절 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    font-weight: bold;
    text-align: center;
  }

  .nodata {
    text-align: center;
    padding: 60px 0;
    background-color: #f8f8f8;
    color: #999;
    font-size: 16px;
  }
`;
