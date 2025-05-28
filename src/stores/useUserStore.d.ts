import { TokenInfo, UserInfo, UserDetailInfo } from "../types/members";
interface UserState {
    tokenInfo: TokenInfo;
    userInfo: UserInfo;
    userDetailInfo: UserDetailInfo;
    setTokenInfo: (tokenInfo: TokenInfo) => void;
    setUserInfo: (userInfo: UserInfo) => void;
    setUserDetailInfo: (userDetailInfo: UserDetailInfo) => void;
}
declare const useUserStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UserState>>;
export default useUserStore;
