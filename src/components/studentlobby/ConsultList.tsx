import styled from "styled-components";

const ConsultList = () => {
  const consultations = [
    {
      date: "2025-04-01",
      nextDate: "2025-04-15",
      teacher: "김철수",
      content: "학생의 학업 성취도를 점검하고 학습 계획을 조정하였습니다.",
    },
    {
      date: "2025-04-02",
      nextDate: "2025-04-16",
      teacher: "이영희",
      content: "수업 참여 태도와 학습 습관에 대해 논의하였습니다.",
    },
    {
      date: "2025-04-03",
      nextDate: "2025-04-17",
      teacher: "박민수",
      content: "출결 상태와 지각 문제를 해결하기 위한 방안을 논의하였습니다.",
    },
    {
      date: "2025-04-04",
      nextDate: "2025-04-18",
      teacher: "정다혜",
      content: "교우 관계 및 협력적인 태도에 대한 피드백을 제공하였습니다.",
    },
    {
      date: "2025-04-05",
      nextDate: "2025-04-19",
      teacher: "최성호",
      content: "학업 성취도 향상을 위한 추가 학습 방법을 논의하였습니다.",
    },
  ];

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
