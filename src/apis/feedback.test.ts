import {
  getFeedback,
  getMyFeedback,
  getMyFilteredFeedback,
  getStudentFilteredFeedback,
  postFeedback,
  putFeedback,
  deleteFeedback,
} from "./feedback";
import tokenInstance from "../apis/tokenInstance";

jest.mock("../apis/tokenInstance");

describe("feedback API 함수들", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("학생 피드백을 조회해야 함", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: {
        ieduPage: {
          contents: ["피드백1", "피드백2"],
        },
      },
    });

    const result = await getFeedback(1);
    expect(tokenInstance.get).toHaveBeenCalledWith("/rest-api/v1/feedback/1");
    expect(result).toEqual(["피드백1", "피드백2"]);
  });

  it("본인의 피드백을 조회해야 함", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: {
        ieduPage: {
          contents: ["내피드백1"],
        },
      },
    });

    const result = await getMyFeedback();
    expect(tokenInstance.get).toHaveBeenCalledWith("/rest-api/v1/feedback");
    expect(result).toEqual(["내피드백1"]);
  });

  it("필터로 본인의 피드백을 조회해야 함", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: ["필터피드백1"],
    });

    const result = await getMyFilteredFeedback(3, "SECOND_SEMESTER");
    expect(tokenInstance.get).toHaveBeenCalledWith(
      "/rest-api/v1/feedback/filter",
      {
        params: { year: 3, semester: "SECOND_SEMESTER" },
      },
    );
    expect(result).toEqual(["필터피드백1"]);
  });

  it("필터로 특정 학생의 피드백을 조회해야 함", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: ["학생필터피드백"],
    });

    const result = await getStudentFilteredFeedback(5, 2, "FIRST_SEMESTER");
    expect(tokenInstance.get).toHaveBeenCalledWith(
      "/rest-api/v1/feedback/filter/5",
      {
        params: { year: 2, semester: "FIRST_SEMESTER" },
      },
    );
    expect(result).toEqual(["학생필터피드백"]);
  });

  it("피드백을 추가해야 함", async () => {
    const data = {
      year: 2025,
      semester: "SECOND_SEMESTER",
      category: "성실성",
      content: "좋은 태도로 수업에 참여함",
      visibleToStudent: true,
      visibleToParent: true,
      date: "2025-06-01",
    };

    (tokenInstance.post as jest.Mock).mockResolvedValue({
      data: { id: 1 },
    });

    const result = await postFeedback(10, data);
    expect(tokenInstance.post).toHaveBeenCalledWith(
      "/rest-api/v1/feedback/10",
      data,
    );
    expect(result).toEqual({ id: 1 });
  });

  it("피드백을 수정해야 함", async () => {
    const updated = {
      year: 2025,
      semester: "FIRST_SEMESTER",
      category: "태도",
      content: "수업 집중도가 높아짐",
      visibleToStudent: true,
      visibleToParent: false,
      date: "2025-06-02",
    };

    (tokenInstance.put as jest.Mock).mockResolvedValue(undefined);

    await putFeedback(20, updated);
    expect(tokenInstance.put).toHaveBeenCalledWith(
      "/rest-api/v1/feedback/20",
      updated,
    );
  });

  it("피드백을 삭제해야 함", async () => {
    (tokenInstance.delete as jest.Mock).mockResolvedValue(undefined);

    await deleteFeedback(25);
    expect(tokenInstance.delete).toHaveBeenCalledWith(
      "/rest-api/v1/feedback/25",
    );
  });
});
