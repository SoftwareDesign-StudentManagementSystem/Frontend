import tokenInstance from "./tokenInstance";

export const postReportRequest = async (reportData: {
  studentIdList: number[];
  year: number;
  semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
  reportFormat: string;
  grade: boolean;
  attendance: boolean;
  counsel: boolean;
  feedback: boolean;
  specialty: boolean;
}): Promise<any> => {
  try {
    const response = await tokenInstance.post(
      "/rest-api/v1/report",
      reportData,
    );
    console.log("📄 보고서 생성 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 보고서 생성 실패:", error);
    throw error;
  }
};
