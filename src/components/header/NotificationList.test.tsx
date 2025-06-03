import { render, screen, waitFor } from "@testing-library/react";
import NotificationList from "./NotificationList";
import * as api from "../../apis/header";
import useUserStore from "../../stores/useUserStore";

jest.mock("../../apis/header");
jest.mock("../../stores/useUserStore");

const mockFollow = {
  id: 1,
  objectId: 101, // 추가
  content: "홍길동 님이 팔로우 요청을 보냈습니다.",
  isRead: false,
  targetObject: "Follow",
};

describe("NotificationList", () => {
  beforeEach(() => {
    const mockGetNotification = api.getNotification as jest.MockedFunction<
      typeof api.getNotification
    >;
    const mockPutNotificationRead =
      api.putNotificationRead as jest.MockedFunction<
        typeof api.putNotificationRead
      >;

    mockGetNotification.mockResolvedValue([mockFollow]);
    mockPutNotificationRead.mockResolvedValue({
      ieduPage: null,
      swdesignPage: null,
      result: [],
      data: null,
      msg: "성공",
    });

    (useUserStore as unknown as jest.Mock).mockReturnValue({
      userDetailInfo: {
        followRecList: [{ id: 42 }],
      },
    });
  });

  it("알림이 표시되어야 한다", async () => {
    render(<NotificationList />);

    await waitFor(() => {
      expect(screen.getByText(/팔로우 요청/i)).toBeInTheDocument();
    });
  });
});
