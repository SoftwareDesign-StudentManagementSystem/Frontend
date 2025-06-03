import { render, screen, fireEvent } from "@testing-library/react";
import ButtonWhite from "./ButtonWhite";

describe("ButtonWhite 컴포넌트", () => {
  test("버튼 텍스트가 올바르게 렌더링되는지 확인", () => {
    render(<ButtonWhite text="확인" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  test("버튼 클릭 시 onClick 함수가 호출되는지 확인", () => {
    const handleClick = jest.fn();
    render(<ButtonWhite text="닫기" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: "닫기" });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
