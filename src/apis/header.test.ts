import { getNotification, putNotificationRead } from "./header";
import tokenInstance from "../apis/tokenInstance";
import { Notification } from "../types/header";

jest.mock("../apis/tokenInstance");

describe("알림 API 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("알림 목록 조회 성공", async () => {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        objectId: 101,
        content: "출석이 완료되었습니다.",
        isRead: false,
        targetObject: "Attendance",
      },
      {
        id: 2,
        objectId: 202,
        content: "상담 기록이 추가되었습니다.",
        isRead: true,
        targetObject: "Consult",
      },
    ];

    (tokenInstance.get as jest.Mock).mockResolvedValue({
      data: {
        ieduPage: {
          contents: mockNotifications,
        },
      },
    });

    const result = await getNotification();

    expect(tokenInstance.get).toHaveBeenCalledWith("/rest-api/v1/notification");
    expect(result).toEqual(mockNotifications);
  });

  it("알림 읽음 처리 성공", async () => {
    const notificationIdList = [1, 2];

    const mockResponse = {
      code: "SUCCESS",
      message: "읽음 처리 완료",
      data: null,
    };

    (tokenInstance.put as jest.Mock).mockResolvedValue({
      data: mockResponse,
    });

    const result = await putNotificationRead(notificationIdList);

    expect(tokenInstance.put).toHaveBeenCalledWith(
      "/rest-api/v1/notification",
      { notificationIdList },
    );
    expect(result).toEqual(mockResponse);
  });
});
