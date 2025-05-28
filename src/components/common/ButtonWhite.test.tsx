import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonWhite from "./ButtonWhite";

describe("ButtonWhite", () => {
  it("텍스트가 렌더링되어야 한다", () => {
    render(<ButtonWhite text="확인" onClick={() => {}} />);
    expect(screen.getByText("확인")).toBeInTheDocument();
  });

  it("클릭 시 onClick 함수가 호출되어야 한다", () => {
    const handleClick = jest.fn();
    render(<ButtonWhite text="클릭" onClick={handleClick} />);
    fireEvent.click(screen.getByText("클릭"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
