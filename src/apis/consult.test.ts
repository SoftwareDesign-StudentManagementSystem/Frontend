import {
  getConsult,
  postConsult,
  putConsult,
  deleteConsult,
  getConsultByFilter,
  getFilteredConsultsForStudents,
} from "./consult";
import tokenInstance from "../apis/tokenInstance";

jest.mock("../apis/tokenInstance");

describe("consult API 함수들", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("학생 상담 기록을 조회해야 함", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: {
        ieduPage: {
          contents: ["상담1", "상담2"],
        },
      },
    });

    const result = await getConsult(1);

    expect(tokenInstance.get).toHaveBeenCalledWith("/rest-api/v1/counsel/1");
    expect(result).toEqual(["상담1", "상담2"]);
  });

  it("상담 기록을 추가해야 함", async () => {
    const data = {
      year: 2025,
      semester: "FIRST_SEMESTER",
      content: "학생과 학습 상담 진행",
      nextCounselDate: new Date("2025-06-15"),
      date: "2025-06-01",
    };

    (tokenInstance.post as jest.Mock).mockResolvedValue({
      data: { success: true },
    });

    const result = await postConsult(2, data);

    expect(tokenInstance.post).toHaveBeenCalledWith(
      "/rest-api/v1/counsel/2",
      data,
    );
    expect(result).toEqual({ success: true });
  });

  it("상담 기록을 수정해야 함", async () => {
    const data = {
      year: 2025,
      semester: "SECOND_SEMESTER",
      content: "수정된 상담 내용",
      nextCounselDate: "2025-06-20",
      date: "2025-06-01",
    };

    (tokenInstance.put as jest.Mock).mockResolvedValue({
      data: { success: true },
    });

    const result = await putConsult(10, data);

    expect(tokenInstance.put).toHaveBeenCalledWith(
      "/rest-api/v1/counsel/10",
      data,
    );
    expect(result).toEqual({ success: true });
  });

  it("상담 기록을 삭제해야 함", async () => {
    (tokenInstance.delete as jest.Mock).mockResolvedValue(undefined);

    await deleteConsult(11);

    expect(tokenInstance.delete).toHaveBeenCalledWith(
      "/rest-api/v1/counsel/11",
    );
  });

  it("필터로 특정 학생 상담을 조회해야 함", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: ["상담3", "상담4"],
    });

    const result = await getConsultByFilter(3, 2, "SECOND_SEMESTER");

    expect(tokenInstance.get).toHaveBeenCalledWith(
      "/rest-api/v1/counsel/filter/3",
      { params: { year: 2, semester: "SECOND_SEMESTER" } },
    );
    expect(result).toEqual(["상담3", "상담4"]);
  });

  it("다수 학생 상담을 조회해야 함", async () => {
    const filters = {
      grade: 3,
      classNum: 2,
      studentNum: 15,
      semester: "FIRST_SEMESTER" as const,
    };

    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: ["상담A", "상담B"],
    });

    const result = await getFilteredConsultsForStudents(filters);

    expect(tokenInstance.get).toHaveBeenCalledWith(
      "/rest-api/v1/counsel/filter/students",
      { params: filters },
    );
    expect(result).toEqual(["상담A", "상담B"]);
  });
});
