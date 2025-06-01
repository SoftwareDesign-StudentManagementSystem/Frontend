import axios, { AxiosError } from "axios";
import useUserStore from "../stores/useUserStore";
import { refresh } from "../apis/members";

const tokenInstance = axios.create({
  baseURL: "https://api.iedu.letzgo.site/",
});

// 요청 인터셉터 - 토큰 설정
tokenInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useUserStore.getState().tokenInfo;
    if (accessToken) {
      console.log("tokenInstance - accesstoken있음 " + accessToken);
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터 - 401 에러 시 토큰 재발급 및 요청 재시도
let isTokenExpiredHandled = false; // 전역 플래그 (모듈 내부에서만 유지됨)

tokenInstance.interceptors.response.use(
  (response) => {
    if (response.data?.msg) {
      console.log(response.data.msg);
    }
    return response;
  },
  async (error: AxiosError & { config?: any; isRefreshError?: boolean }) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data: newTokenInfo } = await refresh();
        useUserStore.getState().setTokenInfo(newTokenInfo);
        localStorage.setItem("tokenInfo", JSON.stringify(newTokenInfo));
        originalRequest.headers["Authorization"] =
          `Bearer ${newTokenInfo.accessToken}`;
        return tokenInstance(originalRequest);
      } catch (refreshError) {
        if (!isTokenExpiredHandled) {
          isTokenExpiredHandled = true;

          alert("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
          useUserStore
            .getState()
            .setTokenInfo({ accessToken: "", refreshToken: "" });
          localStorage.removeItem("tokenInfo");
          window.location.replace("/login");
        }

        (
          refreshError as AxiosError & { isRefreshError?: boolean }
        ).isRefreshError = true;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default tokenInstance;
