import tokenInstance from "../apis/tokenInstance";
import { Grade } from "../types/grades.ts"; // 타입을 별도 파일로 분리할 경우 경로 수정
import { ApiResponse } from "../types/common";

// {학년, 학기}로 학생 성적 조회
export const getStudentGrade = async (
  year: number,
  semester: number,
  studentId: number,
): Promise<Grade[]> => {
  const response = await tokenInstance.get<ApiResponse<Grade[]>>(
    `/rest-api/v1/grade/filter/${studentId}`,
    { params: { year, semester } },
  );
  console.log(response.data);
  return response.data.data;
};

// 학생 성적 생성(선생님 권한)
// export const getStudentGrade = async (
//   year: number,
//   semester: number,
//   studentId: number,
// ): Promise<Grade[]> => {
//   const response = await tokenInstance.get<ApiResponse<Grade[]>>(
//     `/rest-api/v1/grade/filter/${studentId}`,
//     { params: { year, semester } },
//   );
//   console.log(response.data);
//   return response.data.data;
// };
