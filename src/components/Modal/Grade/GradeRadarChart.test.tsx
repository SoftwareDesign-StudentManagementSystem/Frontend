import { render, screen } from "@testing-library/react";
import GradeRadarChart from "./GradeRadarChart"; // 경로는 프로젝트 구조에 따라 조정

// 차트 초기화 (mock)
jest.mock("react-chartjs-2", () => ({
  Radar: (props: any) => {
    return (
      <div data-testid="mock-radar-chart">
        Mock Radar Chart with labels: {props.data.labels.join(", ")}
      </div>
    );
  },
}));

describe("GradeRadarChart", () => {
  it("성적 정보가 없을 때 안내 문구를 표시해야 함", () => {
    const { container } = render(<GradeRadarChart grades={{}} />);
    expect(container).toHaveTextContent("성적 정보가 없습니다.");
  });

  it("유효한 성적 정보가 있을 때 차트를 렌더링해야 함", () => {
    const mockGrades = {
      수학: { score: 80 },
      영어: { score: 90 },
      과학: { score: 85 },
    };

    render(<GradeRadarChart grades={mockGrades} />);

    const chart = screen.getByTestId("mock-radar-chart");
    expect(chart).toBeInTheDocument();
    expect(chart).toHaveTextContent("수학, 영어, 과학");
  });

  it("score 프로퍼티가 없는 항목은 제외되어야 함", () => {
    const mockGrades = {
      수학: { score: 90 },
      체육: { other: 10 },
    };

    render(<GradeRadarChart grades={mockGrades} />);

    const chart = screen.getByTestId("mock-radar-chart");
    expect(chart).toHaveTextContent("수학");
    expect(chart).not.toHaveTextContent("체육");
  });
});
