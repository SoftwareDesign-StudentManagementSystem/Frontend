import axiosMockAdapter from "axios-mock-adapter";
import tokenInstance from "../apis/tokenInstance";
import { refresh } from "./members";
import useUserStore from "../stores/useUserStore";

// refresh 모킹
jest.mock("../apis/members", () => ({
  refresh: jest.fn(),
}));

// tokenInstance.test.ts
describe("tokenInstance Axios 테스트", () => {
  let mock: axiosMockAdapter;
  const oldToken = "old-access-token";
  const newToken = "new-access-token";

  const originalLocation = window.location;

  beforeEach(() => {
    mock = new axiosMockAdapter(tokenInstance);
    useUserStore.getState().setTokenInfo({
      accessToken: oldToken,
      refreshToken: "refresh-token",
    });

    // window.location 전체를 mock
    delete (window as any).location;
    (window as any).location = { replace: jest.fn() };
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
    window.location = originalLocation;
  });

  it("accessToken을 Authorization 헤더에 추가한다", async () => {
    mock.onGet("/test").reply((config) => {
      expect(config.headers?.Authorization).toBe(`Bearer ${oldToken}`);
      return [200, { success: true }];
    });

    const response = await tokenInstance.get("/test");
    expect(response.data).toEqual({ success: true });
  });

  it("401 응답 시 refresh 토큰으로 재발급 받고 재요청한다", async () => {
    (refresh as jest.Mock).mockResolvedValue({
      data: {
        accessToken: newToken,
        refreshToken: "new-refresh-token",
      },
    });

    let calledOnce = false;
    mock.onGet("/secure").reply((config) => {
      if (!calledOnce) {
        calledOnce = true;
        return [401];
      }
      expect(config.headers?.Authorization).toBe(`Bearer ${newToken}`);
      return [200, { data: "재요청 성공" }];
    });

    const response = await tokenInstance.get("/secure");
    expect(response.data).toEqual({ data: "재요청 성공" });
  });

  it("토큰 재발급 실패 시 로그인 정보 초기화 및 로그인 페이지 이동", async () => {
    (refresh as jest.Mock).mockRejectedValue(new Error("refresh 실패"));

    mock.onGet("/secure").reply(401);

    await expect(tokenInstance.get("/secure")).rejects.toThrow();
    expect(useUserStore.getState().tokenInfo.accessToken).toBe("");
    expect(window.location.replace).toHaveBeenCalledWith("/login");
  });
});
