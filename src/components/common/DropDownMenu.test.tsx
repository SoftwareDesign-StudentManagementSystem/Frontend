import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropDownMenu from "./DropDownMenu";

describe("DropDownMenu", () => {
  const options = ["옵션1", "옵션2", "옵션3"];

  it("기본 선택값이 렌더링되어야 한다", () => {
    render(<DropDownMenu options={options} defaultSelected="옵션2" />);
    expect(screen.getByText("옵션2")).toBeInTheDocument();
  });

  it("버튼 클릭 시 드롭다운 리스트가 보여야 한다", () => {
    render(<DropDownMenu options={options} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("옵션2")).toBeInTheDocument();
    expect(screen.getByText("옵션3")).toBeInTheDocument();
  });

  it("옵션 클릭 시 선택되고, onSelect가 호출되어야 한다", () => {
    const mockOnSelect = jest.fn();
    render(<DropDownMenu options={options} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("옵션3"));

    // 선택 표시 확인
    expect(screen.getByText("옵션3")).toBeInTheDocument();

    // 콜백 호출 확인
    expect(mockOnSelect).toHaveBeenCalledWith("옵션3");
  });
});
