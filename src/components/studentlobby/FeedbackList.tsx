import styled from "styled-components";
import { useEffect, useState } from "react";
import { getFeedback } from "../../apis/feedback.ts";
import { Feedback } from "../../types/feedback.ts";

const FeedbackList = ({
  studentId,
  miniView,
  onSelectFeedback,
}: {
  studentId: number;
  miniView?: boolean;
  onSelectFeedback?: (feedback: Feedback) => void;
}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    console.log("studentId:", studentId);
    getFeedback(studentId).then((res) => {
      const sortedFeedbacks = res.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setFeedbacks(sortedFeedbacks);
    });
  }, [studentId]);

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
        {feedbacks.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={4} className="nodata">
                피드백 정보가 없습니다.
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {(miniView ? feedbacks.slice(0, 3) : feedbacks).map(
              (feedback, index) => {
                const formatDate = (dateStr: string) => {
                  const date = new Date(dateStr);
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const day = date.getDate().toString().padStart(2, "0");
                  return `${month}/${day}`;
                };

                return (
                  <tr
                    key={index}
                    onClick={() => onSelectFeedback?.(feedback)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{formatDate(feedback.date)}</td>
                    <td>{feedback.category}</td>
                    <td>{feedback.teacherName}</td>
                    <td>{feedback.content}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        )}
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

  .nodata {
    text-align: center;
    padding: 60px 0;
    background-color: #f8f8f8;
    color: #999;
    font-size: 16px;
  }
`;
