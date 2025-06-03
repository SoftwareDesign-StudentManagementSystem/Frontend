import { render, screen, fireEvent } from "@testing-library/react";
import ButtonRed from "./ButtonRed";

describe("ButtonRed 컴포넌트", () => {
  test("버튼 텍스트가 제대로 렌더링되는지 확인", () => {
    render(<ButtonRed text="삭제" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
  });

  test("버튼 클릭 시 onClick 핸들러가 호출되는지 확인", () => {
    const handleClick = jest.fn();
    render(<ButtonRed text="취소" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: "취소" });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
