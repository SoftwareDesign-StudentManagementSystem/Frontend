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
