import { render, screen, fireEvent } from "@testing-library/react";
import SearchStudent from "./SearchStudent";
import { UserInfo } from "../../types/members";
import * as useUserStoreModule from "../../stores/useUserStore";

jest.mock("../../stores/useUserStore");

const mockOnSearch = jest.fn();

const mockUserInfo: UserInfo = {
  id: 1,
  name: "홍길동",
  profileImageUrl: null,
  schoolName: "서울고등학교",
  year: 2,
  number: 15, // ✅ 여기가 올바른 필드입니다
  classId: 3,
  subject: null,
  role: "ROLE_STUDENT",
};

describe("SearchStudent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStoreModule.default as unknown as jest.Mock).mockReturnValue({
      userInfo: mockUserInfo,
    });
  });

  it("렌더링이 정상적으로 되어야 함", () => {
    render(<SearchStudent students={[]} onSearch={mockOnSearch} />);
    expect(screen.getByText("학년")).toBeInTheDocument();
    expect(screen.getByText("반")).toBeInTheDocument();
    expect(screen.getByText("번호")).toBeInTheDocument();
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("검색")).toBeInTheDocument();
  });

  it("select와 input에 값 입력 후 검색 버튼 클릭 시 onSearch가 호출되어야 함", () => {
    render(<SearchStudent students={[]} onSearch={mockOnSearch} />);

    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "1" } }); // 학년
    fireEvent.change(selects[1], { target: { value: "2" } }); // 반
    fireEvent.change(selects[2], { target: { value: "5" } }); // 번호

    fireEvent.change(screen.getByPlaceholderText("이름"), {
      target: { value: "김철수" },
    });

    fireEvent.click(screen.getByText("검색"));

    expect(mockOnSearch).toHaveBeenCalledWith({
      grade: "1",
      classnum: "2",
      studentid: "5",
      name: "김철수",
    });
  });

  it("이름 입력 후 Enter 키를 누르면 onSearch가 호출되어야 함", () => {
    render(<SearchStudent students={[]} onSearch={mockOnSearch} />);

    const nameInput = screen.getByPlaceholderText("이름");
    fireEvent.change(nameInput, { target: { value: "이순신" } });
    fireEvent.keyDown(nameInput, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledWith({
      grade: "2",
      classnum: "3",
      studentid: "",
      name: "이순신",
    });
  });
});
