import tokenInstance from "../apis/tokenInstance";
import { Consult } from "../types/consults.ts";

// 학생 id로 상담 기록 조회
export const getConsult = async (studentId: number): Promise<Consult[]> => {
  const response = await tokenInstance.get<Consult[]>(
    `/rest-api/v1/counsel/${studentId}`,
  );
  console.log("getconsult");
  console.log(response.data);
  return response.data;
};

// 교사가 상담 기록 추가

// 상담 기록 추가 함수
export const postConsult = async (consultData: {
  studentId: string | null;
  teacherId: number;
  date: Date | null;
  content: string;
  visibleToStudent: boolean;
  visibleToParent: boolean;
}): Promise<any> => {
  try {
    const response = await tokenInstance.post(
      "/rest-api/v1/counsel",
      consultData,
    );
    console.log("상담 기록 추가 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("상담 기록 추가 실패:", error);
    throw error;
  }
};
