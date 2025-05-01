import axiosInstance from "../apis/axiosInstance";
import tokenInstance from "../apis/tokenInstance";
import refreshInstance from "../apis/refreshInstance";
import { ApiResponse } from "../types/common";
import { TokenInfo, UserInfo } from "../types/members";
import useUserStore from "../stores/useUserStore.ts";

// 회원 가져오기
export const getMemberInfo = async (): Promise<ApiResponse<UserInfo>> => {
  const response =
    await tokenInstance.get<ApiResponse<UserInfo>>(`/rest-api/v1/member`);
  return response.data;
};

// 회원 닉네임/횃불이 이미지 변경
export const putMemberInfo = async (
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
export const deleteMember = async (): Promise<ApiResponse<number>> => {
  const response =
    await tokenInstance.delete<ApiResponse<number>>(`/api/members`);
  return response.data;
};

//(학부모) 회원가입
export const signup = async (
  password: string,
  name: string,
  phone: string,
  email: string,
  birthday: string,
  schoolName: string,
  gender: string,
) => {
  try {
    console.log(password, name, phone, email, birthday, schoolName, gender);
    const response = await axiosInstance.post("/rest-api/v1/member/parent", {
      password,
      name,
      phone,
      email,
      birthday,
      schoolName,
      gender,
    });

    const data = response.data;
    if (data.returnCode === "SUCCESS") {
      // 회원가입 성공 시, accessToken과 refreshToken 반환
      return true;
    } else {
      throw new Error(data.returnMessage || "회원가입 실패");
    }
  } catch (error) {
    console.error("회원가입 요청 오류:", error);
    throw new Error("회원가입 실패");
  }
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

// 학생 리스트 조회
export const getStudentList = async (): Promise<UserInfo[]> => {
  const response = await tokenInstance.get<ApiResponse<UserInfo[]>>(
    `/rest-api/v1/member/students`,
  );
  console.log(response.data.ieduPage.contents);
  return response.data.ieduPage.contents;
};

// 학생의 상세회원정보 조회(학부모/선생님 권한)
export const getStudentInfo = async (studentId: number): Promise<UserInfo> => {
  const response = await tokenInstance.get<ApiResponse<UserInfo>>(
    `/rest-api/v1/member/${studentId}`,
  );
  console.log("getStudentInfo" + response.data);
  return response.data.data;
};

// 학생 본인의 상세회원정보 조회(학생 권한)
export const getStudentMyInfo = async (): Promise<UserInfo> => {
  const response =
    await tokenInstance.get<ApiResponse<UserInfo>>(`/rest-api/v1/member`);
  console.log("getStudentInfo" + response.data);
  return response.data.data;
};
