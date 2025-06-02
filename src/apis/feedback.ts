import tokenInstance from "../apis/tokenInstance";
import { Feedback } from "../types/feedback";
import { ApiResponse } from "../types/common";

// 1. 학생 id로 모든 피드백 조회 [학부모/선생님 권한]
export const getFeedback = async (studentId: number): Promise<Feedback[]> => {
  console.log("학생 id:", studentId);
  const response = await tokenInstance.get<ApiResponse<Feedback[]>>(
    `/rest-api/v1/feedback/${studentId}`,
  );
  console.log("학생 피드백 조회 성공:", response.data);
  return response.data.ieduPage.contents;
};

// 2. 본인의 모든 피드백 조회 [학생 권한]
export const getMyFeedback = async (): Promise<Feedback[]> => {
  const response = await tokenInstance.get<ApiResponse<Feedback[]>>(
    `/rest-api/v1/feedback`,
  );
  console.log("내 피드백 조회 성공:", response.data);
  return response.data.ieduPage.contents;
};

// 3. (학년/학기)로 본인 피드백 조회 [학생 권한]
export const getMyFilteredFeedback = async (
  year: number,
  semester: string,
): Promise<Feedback[]> => {
  const response = await tokenInstance.get<Feedback[]>(
    `/rest-api/v1/feedback/filter`,
    {
      params: { year, semester },
    },
  );
  console.log("내 필터 피드백 조회 성공:", response.data);
  return response.data;
};

// 4. (학년/학기)로 특정 학생 피드백 조회 [학부모/선생님 권한]
export const getStudentFilteredFeedback = async (
  studentId: number,
  year: number,
  semester: string,
): Promise<Feedback[]> => {
  const response = await tokenInstance.get<Feedback[]>(
    `/rest-api/v1/feedback/filter/${studentId}`,
    {
      params: { year, semester },
    },
  );
  console.log("학생 필터 피드백 조회 성공:", response.data);
  return response.data;
};

// 5. 피드백 기록 추가 [선생님 권한] - 이미 구현되어 있음
// feedback.ts
export const postFeedback = async (
  studentId: number,
  feedback: {
    year: number;
    semester: string;
    category: string;
    content: string;
    visibleToStudent: boolean;
    visibleToParent: boolean;
    date: string;
  },
): Promise<any> => {
  try {
    const response = await tokenInstance.post(
      `/rest-api/v1/feedback/${studentId}`,
      feedback,
    );
    console.log("피드백 추가 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("피드백 추가 실패:", error);
    throw error;
  }
};

// 6. 피드백 수정 [선생님 권한]
export const putFeedback = async (
  feedbackId: number,
  updatedData: {
    year: number;
    semester: string;
    category: string;
    content: string;
    visibleToStudent: boolean;
    visibleToParent: boolean;
    date: string;
  },
): Promise<void> => {
  try {
    await tokenInstance.put(`/rest-api/v1/feedback/${feedbackId}`, updatedData);
    console.log("피드백 수정 성공");
  } catch (error) {
    console.error("피드백 수정 실패:", error);
    throw error;
  }
};

// 7. 피드백 삭제 [선생님 권한]
export const deleteFeedback = async (feedbackId: number): Promise<void> => {
  try {
    await tokenInstance.delete(`/rest-api/v1/feedback/${feedbackId}`);
    console.log("피드백 삭제 성공");
  } catch (error) {
    console.error("피드백 삭제 실패:", error);
    throw error;
  }
};
