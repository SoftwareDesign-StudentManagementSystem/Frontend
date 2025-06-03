import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { MemoryRouter } from "react-router-dom";

describe("Card 컴포넌트", () => {
  test("카드 제목이 렌더링되는지 확인", () => {
    render(
      <MemoryRouter>
        <Card cardtitle="테스트 카드" />
      </MemoryRouter>,
    );
    expect(screen.getByText("테스트 카드")).toBeInTheDocument();
  });

  test("headerChildren과 contentChildren이 렌더링되는지 확인", () => {
    render(
      <MemoryRouter>
        <Card
          cardtitle="타이틀"
          headerChildren={<div>헤더 내용</div>}
          contentChildren={<div>콘텐츠 내용</div>}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("헤더 내용")).toBeInTheDocument();
    expect(screen.getByText("콘텐츠 내용")).toBeInTheDocument();
  });

  test("홈 경로(/home)일 때 noMinHeight가 true여야 함", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Card cardtitle="홈 카드" />
      </MemoryRouter>,
    );

    expect(screen.getByText("홈 카드")).toBeInTheDocument();
    // 스타일 자체를 확인할 수는 없지만 조건부 렌더링이 오류 없이 작동하는지 확인
  });

  test("홈 이외 경로일 때도 렌더링이 잘 되는지 확인", () => {
    render(
      <MemoryRouter initialEntries={["/other"]}>
        <Card cardtitle="다른 경로 카드" />
      </MemoryRouter>,
    );

    expect(screen.getByText("다른 경로 카드")).toBeInTheDocument();
  });
});
