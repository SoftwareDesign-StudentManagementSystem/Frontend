import MockAdapter from "axios-mock-adapter";
import refreshInstance from "../apis/refreshInstance";

// 모듈 mocking
jest.mock("../stores/useUserStore", () => ({
  __esModule: true,
  default: {
    getState: () => ({
      tokenInfo: {
        refreshToken: "mocked-refresh-token",
      },
    }),
  },
}));

describe("refreshInstance", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(refreshInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  it("요청 시 Authorization 헤더에 refreshToken을 포함해야 한다", async () => {
    mock.onGet("/test").reply((config) => {
      expect(config.headers?.Authorization).toBe("Bearer mocked-refresh-token");
      return [200, { msg: "토큰 재발급 성공" }];
    });

    const response = await refreshInstance.get("/test");
    expect(response.status).toBe(200);
    expect(response.data.msg).toBe("토큰 재발급 성공");
  });

  it("응답 인터셉터에서 response.data.msg가 콘솔에 출력되는지 확인", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    mock.onGet("/test").reply(200, { msg: "리프레시 응답 메시지" });

    const response = await refreshInstance.get("/test");

    expect(consoleSpy).toHaveBeenCalledWith("리프레시 응답 메시지");
    expect(response.data.msg).toBe("리프레시 응답 메시지");

    consoleSpy.mockRestore();
  });
});
