import {
  getMyGrades,
  getAllGradesByStudent,
  createStudentGrade,
  updateStudentGrade,
  getStudentGrade,
} from "./grade";
import tokenInstance from "../apis/tokenInstance";
import { Grade } from "../types/grades";

jest.mock("../apis/tokenInstance");

describe("Grade API - 과목 포함 성적 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("본인의 성적을 과목 정보 포함하여 조회해야 함", async () => {
    const mockGrade: Grade[] = [
      {
        id: 1,
        studentId: 1001,
        profileImageUrl: null,
        year: 2025,
        semester: "FIRST_SEMESTER",
        math: {
          score: 93,
          average: 85,
          achievementLevel: "우수",
          relativeRankGrade: 2,
        },
        english: {
          score: 88,
          average: 80,
          achievementLevel: "보통",
          relativeRankGrade: 3,
        },
      },
    ];

    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: { data: mockGrade },
    });

    const result = await getMyGrades();
    expect(result[0].math).toEqual({
      score: 93,
      average: 85,
      achievementLevel: "우수",
      relativeRankGrade: 2,
    });
    expect(tokenInstance.get).toHaveBeenCalledWith("/rest-api/v1/grade");
  });

  it("특정 학생의 성적을 조회하고 과목별 성적을 확인해야 함", async () => {
    const mockGrade: Grade[] = [
      {
        id: 2,
        studentId: 1002,
        profileImageUrl: null,
        year: 2025,
        semester: "SECOND_SEMESTER",
        science: {
          score: 91,
          average: 86,
          achievementLevel: "상",
          relativeRankGrade: 1,
        },
      },
    ];

    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: { data: mockGrade },
    });

    const result = await getAllGradesByStudent(1002);
    const science = result[0].science;

    if (typeof science === "object" && science !== null && "score" in science) {
      expect(science.score).toBe(91);
      expect(science.achievementLevel).toBe("상");
    } else {
      fail("과학 성적 정보가 올바르지 않습니다.");
    }
  });

  it("성적 생성 시 POST 요청을 보내야 함", async () => {
    const newGrade = {
      year: 2025,
      semester: "SECOND_SEMESTER" as const,
      score: 87,
    };

    (tokenInstance.post as jest.Mock).mockResolvedValue({
      data: { id: 3, ...newGrade },
    });

    const result = await createStudentGrade(1003, newGrade);
    expect(tokenInstance.post).toHaveBeenCalledWith(
      "/rest-api/v1/grade/1003",
      newGrade,
    );
    expect(result.data.score).toBe(87);
  });

  it("성적 수정 시 과목 점수도 함께 수정되어야 함", async () => {
    const updateData = {
      math: {
        score: 98,
        average: 89,
        achievementLevel: "최우수",
        relativeRankGrade: 1,
      },
    };

    (tokenInstance.put as jest.Mock).mockResolvedValue({
      data: {
        data: {
          id: 4,
          ...updateData,
        },
      },
    });

    const result = await updateStudentGrade(4, updateData);
    expect(tokenInstance.put).toHaveBeenCalledWith(
      "/rest-api/v1/grade/4",
      updateData,
    );
    const math = result.math;

    if (typeof math === "object" && math !== null && "score" in math) {
      expect(math.score).toBe(98);
    } else {
      fail("수학 성적 정보가 올바르지 않습니다.");
    }
  });

  it("특정 학기 성적 조회 시 과목 포함 데이터 반환 확인", async () => {
    const mockGrade: Grade = {
      id: 5,
      studentId: 1005,
      profileImageUrl: null,
      year: 2024,
      semester: "FIRST_SEMESTER",
      history: {
        score: 90,
        average: 85,
        achievementLevel: "우수",
        relativeRankGrade: 2,
      },
    };

    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: { data: mockGrade },
    });

    const result = await getStudentGrade(2024, 1, 1005);
    const history = result.history;

    if (typeof history === "object" && history !== null && "score" in history) {
      expect(history.score).toBe(90);
    } else {
      fail("성적 정보가 올바르지 않습니다.");
    }
  });
});
