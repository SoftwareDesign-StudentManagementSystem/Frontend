import styled from "styled-components";
import { useEffect, useState } from "react";
import { Consult } from "../../types/consults.ts";
import { getConsult } from "../../apis/consult.ts";

const ConsultList = ({ studentId }: { studentId: number }) => {
  const [consultations, setConsultations] = useState<Consult[]>([]);

  useEffect(() => {
    getConsult(studentId).then((res) => {
      setConsultations(res);
    });
  }, []);

  return (
    <ConsultListWrapper>
      <table>
        <thead>
          <tr>
            <th>상담일</th>
            <th>다음 상담 예정일</th>
            <th>작성 교사명</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {consultations.slice(0, 3).map((consultation, index) => (
            <tr key={index}>
              <td>{consultation.date}</td>
              <td>{consultation.nextDate}</td>
              <td>{consultation.teacher}</td>
              <td>{consultation.content}</td>
            </tr>
          ))}
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
  //margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    //border: 1px solid #f1f2f8;
    //background-color: #f9f9f9;
  }

  th,
  td {
    border: 1px solid #f1f2f8;
    padding: 10px;
    text-align: center;
  }

  .content {
    text-align: left;
  }

  th {
    //background-color: #f0f0f0;
    font-weight: bold;
    text-align: center;
  }
`;
