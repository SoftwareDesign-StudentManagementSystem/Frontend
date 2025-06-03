import { render, screen, fireEvent } from "@testing-library/react";
import DropDownMenu from "./DropDownMenu";

describe("DropDownMenu", () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  test("기본 옵션이 표시되어야 함", () => {
    render(<DropDownMenu options={options} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("defaultSelected가 있으면 해당 옵션이 표시되어야 함", () => {
    render(<DropDownMenu options={options} defaultSelected="Option 2" />);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("드롭다운 클릭 시 옵션 목록이 표시되어야 함", () => {
    render(<DropDownMenu options={options} />);
    fireEvent.click(screen.getByText("Option 1"));
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  test("옵션 선택 시 onSelect 콜백이 호출되고 드롭다운이 닫혀야 함", () => {
    const mockOnSelect = jest.fn();
    render(<DropDownMenu options={options} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText("Option 1")); // 드롭다운 열기
    fireEvent.click(screen.getByText("Option 3")); // 옵션 선택

    expect(mockOnSelect).toHaveBeenCalledWith("Option 3");
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument(); // 드롭다운 닫힘 확인
  });
});
