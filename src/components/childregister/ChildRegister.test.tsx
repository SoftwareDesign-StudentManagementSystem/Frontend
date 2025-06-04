import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChildRegisterBox from "./ChildRegisterBox";
import { BrowserRouter } from "react-router-dom";
import * as memberApi from "../../apis/members";
import { LoadingProvider } from "../../stores/LoadingProvider";

// navigate를 모킹합니다.
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("../../apis/members");

describe("ChildRegisterBox", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <LoadingProvider>
          {" "}
          {/* ✅ 필수 Provider로 감싸기 */}
          <ChildRegisterBox />
        </LoadingProvider>
      </BrowserRouter>,
    );
  };

  it("모든 입력창이 렌더링되어야 합니다.", () => {
    renderComponent();
    expect(
      screen.getByPlaceholderText("자녀의 이름을 입력해주세요."),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("학년")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("반")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("번호")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("년(YYYY)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("월(MM)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("일(DD)")).toBeInTheDocument();
  });

  it("입력이 누락되면 알림을 표시해야 합니다.", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("등록하기"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("자녀 이름을 입력해주세요.");
    });
  });

  it("정상 입력 시 API 호출되고 navigate 호출되어야 합니다.", async () => {
    // postFollow 응답 모킹
    (memberApi.postFollow as jest.Mock).mockResolvedValue({
      returnCode: "SUCCESS",
    });

    // alert 모킹
    window.alert = jest.fn();

    renderComponent();

    fireEvent.change(
      screen.getByPlaceholderText("자녀의 이름을 입력해주세요."),
      {
        target: { value: "홍길동" },
      },
    );
    fireEvent.change(screen.getByPlaceholderText("학년"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText("반"), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByPlaceholderText("번호"), {
      target: { value: "15" },
    });
    fireEvent.change(screen.getByPlaceholderText("년(YYYY)"), {
      target: { value: "2012" },
    });
    fireEvent.change(screen.getByPlaceholderText("월(MM)"), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByPlaceholderText("일(DD)"), {
      target: { value: "7" },
    });

    fireEvent.click(screen.getByText("등록하기"));

    await waitFor(() => {
      expect(memberApi.postFollow).toHaveBeenCalledWith({
        name: "홍길동",
        year: 2,
        classId: 3,
        number: 15,
        birthday: "2012-04-07",
      });
      expect(mockedNavigate).toHaveBeenCalledWith("/home");
      expect(window.alert).toHaveBeenCalledWith(
        "자녀 등록 요청을 성공하였습니다. 자녀의 승인 후 학생 리스트에 표시됩니다.",
      );
    });
  });

  it("API 호출 실패 시 오류 알림을 표시해야 합니다.", async () => {
    (memberApi.postFollow as jest.Mock).mockRejectedValue(
      new Error("등록 실패"),
    );
    window.alert = jest.fn();

    renderComponent();

    fireEvent.change(
      screen.getByPlaceholderText("자녀의 이름을 입력해주세요."),
      {
        target: { value: "홍길동" },
      },
    );
    fireEvent.change(screen.getByPlaceholderText("학년"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText("반"), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByPlaceholderText("번호"), {
      target: { value: "15" },
    });
    fireEvent.change(screen.getByPlaceholderText("년(YYYY)"), {
      target: { value: "2012" },
    });
    fireEvent.change(screen.getByPlaceholderText("월(MM)"), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByPlaceholderText("일(DD)"), {
      target: { value: "7" },
    });

    fireEvent.click(screen.getByText("등록하기"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("등록 중 오류가 발생했습니다.");
    });
  });
});
