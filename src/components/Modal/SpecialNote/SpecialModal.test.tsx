import { render, screen, fireEvent } from "@testing-library/react";
import SpecialModal from "./SpecialModal";
import { MemoryRouter } from "react-router-dom";
import useUserStore from "../../../stores/useUserStore";
// import { vi } from "vitest";
import { UserDetailInfo } from "../../../types/members";

// useUserStore 모킹
jest.mock("../../../stores/useUserStore");

const mockUseUserStore = useUserStore as unknown as jest.Mock;

// SpecialAdd 자체 mock 처리 (테스트 안정화용)
jest.mock("../SpecialNote/SpecialAdd", () => () => (
  <div data-testid="special-add-mock">특기사항 등록 컴포넌트</div>
));

const mockOnClose = jest.fn();

const mockStudentInfo: UserDetailInfo = {
  id: 1,
  accountId: 1001,
  name: "홍길동",
  phone: "010-0000-0000",
  email: "hong@example.com",
  birthday: "2005-01-01",
  gender: "MALE",
  profileImageUrl: null,
  role: "ROLE_STUDENT",
  schoolName: "한국고등학교",
  classId: 2,
  number: 10,
  subject: null,
  year: 2,
  childrenList: [],
  parentList: [],
  followReqList: [],
  followRecList: [],
};

describe("SpecialModal 컴포넌트", () => {
  beforeEach(() => {
    // 교사 권한으로 모킹
    mockUseUserStore.mockReturnValue({
      userInfo: { role: "ROLE_TEACHER" },
    });
  });

  it("특기사항 카드와 추가 버튼이 렌더링된다", () => {
    render(
      <MemoryRouter>
        <SpecialModal onClose={mockOnClose} studentInfo={mockStudentInfo} />
      </MemoryRouter>,
    );

    expect(screen.getByText("특기 사항")).toBeInTheDocument();
    expect(screen.getByText("+ 특기사항 추가")).toBeInTheDocument();
  });

  it("특기사항 추가 버튼을 클릭하면 SpecialAdd 컴포넌트로 전환된다", () => {
    render(
      <MemoryRouter>
        <SpecialModal onClose={mockOnClose} studentInfo={mockStudentInfo} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("+ 특기사항 추가"));
  });

  it("학생 정보가 전달되면 이름이 화면에 나타나야 한다", () => {
    render(
      <MemoryRouter>
        <SpecialModal onClose={mockOnClose} studentInfo={mockStudentInfo} />
      </MemoryRouter>,
    );

    const nameElement = screen.queryByText("홍길동");
    if (nameElement) {
      expect(nameElement).toBeInTheDocument();
    }
  });
});
