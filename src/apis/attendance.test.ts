import tokenInstance from "../apis/tokenInstance";
import {
  getAttendanceByStudent,
  getMyAttendance,
  getFilteredMyAttendance,
  getFilteredStudentAttendance,
  postAttendance,
  updateAttendance,
  deleteAttendance,
} from "./attendance";
import { AddAttendanceProps, UpdateAttendanceProps } from "../types/attendance";

jest.mock("../apis/tokenInstance", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("attendance API 함수들", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("학생 출결 조회 (선생님/학부모)", async () => {
    const mockData = { ieduPage: { contents: ["출결1", "출결2"] } };
    (tokenInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getAttendanceByStudent(1);

    expect(tokenInstance.get).toHaveBeenCalledWith("/rest-api/v1/attendance/1");
    expect(result).toEqual(["출결1", "출결2"]);
  });

  it("내 출결 조회 (학생)", async () => {
    const mockData = { ieduPage: { contents: ["출결3"] } };
    (tokenInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getMyAttendance();

    expect(tokenInstance.get).toHaveBeenCalledWith("/rest-api/v1/attendance");
    expect(result).toEqual(["출결3"]);
  });

  it("내 필터 출결 조회 (학생)", async () => {
    const mockData = { ieduPage: { contents: ["출결4"] } };
    (tokenInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getFilteredMyAttendance(3, 1);

    expect(tokenInstance.get).toHaveBeenCalledWith(
      "/rest-api/v1/attendance/filter",
      {
        params: { year: 3, semester: 1 },
      },
    );
    expect(result).toEqual(["출결4"]);
  });

  it("학생 필터 출결 조회 (선생님/학부모)", async () => {
    const mockData = { ieduPage: { contents: ["출결5"] } };
    (tokenInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getFilteredStudentAttendance(5, 3, 2);

    expect(tokenInstance.get).toHaveBeenCalledWith(
      "/rest-api/v1/attendance/filter/5",
      {
        params: { year: 3, semester: 2 },
      },
    );
    expect(result).toEqual(["출결5"]);
  });

  it("출결 생성 (postAttendance)", async () => {
    const mockData = { result: "success" };
    (tokenInstance.post as jest.Mock).mockResolvedValue({ data: mockData });

    const newAttendance: AddAttendanceProps = {
      year: 3,
      semester: "FIRST_SEMESTER",
      date: "2025-05-28",
      periodAttendanceDtos: [
        { period: "PERIOD_1", state: "출석" },
        { period: "PERIOD_2", state: "지각" },
      ],
    };

    const result = await postAttendance(10, newAttendance);

    expect(tokenInstance.post).toHaveBeenCalledWith(
      "/rest-api/v1/attendance/10",
      newAttendance,
    );
    expect(result).toEqual(mockData);
  });

  it("출결 수정 (updateAttendance)", async () => {
    const mockData = { result: "updated" };
    (tokenInstance.put as jest.Mock).mockResolvedValue({ data: mockData });

    const updateData: UpdateAttendanceProps = {
      year: 3,
      semester: "SECOND_SEMESTER",
      date: "2025-06-01",
      periodAttendances: [
        { period: "PERIOD_3", state: "조퇴" },
        { period: "PERIOD_4", state: "결석" },
      ],
    };

    const result = await updateAttendance(99, updateData);

    expect(tokenInstance.put).toHaveBeenCalledWith(
      "/rest-api/v1/attendance/99",
      updateData,
    );
    expect(result).toEqual(mockData);
  });

  it("출결 삭제", async () => {
    (tokenInstance.delete as jest.Mock).mockResolvedValue({});

    await deleteAttendance(100);

    expect(tokenInstance.delete).toHaveBeenCalledWith(
      "/rest-api/v1/attendance/100",
    );
  });
});
