import { ApiResponse } from "../types/common";
import { TokenInfo, UserInfo, UserDetailInfo } from "../types/members";
export declare const getMemberInfo: () => Promise<ApiResponse<UserInfo>>;
export declare const getMemberDetailInfo: () => Promise<ApiResponse<UserDetailInfo>>;
export declare const signup: (accountId: number, password: string, name: string, phone: string, email: string, birthday: string, schoolName: string, gender: string) => Promise<boolean>;
export declare const login: (accountId: number, password: string) => Promise<{
    accessToken: any;
    refreshToken: any;
}>;
export declare const refresh: () => Promise<ApiResponse<TokenInfo>>;
export declare const getStudentList: () => Promise<UserInfo[]>;
export declare const getStudentInfo: (studentId: number) => Promise<ApiResponse<UserDetailInfo>>;
export interface FollowRequestBody {
    name: string;
    year: number;
    classId: number;
    number: number;
    birthday: string;
}
export declare const postFollow: (body: FollowRequestBody) => Promise<ApiResponse>;
export declare const postFollowAccept: (memberId: number) => Promise<ApiResponse>;
export declare const getFilteredStudentList: (year: number, classId?: number, number?: number) => Promise<UserInfo[]>;
export interface BasicUpdateForm {
    password: string;
    name: string;
    phone: string;
    email: string;
    birthday: string;
    schoolName: string;
    gender: "MALE" | "FEMALE";
}
export declare const updateMemberInfo: (basicUpdateForm: BasicUpdateForm, imageFile?: File) => Promise<ApiResponse<string>>;
