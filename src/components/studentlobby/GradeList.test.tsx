import { render, screen, waitFor } from "@testing-library/react";
import GradeList from "./GradeList";
import * as gradeApi from "../../apis/grade";
import useUserStore from "../../stores/useUserStore";
import { useLoading } from "../../stores/LoadingProvider";

jest.mock("../../apis/grade");
jest.mock("../../stores/useUserStore");
jest.mock("../../stores/LoadingProvider", () => ({
  useLoading: jest.fn(),
}));

const mockGrades = {
  id: 1,
  math: {
    score: 95,
    average: 85,
    achievementLevel: "상",
    relativeRankGrade: "A",
  },
  english: {
    score: 88,
    average: 82,
    achievementLevel: "중",
    relativeRankGrade: "B",
  },
};

describe("GradeList 컴포넌트", () => {
  const showLoading = jest.fn();
  const hideLoading = jest.fn();

  beforeEach(() => {
    (useLoading as jest.Mock).mockReturnValue({ showLoading, hideLoading });

    (useUserStore as unknown as jest.Mock).mockReturnValue({
      userInfo: {
        id: 1,
        role: "ROLE_TEACHER",
        subject: "math",
      },
    });

    (gradeApi.getStudentGrade as jest.Mock).mockResolvedValue(mockGrades);
  });

  it("성적이 표시되는지 확인", async () => {
    render(
      <GradeList studentId={1} year={2024} semester={1} miniView={false} />,
    );

    await waitFor(() => {
      expect(screen.getByText("math")).toBeInTheDocument();
      expect(screen.getByText("95 / 85")).toBeInTheDocument();
    });
  });

  it("성적 수정 버튼이 나타나는지 확인", async () => {
    render(
      <GradeList studentId={1} year={2024} semester={1} miniView={false} />,
    );

    await waitFor(() => {
      const editButton = screen.getAllByText("✏️")[0];
      expect(editButton).toBeInTheDocument();
    });
  });

  it("성적이 없는 경우 메시지 표시", () => {
    (gradeApi.getStudentGrade as jest.Mock).mockResolvedValue({});

    render(
      <GradeList studentId={1} year={2024} semester={1} miniView={false} />,
    );
    expect(screen.queryByText("성적 정보가 없습니다.")).toBeInTheDocument();
  });
});
