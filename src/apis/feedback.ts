import tokenInstance from "../apis/tokenInstance";
import { Feedback, AddFeedbackProps } from "../types/feedback.ts";

// 학생 id로 피드백 기록 조회
export const getFeedback = async (studentId: number): Promise<Feedback[]> => {
  const response = await tokenInstance.get<Feedback[]>(
    `/rest-api/v1/feedback/${studentId}`,
  );
  console.log("feedback");
  console.log(response.data);
  return response.data;
};

// 피드백 기록 추가 함수
export const postFeedback = async (
  consultData: AddFeedbackProps,
): Promise<any> => {
  try {
    const response = await tokenInstance.post(
      "/rest-api/v1/feedback",
      consultData,
    );
    console.log("피드백 추가 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("피드백 추가 실패:", error);
    throw error;
  }
};
