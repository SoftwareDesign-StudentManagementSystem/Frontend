import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConsultModal from "./ConsultModal";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserDetailInfo } from "../../../types/members";

// 🔹 react-datepicker mock
jest.mock("react-datepicker", () => () => (
  <div data-testid="datepicker-mock" />
));

// 🔹 ConsultList와 ConsultAdd도 필요 시 간단히 mock 처리
jest.mock("../../studentlobby/ConsultList", () => () => (
  <div data-testid="consult-list">상담 리스트</div>
));
jest.mock("./ConsultAdd", () => () => (
  <div data-testid="consult-add">상담 추가 폼</div>
));

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

// 🔹 유저 store mock
jest.mock("../../../stores/useUserStore", () => () => ({
  userInfo: { role: "ROLE_TEACHER" },
}));

// 🔹 라우팅이 필요한 부분 테스트를 위해 Router 포함
const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter initialEntries={["/student?id=1"]}>
      <Routes>
        <Route path="/student" element={ui} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("ConsultModal 컴포넌트", () => {
  it("기본 UI 요소가 잘 렌더링되어야 함", () => {
    renderWithRouter(
      <ConsultModal onClose={jest.fn()} studentInfo={mockStudentInfo} />,
    );

    // expect(screen.getByText("상담 내역")).toBeInTheDocument();
    expect(screen.getByText("상담 리스트")).toBeInTheDocument();
    expect(screen.getByText("+ 상담내역 추가")).toBeInTheDocument();
  });

  it("상담 추가 버튼 클릭 시 추가 폼이 보여져야 함", () => {
    renderWithRouter(
      <ConsultModal onClose={jest.fn()} studentInfo={mockStudentInfo} />,
    );

    fireEvent.click(screen.getByText("+ 상담내역 추가"));

    expect(screen.getByText("상담 추가 폼")).toBeInTheDocument();
  });
});
