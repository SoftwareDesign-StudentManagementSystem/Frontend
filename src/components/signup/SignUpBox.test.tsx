import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpBox from "./SignUpBox";
import { BrowserRouter } from "react-router-dom";
import * as memberAPI from "../../apis/members";
import { JSX } from "react";

// 목(mock) 함수 설정
jest.mock("../../stores/LoadingProvider", () => ({
  useLoading: () => ({
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
  }),
}));

jest.mock("../../apis/members");

const mockSignup = memberAPI.signup as jest.Mock;

const renderWithRouter = (component: JSX.Element) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("SignUpBox", () => {
  beforeEach(() => {
    mockSignup.mockResolvedValue(true); // API가 성공하는 경우
  });

  it("렌더링이 정상적으로 되어야 함", () => {
    renderWithRouter(<SignUpBox />);
    expect(screen.getByText(/회원가입하기/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("이름을 입력해주세요."),
    ).toBeInTheDocument();
  });

  it("비밀번호 확인이 일치하지 않으면 경고창이 떠야 함", async () => {
    renderWithRouter(<SignUpBox />);
    fireEvent.change(screen.getByPlaceholderText("이름을 입력해주세요."), {
      target: { value: "홍길동" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("자녀의 학번+랜덤2자리로 입력해주세요"),
      {
        target: { value: "12345" },
      },
    );
    fireEvent.change(screen.getByPlaceholderText("비밀번호를 입력해주세요."), {
      target: { value: "password1" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("비밀번호를 다시 입력해주세요."),
      {
        target: { value: "password2" },
      },
    );

    window.alert = jest.fn(); // alert 감지용
    fireEvent.click(screen.getByText("회원가입하기"));
    expect(window.alert).toHaveBeenCalledWith("비밀번호가 일치하지 않습니다.");
  });

  it("회원가입이 성공하면 성공 알림을 보여주어야 함", async () => {
    renderWithRouter(<SignUpBox />);
    fireEvent.change(screen.getByPlaceholderText("이름을 입력해주세요."), {
      target: { value: "홍길동" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("자녀의 학번+랜덤2자리로 입력해주세요"),
      {
        target: { value: "12345" },
      },
    );
    fireEvent.change(screen.getByPlaceholderText("비밀번호를 입력해주세요."), {
      target: { value: "password" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("비밀번호를 다시 입력해주세요."),
      {
        target: { value: "password" },
      },
    );

    window.alert = jest.fn();
    fireEvent.click(screen.getByText("회원가입하기"));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(
        "회원가입을 성공하였습니다! 다음 페이지에서 자녀 등록을 완료해 주세요.",
      );
    });
  });
});
