// src/components/feedback/__tests__/FeedBackAdd.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedBackAdd from "./FeedBackAdd";
import useUserStore from "../../../stores/useUserStore";
import {
  postFeedback,
  putFeedback,
  deleteFeedback,
} from "../../../apis/feedback";

import { UserDetailInfo } from "../../../types/members";
import { Feedback } from "../../../types/feedback";

// mock api
jest.mock("../../../apis/feedback");
jest.mock("../../../stores/useUserStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [
    {
      get: () => "123", // mock student id
    },
  ],
}));

const mockSetIsAddMode = jest.fn();
const studentInfoMock: UserDetailInfo = {
  id: 1,
  accountId: 101,
  name: "홍길동",
  phone: "010-1234-5678",
  email: "honggildong@example.com",
  birthday: "2008-03-15",
  gender: "MALE",
  profileImageUrl: null,
  role: "ROLE_STUDENT",
  schoolName: "서울중학교",
  classId: 3,
  number: 12,
  subject: null,
  year: 2025,
  childrenList: [],
  parentList: [],
  followReqList: [],
  followRecList: [],
};

const mockUserStore = (role = "ROLE_TEACHER") => {
  (useUserStore as unknown as jest.Mock).mockReturnValue({
    userInfo: { role },
  });
};

describe("FeedBackAdd", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("기본 렌더링이 정상적으로 되는지 확인", () => {
    mockUserStore();

    render(
      <FeedBackAdd
        setIsAddMode={mockSetIsAddMode}
        studentInfo={studentInfoMock}
      />,
    );

    expect(
      screen.getByText(/피드백을 생성하실 범주를 선택해주세요/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("내용을 입력해주세요."),
    ).toBeInTheDocument();
    expect(screen.getByText("저장")).toBeInTheDocument();
    expect(screen.getByText("돌아가기")).toBeInTheDocument();
  });

  it("피드백을 새로 저장하는 경우 postFeedback이 호출되어야 함", async () => {
    mockUserStore();
    (postFeedback as jest.Mock).mockResolvedValue({});

    render(
      <FeedBackAdd
        setIsAddMode={mockSetIsAddMode}
        studentInfo={studentInfoMock}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("내용을 입력해주세요."), {
      target: { value: "성실히 잘했음" },
    });

    fireEvent.click(screen.getByText("저장"));

    await waitFor(() => {
      expect(postFeedback).toHaveBeenCalled();
      expect(mockSetIsAddMode).toHaveBeenCalledWith(false);
    });
  });

  it("기존 피드백 수정 시 putFeedback이 호출되어야 함", async () => {
    mockUserStore();
    (putFeedback as jest.Mock).mockResolvedValue({});
    const feedback: Feedback = {
      id: 10,
      teacherName: "김철수",
      date: "2025-05-01",
      category: "성적",
      content: "이전 내용",
      visibleToStudent: true,
      visibleToParent: false,
    };

    render(
      <FeedBackAdd
        setIsAddMode={mockSetIsAddMode}
        studentInfo={studentInfoMock}
        initialFeedback={feedback}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("내용을 입력해주세요."), {
      target: { value: "수정된 내용" },
    });

    fireEvent.click(screen.getByText("수정"));

    await waitFor(() => {
      expect(putFeedback).toHaveBeenCalledWith(
        10,
        expect.objectContaining({
          content: "수정된 내용",
        }),
      );
      expect(mockSetIsAddMode).toHaveBeenCalledWith(false);
    });
  });

  it("삭제 버튼 클릭 시 deleteFeedback이 호출되어야 함", async () => {
    mockUserStore();
    window.confirm = jest.fn().mockReturnValue(true); // 삭제 확인
    (deleteFeedback as jest.Mock).mockResolvedValue({});

    const feedback: Feedback = {
      id: 11,
      teacherName: "김철수",
      date: "2025-05-01",
      category: "성적",
      content: "이전 내용",
      visibleToStudent: true,
      visibleToParent: false,
    };

    render(
      <FeedBackAdd
        setIsAddMode={mockSetIsAddMode}
        studentInfo={studentInfoMock}
        initialFeedback={feedback}
      />,
    );

    fireEvent.click(screen.getByText("삭제"));

    await waitFor(() => {
      expect(deleteFeedback).toHaveBeenCalledWith(11);
      expect(mockSetIsAddMode).toHaveBeenCalledWith(false);
    });
  });

  it("ROLE_STUDENT인 경우 입력창이 비활성화되어야 함", () => {
    mockUserStore("ROLE_STUDENT");

    render(
      <FeedBackAdd
        setIsAddMode={mockSetIsAddMode}
        studentInfo={studentInfoMock}
      />,
    );

    const input = screen.getByPlaceholderText(
      "내용을 입력해주세요.",
    ) as HTMLTextAreaElement;
    expect(input).toHaveAttribute("readOnly");
    expect(screen.queryByText("저장")).not.toBeInTheDocument();
  });
});
