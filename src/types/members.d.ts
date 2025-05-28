export interface TokenInfo {
    accessToken: string;
    refreshToken: string;
}
export interface UserInfo {
    id: number;
    name: string;
    profileImageUrl: string | null;
    schoolName: string;
    year: number;
    number: number;
    classId: number;
    subject: string | null;
    role: string;
}
export interface UserDetailInfo {
    id: number;
    accountId: number;
    name: string;
    phone: string;
    email: string;
    birthday: string;
    gender: "FEMALE" | "MALE";
    profileImageUrl: string | null;
    role: string;
    schoolName: string;
    classId: number | null;
    number: number | null;
    subject: string | null;
    year: number | null;
    childrenList: any[];
    parentList: any[];
    followReqList: any[];
    followRecList: any[];
}
