import styled from "styled-components";
import { useEffect, useState } from "react";
import { getFeedback } from "../../apis/feedback.ts";
import { Feedback } from "../../types/feedback.ts";

const FeedbackList = ({ studentId }: { studentId: number }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    getFeedback(studentId).then((res) => {
      setFeedbacks(res);
    });
  }, []);

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
              <td>{feedback.recordedDate}</td>
              <td>{feedback.category}</td>
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
