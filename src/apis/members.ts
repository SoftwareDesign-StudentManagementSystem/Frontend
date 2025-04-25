import axiosInstance from "../apis/axiosInstance";
import tokenInstance from "../apis/tokenInstance";
import refreshInstance from "../apis/refreshInstance";
import { ApiResponse } from "../types/common";
import { TokenInfo, UserInfo } from "../types/members";
import useUserStore from "../stores/useUserStore.ts";
// import {Post} from "types/posts";

// 회원 가져오기
export const getMembers = async (): Promise<ApiResponse<UserInfo>> => {
  const response =
    await tokenInstance.get<ApiResponse<UserInfo>>(`/rest-api/v1/member`);
  return response.data;
};

// 회원 닉네임/횃불이 이미지 변경
export const putMembers = async (
  nickname: string | null,
  fireId: number,
): Promise<ApiResponse<number>> => {
  if (nickname) {
    const response = await tokenInstance.put<ApiResponse<number>>(
      `/api/members`,
      { nickname, fireId },
    );
    return response.data;
  } else {
    const response = await tokenInstance.put<ApiResponse<number>>(
      `/api/members`,
      { fireId },
    );
    return response.data;
  }
};

// 회원 삭제
export const deleteMembers = async (): Promise<ApiResponse<number>> => {
  const response =
    await tokenInstance.delete<ApiResponse<number>>(`/api/members`);
  return response.data;
};

// 로그인
export const login = async (accountId: number, password: string) => {
  try {
    const response = await axiosInstance.post("/rest-api/v1/auth/login", {
      accountId,
      password,
    });

    const data = response.data;
    if (data.returnCode === "SUCCESS") {
      useUserStore.getState().setTokenInfo({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      });
      // 로그인 성공 시, accessToken과 refreshToken 반환
      return {
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };
    } else {
      throw new Error(data.returnMessage || "로그인 실패");
    }
  } catch (error) {
    console.error("로그인 요청 오류:", error);
    throw new Error("로그인 실패");
  }
};
// 토큰 재발급
export const refresh = async (): Promise<ApiResponse<TokenInfo>> => {
  const response = await refreshInstance.post<ApiResponse<TokenInfo>>(
    `/rest-api/v1/auth/login/refresh-token`,
  );
  return response.data;
};
