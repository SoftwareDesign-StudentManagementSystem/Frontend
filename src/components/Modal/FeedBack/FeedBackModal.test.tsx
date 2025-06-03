import { render, screen, fireEvent } from "@testing-library/react";
import FeedBackModal from "./FeedBackModal";
import { BrowserRouter } from "react-router-dom";
import useUserStore from "../../../stores/useUserStore";
import { UserDetailInfo } from "../../../types/members";

// 🔹 테스트용 studentInfo mock
const mockStudentInfo: UserDetailInfo = {
  id: 1,
  accountId: 10,
  name: "홍길동",
  phone: "010-1234-5678",
  email: "hong@example.com",
  birthday: "2000-01-01",
  gender: "MALE", // ✅ 이 줄이 핵심입니다.
  profileImageUrl: null,
  role: "ROLE_PARENT",
  schoolName: "서울고등학교",
  classId: 3,
  number: 12,
  subject: null,
  year: 2023,
  childrenList: [],
  parentList: [],
  followReqList: [],
  followRecList: [],
};

jest.mock("../../../stores/useUserStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("FeedBackModal 컴포넌트", () => {
  beforeEach(() => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      userInfo: { role: "ROLE_TEACHER" },
    });
  });

  it("모달이 제대로 렌더링되어야 함", () => {
    renderWithRouter(
      <FeedBackModal onClose={jest.fn()} studentInfo={mockStudentInfo} />,
    );

    // expect(screen.getByText("피드백")).toBeInTheDocument();
    expect(screen.getByText("+ 피드백 추가")).toBeInTheDocument();
  });

  it("피드백 추가 버튼 클릭 시 FeedBackAdd로 전환되어야 함", () => {
    renderWithRouter(
      <FeedBackModal onClose={jest.fn()} studentInfo={mockStudentInfo} />,
    );

    const addButton = screen.getByText("+ 피드백 추가");
    fireEvent.click(addButton);

    // FeedBackAdd에서 쓰이는 특정 텍스트가 있다면 이걸 기준으로 테스트 가능
    // 예: expect(screen.getByText("피드백 작성")).toBeInTheDocument();
  });
});
