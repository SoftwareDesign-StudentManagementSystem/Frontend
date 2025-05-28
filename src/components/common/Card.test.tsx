import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card 컴포넌트", () => {
  it("카드 제목(cardtitle)이 렌더링되어야 한다", () => {
    render(<Card cardtitle="제목" />);
    expect(screen.getByText("제목")).toBeInTheDocument();
  });

  it("헤더 children이 렌더링되어야 한다", () => {
    render(<Card cardtitle="제목" headerChildren={<span>헤더 내용</span>} />);
    expect(screen.getByText("헤더 내용")).toBeInTheDocument();
  });

  it("콘텐츠 children이 렌더링되어야 한다", () => {
    render(<Card cardtitle="제목" contentChildren={<p>본문 내용</p>} />);
    expect(screen.getByText("본문 내용")).toBeInTheDocument();
  });
});
