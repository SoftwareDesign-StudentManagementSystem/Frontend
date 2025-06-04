import tokenInstance from "../apis/tokenInstance";
import { Grade } from "../types/grades";
import { ApiResponse } from "../types/common";

// ✅ 본인의 모든 성적 조회 [학생 권한]
export const getMyGrades = async (): Promise<Grade[]> => {
  const response =
    await tokenInstance.get<ApiResponse<Grade[]>>(`/rest-api/v1/grade`);
  return response.data.data;
};

// ✅ 학생의 모든 성적 조회 [학부모/선생님 권한]
export const getAllGradesByStudent = async (
  studentId: number,
): Promise<Grade[]> => {
  const response = await tokenInstance.get<ApiResponse<Grade[]>>(
    `/rest-api/v1/grade/${studentId}`,
  );
  return response.data.data;
};

// ✅ (학년/반/번호/학기)로 학생들 성적 조회 [선생님 권한]
export const getGradesByClassFilter = async (params: {
  year: number;
  semester: number;
  grade: number;
  classNum: number;
  studentNum: number;
}): Promise<Grade[]> => {
  const response = await tokenInstance.get<ApiResponse<Grade[]>>(
    `/rest-api/v1/grade/filter/students`,
    { params },
  );
  return response.data.data;
};

// ✅ 학생 성적 생성 [선생님 권한]
export const createStudentGrade = async (
  studentId: number,
  data: {
    year: number;
    semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
    score: number;
  },
) => {
  console.log(data);
  const response = await tokenInstance.post(
    `/rest-api/v1/grade/${studentId}`,
    data,
  );
  console.log(response);
  return response;
};

// ✅ 학생 성적 수정 [선생님 권한]
export const updateStudentGrade = async (
  gradeId: number,
  gradeData: Partial<Grade>, // 수정 가능한 필드만
): Promise<Grade> => {
  const response = await tokenInstance.put<ApiResponse<Grade>>(
    `/rest-api/v1/grade/${gradeId}`,
    gradeData,
  );
  console.log(response.data);
  return response.data.data;
};

// ✅ 학생 성적 삭제 [선생님 권한]
export const deleteStudentGrade = async (gradeId: number): Promise<void> => {
  await tokenInstance.delete(`/rest-api/v1/grade/${gradeId}`);
  console.log(gradeId);
};

// ✅ 기존 구현 (학년/학기)로 학생 성적 조회 [학부모/선생님 권한]
export const getStudentGrade = async (
  year: number,
  semester: number,
  studentId: number,
): Promise<Grade> => {
  const response = await tokenInstance.get<ApiResponse<Grade>>(
    `/rest-api/v1/grade/filter/${studentId}`,
    { params: { year, semester } },
  );
  console.log(response.data.data);
  return response.data.data;
};

// ✅ 기존 구현 (학년/학기)로 본인 성적 조회 [학생 권한]
export const getStudentMyGrade = async (
  year: number,
  semester: number,
): Promise<Grade> => {
  const response = await tokenInstance.get<ApiResponse<Grade>>(
    `/rest-api/v1/grade/filter`,
    { params: { year, semester } },
  );
  return response.data.data;
};
