import styled from "styled-components";

const FeedbackList = () => {
  const feedbacks = [
    {
      date: "2025-04-01",
      type: "성적",
      teacher: "김철수",
      content:
        "수학 시험에서 우수한 성적을 거두었습니다. 계속 좋은 성적을 유지하세요!",
    },
    {
      date: "2025-04-02",
      type: "태도",
      teacher: "이영희",
      content: "수업 시간에 적극적으로 참여하여 좋은 태도를 보였습니다.",
    },
    {
      date: "2025-04-03",
      type: "출결",
      teacher: "박민수",
      content: "지각이 잦아 출결 관리에 신경 써야 합니다.",
    },
    {
      date: "2025-04-04",
      type: "행동",
      teacher: "정다혜",
      content: "친구들과의 협력적인 태도가 돋보였습니다.",
    },
    {
      date: "2025-04-05",
      type: "성적",
      teacher: "최성호",
      content: "영어 과목에서 전보다 향상된 성적을 보였습니다.",
    },
  ];

  return (
    <FeedbackListWrapper>
      <table>
        <thead>
          <tr>
            <th>일자</th>
            <th>유형</th>
            <th>작성 교사명</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.slice(0, 3).map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.date}</td>
              <td>{feedback.type}</td>
              <td>{feedback.teacher}</td>
              <td>{feedback.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </FeedbackListWrapper>
  );
};

export default FeedbackList;

const FeedbackListWrapper = styled.div`
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
