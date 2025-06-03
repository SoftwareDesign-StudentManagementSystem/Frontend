import { postReportRequest } from "./reportcreate";
import tokenInstance from "../apis/tokenInstance";

jest.mock("../apis/tokenInstance");

describe("보고서 생성 API 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("보고서 생성 요청 성공", async () => {
    const mockRequest = {
      studentIdList: [1001, 1002],
      year: 2025,
      semester: "FIRST_SEMESTER" as const, // ✅ 타입을 리터럴로 고정
      reportFormat: "PDF",
      grade: true,
      attendance: true,
      counsel: true,
      feedback: true,
      specialty: false,
    };

    const mockResponse = {
      code: "SUCCESS",
      message: "보고서 생성 완료",
      data: {
        reportUrl: "https://example.com/report.pdf",
      },
    };

    (tokenInstance.post as jest.Mock).mockResolvedValue({
      data: mockResponse,
    });

    const result = await postReportRequest(mockRequest);

    expect(tokenInstance.post).toHaveBeenCalledWith(
      "/rest-api/v1/report",
      mockRequest,
    );
    expect(result).toEqual(mockResponse);
  });

  it("보고서 생성 요청 실패", async () => {
    const mockRequest = {
      studentIdList: [1001, 1002],
      year: 2025,
      semester: "FIRST_SEMESTER" as const, // ✅ 타입을 리터럴로 고정
      reportFormat: "PDF",
      grade: true,
      attendance: true,
      counsel: true,
      feedback: true,
      specialty: false,
    };

    const mockError = new Error("보고서 생성 실패");

    (tokenInstance.post as jest.Mock).mockRejectedValue(mockError);

    await expect(postReportRequest(mockRequest)).rejects.toThrow(
      "보고서 생성 실패",
    );
    expect(tokenInstance.post).toHaveBeenCalledWith(
      "/rest-api/v1/report",
      mockRequest,
    );
  });
});
