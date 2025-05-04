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
  role: string; // 예: "ROLE_STUDENT"
}

export interface UserDetailInfo {
  id: number;
  accountId: number;
  name: string;
  phone: string;
  email: string;
  birthday: string;
  gender: "FEMALE" | "MALE"; // 성별이 정해진 값이면 리터럴 타입 사용
  profileImageUrl: string | null;
  role: string; // 예: "ROLE_PARENT"
  schoolName: string;
  classId: number | null;
  number: number | null;
  subject: string | null;
  year: number | null;
  childrenList: any[]; // 자식 요소 구조가 명확하다면 타입 정의 가능
  parentList: any[];
  followReqList: any[];
  followRecList: any[];
}
