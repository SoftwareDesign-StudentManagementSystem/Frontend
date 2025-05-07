import axiosInstance from "../apis/axiosInstance";
import tokenInstance from "../apis/tokenInstance";
import refreshInstance from "../apis/refreshInstance";
import { ApiResponse } from "../types/common";
import { TokenInfo, UserInfo, UserDetailInfo } from "../types/members";
import useUserStore from "../stores/useUserStore.ts";

// 본인 회원 정보 조회
export const getMemberInfo = async (): Promise<ApiResponse<UserInfo>> => {
  const response =
    await tokenInstance.get<ApiResponse<UserInfo>>(`/rest-api/v1/member`);
  return response.data;
};

// 본인의 상세회원정보 조회
export const getMemberDetailInfo = async (): Promise<
  ApiResponse<UserDetailInfo>
> => {
  const response = await tokenInstance.get<ApiResponse<UserDetailInfo>>(
    `/rest-api/v1/member/detail`,
  );
  console.log("getMemberDetailInfo" + response.data);
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
export const getStudentInfo = async (
  studentId: number,
): Promise<ApiResponse<UserDetailInfo>> => {
  const response = await tokenInstance.get<ApiResponse<UserDetailInfo>>(
    `/rest-api/v1/member/detail/${studentId}`,
  );
  console.log("getStudentInfo", response.data);
  return response.data;
};

// 팔로우 요청하기(학부모 권한)
export interface FollowRequestBody {
  name: string;
  year: number;
  classId: number;
  number: number;
  birthday: string;
}
export const postFollow = async (
  body: FollowRequestBody,
): Promise<ApiResponse> => {
  const response = await tokenInstance.post<ApiResponse>(
    `/rest-api/v1/member/follow`,
    body, // request body 추가
  );
  return response.data;
};

//팔로우 요청 수락하기(학생 권한)
export const postFollowAccept = async (
  memberId: number,
): Promise<ApiResponse> => {
  const response = await tokenInstance.post<ApiResponse>(
    `/rest-api/v1/member/followReq/${memberId}`,
  );
  return response.data;
};

//(학년/반/번호)로 학생 조회(선생님 권한)
export const getFilteredStudentList = async (
  year: number,
  classId?: number,
  number?: number, // 선택적 파라미터로 변경
): Promise<UserInfo[]> => {
  try {
    const params: Record<string, number> = {
      year,
    };
    if (classId !== undefined) {
      params.classId = classId;
    }
    if (number !== undefined) {
      params.studentId = number;
    }
    console.log("params", params);

    const response = await tokenInstance.get<ApiResponse<UserInfo[]>>(
      `/rest-api/v1/member/filter`,
      { params },
    );
    console.log("Filtered student list:", response.data.ieduPage.contents);
    return response.data.ieduPage.contents;
  } catch (error) {
    console.error("Failed to fetch filtered student list:", error);
    throw error;
  }
};
