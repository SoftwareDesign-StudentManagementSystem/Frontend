import { render, screen, fireEvent } from "@testing-library/react";
import ButtonOrange from "./ButtonOrange";

describe("ButtonOrange 컴포넌트", () => {
  test("버튼 텍스트가 올바르게 렌더링되는지 확인", () => {
    render(<ButtonOrange text="확인" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  test("버튼 클릭 시 onClick 핸들러가 호출되는지 확인", () => {
    const handleClick = jest.fn();
    render(<ButtonOrange text="제출" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: "제출" });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
