import tokenInstance from "../apis/tokenInstance";
import {
  getAllSpecialties,
  getFilteredSpecialties,
  postSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from "./specialnote";
import { Specialty } from "../types/specialnotes";

jest.mock("../apis/tokenInstance");

describe("Specialty API", () => {
  const mockSpecialty: Specialty = {
    teacherName: "김선생님",
    id: 1,
    studentId: 1001,
    content: "리더십을 발휘하여 모둠활동을 주도함",
    year: 3,
    semester: "FIRST_SEMESTER",
    date: "2025-05-28",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("학생의 모든 특기사항 조회", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: { ieduPage: { contents: [mockSpecialty] } },
    });

    const result = await getAllSpecialties(1001);
    expect(result).toEqual([mockSpecialty]);
    expect(tokenInstance.get).toHaveBeenCalledWith(
      "/rest-api/v1/specialty/1001",
    );
  });

  it("(학년/학기)로 특기사항 조회", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: [mockSpecialty],
    });

    const result = await getFilteredSpecialties(1001);
    expect(result).toEqual([mockSpecialty]);
    expect(tokenInstance.get).toHaveBeenCalledWith(
      "/rest-api/v1/specialty/filter/1001",
    );
  });

  it("특기사항 추가", async () => {
    (tokenInstance.post as jest.Mock).mockResolvedValue({
      data: { message: "등록 성공" },
    });

    const newData = {
      year: 2024,
      semester: "FIRST_SEMESTER" as const,
      content: "창의적인 프로젝트 수행",
      date: "2024-03-25",
    };

    const result = await postSpecialty(1001, newData);
    expect(result).toEqual({ message: "등록 성공" });
    expect(tokenInstance.post).toHaveBeenCalledWith(
      "/rest-api/v1/specialty/1001",
      newData,
    );
  });

  it("특기사항 수정", async () => {
    (tokenInstance.put as jest.Mock).mockResolvedValue({
      data: { message: "수정 성공" },
    });

    const updatedData = {
      content: "책임감 있게 과제 수행",
      date: "2024-03-30",
    };

    const result = await updateSpecialty(1, updatedData);
    expect(result).toEqual({ message: "수정 성공" });
    expect(tokenInstance.put).toHaveBeenCalledWith(
      "/rest-api/v1/specialty/1",
      updatedData,
    );
  });

  it("특기사항 삭제", async () => {
    (tokenInstance.delete as jest.Mock).mockResolvedValue({});

    await deleteSpecialty(1);
    expect(tokenInstance.delete).toHaveBeenCalledWith(
      "/rest-api/v1/specialty/1",
    );
  });
});
