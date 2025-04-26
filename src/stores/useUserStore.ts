import { TokenInfo, UserInfo } from "../types/members";
import { create } from "zustand";

interface UserState {
  tokenInfo: TokenInfo;
  userInfo: UserInfo;
  setTokenInfo: (tokenInfo: TokenInfo) => void;
  setUserInfo: (userProfile: UserInfo) => void;
}

const useUserStore = create<UserState>((set) => ({
  tokenInfo: {
    accessToken: "",
    refreshToken: "",
  },
  userInfo: {
    id: 0,
    name: "",
    profileImageUrl: null,
    schoolName: "",
    year: 0,
    number: 0,
    classId: 0,
    subject: null,
    role: "",
  },

  setTokenInfo: (tokenInfo) => {
    set(() => ({ tokenInfo }));
    localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
  },
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
}));

export default useUserStore;
