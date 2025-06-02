import tokenInstance from "../apis/tokenInstance";
import { Consult } from "../types/consults.ts";
import { ApiResponse } from "../types/common";

// 학생 id로 상담 기록 조회
export const getConsult = async (studentId: number): Promise<Consult[]> => {
  const response = await tokenInstance.get<ApiResponse<Consult[]>>(
    `/rest-api/v1/counsel/${studentId}`,
  );
  console.log("getconsult");
  console.log(response.data);
  return response.data.ieduPage.contents;
};

// 교사가 상담 기록 추가
export const postConsult = async (
  studentId: number,
  consultData: {
    year: number;
    semester: string;
    content: string;
    nextCounselDate: Date;
    date: string;
  },
): Promise<any> => {
  try {
    const response = await tokenInstance.post(
      `/rest-api/v1/counsel/${studentId}`,
      consultData,
    );
    console.log("상담 기록 추가 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("상담 기록 추가 실패:", error);
    throw error;
  }
};

// 상담 수정
export const putConsult = async (
  consultId: number,
  consultData: {
    year: number;
    semester: string;
    content: string;
    nextCounselDate: string;
    date: string;
  },
): Promise<any> => {
  try {
    const response = await tokenInstance.put(
      `/rest-api/v1/counsel/${consultId}`,
      consultData,
    );
    console.log("상담 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("상담 수정 실패:", error);
    throw error;
  }
};

// 상담 삭제
export const deleteConsult = async (consultId: number): Promise<void> => {
  try {
    await tokenInstance.delete(`/rest-api/v1/counsel/${consultId}`);
    console.log("상담 삭제 성공");
  } catch (error) {
    console.error("상담 삭제 실패:", error);
    throw error;
  }
};

// 학년/학기별 학생 상담 조회
export const getConsultByFilter = async (
  studentId: number,
  year: number,
  semester: "FIRST_SEMESTER" | "SECOND_SEMESTER",
): Promise<Consult[]> => {
  try {
    const response = await tokenInstance.get<Consult[]>(
      `/rest-api/v1/counsel/filter/${studentId}`,
      {
        params: { year, semester },
      },
    );
    console.log("필터별 상담 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("필터별 상담 조회 실패:", error);
    throw error;
  }
};

// 학년/반/번호/학기로 다수 학생 상담 조회
export const getFilteredConsultsForStudents = async (filters: {
  grade?: number;
  classNum?: number;
  studentNum?: number;
  semester?: "FIRST_SEMESTER" | "SECOND_SEMESTER";
}): Promise<Consult[]> => {
  try {
    const response = await tokenInstance.get<Consult[]>(
      "/rest-api/v1/counsel/filter/students",
      { params: filters },
    );
    console.log("다수 학생 상담 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("다수 학생 상담 조회 실패:", error);
    throw error;
  }
};
