import tokenInstance from "../apis/tokenInstance";
import {
  Specialty,
  AddSpecialtyProps,
  UpdateSpecialtyProps,
} from "../types/specialnotes";
import { ApiResponse } from "../types/common";

// 1. 학생의 모든 특기사항 조회
export const getAllSpecialties = async (
  studentId: number,
): Promise<Specialty[]> => {
  const response = await tokenInstance.get<ApiResponse<Specialty[]>>(
    `/rest-api/v1/specialty/${studentId}`,
  );
  console.log("특기사항 전체 조회:", response.data.ieduPage.contents);
  return response.data.ieduPage.contents;
};

// 2. (학년/학기)로 학생 특기사항 조회
export const getFilteredSpecialties = async (
  studentId: number,
): Promise<Specialty[]> => {
  const response = await tokenInstance.get<Specialty[]>(
    `/rest-api/v1/specialty/filter/${studentId}`,
  );
  console.log("특기사항 필터 조회:", response.data);
  return response.data;
};

// 3. 학생 특기사항 생성
export const postSpecialty = async (
  studentId: number,
  specialtyData: AddSpecialtyProps,
): Promise<any> => {
  try {
    const response = await tokenInstance.post(
      `/rest-api/v1/specialty/${studentId}`,
      specialtyData,
    );
    console.log("특기사항 추가 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("특기사항 추가 실패:", error);
    throw error;
  }
};

// 4. 학생 특기사항 수정
export const updateSpecialty = async (
  specialtyId: number,
  specialtyData: { content: string; year: number; semester: string },
): Promise<any> => {
  try {
    const response = await tokenInstance.put(
      `/rest-api/v1/specialty/${specialtyId}`,
      specialtyData,
    );
    console.log("특기사항 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("특기사항 수정 실패:", error);
    throw error;
  }
};

// 5. 학생 특기사항 삭제
export const deleteSpecialty = async (specialtyId: number): Promise<void> => {
  try {
    await tokenInstance.delete(`/rest-api/v1/specialty/${specialtyId}`);
    console.log("특기사항 삭제 성공");
  } catch (error) {
    console.error("특기사항 삭제 실패:", error);
    throw error;
  }
};
