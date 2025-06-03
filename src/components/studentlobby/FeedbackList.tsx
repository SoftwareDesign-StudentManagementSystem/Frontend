import styled from "styled-components";
import { useEffect, useState } from "react";
import { getFeedback, getMyFeedback } from "../../apis/feedback";
import { Feedback } from "../../types/feedback";
import useUserStore from "../../stores/useUserStore"; // ✅ 사용자 정보 가져오기

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
  const { userInfo } = useUserStore(); // ✅ 사용자 역할 확인

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        let res: Feedback[] = [];

        if (userInfo.role === "ROLE_STUDENT") {
          res = await getMyFeedback(); // ✅ 학생은 본인 피드백만 조회
        } else {
          res = await getFeedback(studentId); // ✅ 교사/관리자/학부모는 특정 학생의 피드백 조회
        }

        const sortedFeedbacks = res.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setFeedbacks(sortedFeedbacks);
      } catch (err) {
        console.error("피드백 조회 실패:", err);
      }
    };

    fetchFeedbacks();
  }, [studentId, userInfo.role]);

  return (
    <FeedbackListWrapper>
      <table>
        <thead>
          <tr>
            <th>일자</th>
            <th>유형</th>
            <th>작성 교사</th>
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
                    <td className="content">{feedback.content}</td>
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
