// src/components/modal/__tests__/AttendanceModal.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import AttendanceModal from "./AttendanceModal";
import * as ReactRouterDom from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

// Mock DropDownMenu
jest.mock("../../common/DropDownMenu", () => {
  return function MockDropDownMenu({
    options,
    defaultSelected,
    onSelect,
  }: any) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const [value, setValue] = require("react").useState(defaultSelected);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      onSelect(e.target.value);
    };

    return (
      <select data-testid="dropdown" value={value} onChange={handleChange}>
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
});

// Mock AttendanceList
jest.mock("../../studentlobby/AttendanceList", () => () => (
  <div>출결 리스트 컴포넌트</div>
));

// Mock useSearchParams
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

import { UserDetailInfo } from "../../../types/members";

const mockStudentInfo: UserDetailInfo = {
  id: 1,
  accountId: 101,
  name: "홍길동",
  phone: "010-1234-5678",
  email: "hong@example.com",
  birthday: "2012-05-07",
  gender: "MALE",
  profileImageUrl: null,
  role: "ROLE_STUDENT",
  schoolName: "테스트초등학교",
  classId: 2,
  number: 15,
  subject: null,
  year: 3,
  childrenList: [],
  parentList: [],
  followReqList: [],
  followRecList: [],
};

describe("AttendanceModal 컴포넌트", () => {
  beforeEach(() => {
    (ReactRouterDom.useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams("id=1"),
    ]);
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("모달과 관련 UI 요소가 정상적으로 렌더링되어야 함", () => {
    renderWithRouter(
      <AttendanceModal onClose={jest.fn()} studentInfo={mockStudentInfo} />,
    );

    expect(screen.getAllByText("출결").length).toBeGreaterThan(0);
    expect(
      screen.getByText("출석:O, 결석:🖤, 지각:×, 조퇴:◎"),
    ).toBeInTheDocument();
    expect(screen.getByText("출결 리스트 컴포넌트")).toBeInTheDocument();
  });

  it("드롭다운에서 월 선택 시 이벤트가 잘 반영되어야 함", () => {
    renderWithRouter(
      <AttendanceModal onClose={jest.fn()} studentInfo={mockStudentInfo} />,
    );

    // 모든 dropdown을 가져와 배열로 받기
    const dropdowns = screen.getAllByTestId("dropdown");

    // 월 선택 드롭다운은 두 번째라고 가정 (index 1)
    const monthDropdown = dropdowns[1] as HTMLSelectElement;

    fireEvent.change(monthDropdown, { target: { value: "5월" } });

    expect(monthDropdown.value).toBe("5월");
  });
});
