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
