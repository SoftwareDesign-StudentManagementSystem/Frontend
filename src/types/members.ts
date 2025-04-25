export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  nickname: string;
  fireId: number;
  role: string; // "admin" | ""
}
