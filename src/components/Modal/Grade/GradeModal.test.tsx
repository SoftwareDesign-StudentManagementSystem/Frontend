import { render, screen, fireEvent } from "@testing-library/react";
import GradeModal from "./GradeModal";
import { UserDetailInfo } from "../../../types/members";
import { MemoryRouter } from "react-router-dom";
import { LoadingProvider } from "../../../stores/LoadingProvider"; // 실제 경로 확인 필요

const mockOnClose = jest.fn();

const mockStudentInfo: UserDetailInfo = {
  id: 1,
  accountId: 1,
  name: "홍길동",
  phone: "010-0000-0000",
  email: "hong@example.com",
  birthday: "2005-01-01",
  gender: "MALE",
  profileImageUrl: null,
  role: "ROLE_STUDENT",
  schoolName: "테스트고",
  classId: 1,
  number: 1,
  subject: null,
  year: 2,
  childrenList: [],
  parentList: [],
  followReqList: [],
  followRecList: [],
};

describe("GradeModal 컴포넌트", () => {
  const renderWithProviders = () =>
    render(
      <MemoryRouter>
        <LoadingProvider>
          <GradeModal
            onClose={mockOnClose}
            studentId={1}
            studentInfo={mockStudentInfo}
          />
        </LoadingProvider>
      </MemoryRouter>,
    );

  it("제목과 성적 리스트가 렌더링된다", () => {
    renderWithProviders();

    expect(screen.getByText("성적")).toBeInTheDocument();
    expect(screen.getByText("1학년 1학기")).toBeInTheDocument();
    expect(screen.getByText("1학년 2학기")).toBeInTheDocument();
    // expect(screen.getByText("2학년 1학기")).toBeInTheDocument();
    // expect(screen.getByText("2학년 2학기")).toBeInTheDocument();
  });

  it("학기 카드를 클릭하면 상세 뷰로 전환된다", () => {
    renderWithProviders();

    const targetCard = screen.getByText("2학년 1학기");
    fireEvent.click(targetCard);

    expect(screen.getByText("< 목록으로")).toBeInTheDocument();
  });
});
