import { TokenInfo, UserInfo, UserDetailInfo } from "../types/members";
import { create } from "zustand";

interface UserState {
  tokenInfo: TokenInfo;
  userInfo: UserInfo;
  userDetailInfo: UserDetailInfo;
  setTokenInfo: (tokenInfo: TokenInfo) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  setUserDetailInfo: (userDetailInfo: UserDetailInfo) => void;
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
  userDetailInfo: {
    id: 0,
    accountId: 0,
    name: "",
    phone: "",
    email: "",
    birthday: "",
    gender: "MALE", // 기본값 설정
    profileImageUrl: null,
    role: "",
    schoolName: "",
    classId: null,
    number: null,
    subject: null,
    year: null,
    childrenList: [],
    parentList: [],
    followReqList: [],
    followRecList: [],
  },

  setTokenInfo: (tokenInfo) => {
    set(() => ({ tokenInfo }));
    localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
  },
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
  setUserDetailInfo: (userDetailInfo) => set(() => ({ userDetailInfo })),
}));

export default useUserStore;
