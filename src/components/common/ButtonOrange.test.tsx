import { render, screen, fireEvent } from "@testing-library/react";
import ButtonOrange from "./ButtonOrange";

describe("ButtonOrange", () => {
  it("텍스트 렌더링 확인", () => {
    render(<ButtonOrange text="확인" onClick={() => {}} />);
    expect(screen.getByText("확인")).toBeInTheDocument();
  });

  it("클릭 시 함수 호출", () => {
    const mockFn = jest.fn();
    render(<ButtonOrange text="눌러줘" onClick={mockFn} />);
    fireEvent.click(screen.getByText("눌러줘"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
