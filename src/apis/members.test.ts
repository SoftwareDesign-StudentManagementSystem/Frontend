import {
  getMemberInfo,
  getMemberDetailInfo,
  signup,
  refresh,
  getStudentList,
  getStudentInfo,
  postFollow,
  postFollowAccept,
  getFilteredStudentList,
} from "./members";

import tokenInstance from "../apis/tokenInstance";
import axiosInstance from "../apis/axiosInstance";
import refreshInstance from "../apis/refreshInstance";
import { TokenInfo, UserDetailInfo, UserInfo } from "../types/members";

const mockTokenInfo: TokenInfo = {
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
};

const mockUserInfo: UserInfo = {
  id: 1,
  name: "홍길동",
  profileImageUrl: null,
  schoolName: "가나초등학교",
  year: 3,
  number: 15,
  classId: 2,
  subject: null,
  role: "ROLE_STUDENT",
};

const mockUserDetailInfo: UserDetailInfo = {
  id: 1,
  accountId: 10001,
  name: "홍길동",
  phone: "010-1234-5678",
  email: "hong@test.com",
  birthday: "2014-03-01",
  gender: "MALE",
  profileImageUrl: null,
  role: "ROLE_PARENT",
  schoolName: "가나초등학교",
  classId: 2,
  number: 15,
  subject: null,
  year: 3,
  childrenList: [],
  parentList: [],
  followReqList: [],
  followRecList: [],
};

jest.mock("../apis/tokenInstance");
jest.mock("../apis/axiosInstance");
jest.mock("../apis/refreshInstance");
jest.mock("../stores/useUserStore", () => ({
  __esModule: true,
  default: () => ({
    tokenInfo: mockTokenInfo,
    setTokenInfo: jest.fn(),
  }),
  getState: () => ({
    tokenInfo: mockTokenInfo,
    setTokenInfo: jest.fn(),
  }),
}));

describe("회원 관련 API 테스트", () => {
  it("본인 회원 정보 조회", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: { data: mockUserInfo },
    });

    const result = await getMemberInfo();
    expect(result.data).toEqual(mockUserInfo);
  });

  it("본인 상세회원정보 조회", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: { data: mockUserDetailInfo },
    });

    const result = await getMemberDetailInfo();
    expect(result.data).toEqual(mockUserDetailInfo);
  });

  it("회원가입 성공", async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValue({
      data: {
        returnCode: "SUCCESS",
        data: {},
      },
    });

    const result = await signup(
      10002,
      "pass123",
      "김영희",
      "010-2222-3333",
      "young@test.com",
      "2015-06-01",
      "서울초등학교",
      "FEMALE",
    );

    expect(result).toBe(true);
  });

  it("토큰 재발급 성공", async () => {
    (refreshInstance.post as jest.Mock).mockResolvedValue({
      data: { data: mockTokenInfo },
    });

    const result = await refresh();
    expect(result.data).toEqual(mockTokenInfo);
  });

  it("학생 리스트 조회", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: {
        ieduPage: {
          contents: [mockUserInfo],
        },
      },
    });

    const result = await getStudentList();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockUserInfo);
  });

  it("학생 상세정보 조회", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: { data: mockUserDetailInfo },
    });

    const result = await getStudentInfo(1);
    expect(result.data).toEqual(mockUserDetailInfo);
  });

  it("팔로우 요청", async () => {
    (tokenInstance.post as jest.Mock).mockResolvedValue({
      data: { returnCode: "SUCCESS" },
    });

    await postFollow({
      name: "홍길동",
      year: 3,
      classId: 1,
      number: 15,
      birthday: "2014-03-01",
    });

    // expect(result.returnCode).toBe("SUCCESS");
  });

  it("팔로우 수락", async () => {
    (tokenInstance.post as jest.Mock).mockResolvedValue({
      data: { returnCode: "SUCCESS" },
    });

    await postFollowAccept(1);
    // expect(result.returnCode).toBe("SUCCESS");
  });

  it("필터 학생 리스트 조회", async () => {
    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: {
        ieduPage: {
          contents: [mockUserInfo],
        },
      },
    });

    const result = await getFilteredStudentList(3, 1, 15);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockUserInfo);
  });
});
