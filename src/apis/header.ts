import tokenInstance from "../apis/tokenInstance";
import { ApiResponse } from "../types/common";
import { Notification } from "../types/header.ts";

// 알림 목록 조회
export const getNotification = async (): Promise<Notification[]> => {
  const response = await tokenInstance.get<ApiResponse<Notification[]>>(
    `/rest-api/v1/notification`,
  );
  return response.data.ieduPage.contents;
};

// 알림 읽음 처리
export const putNotificationRead = async (
  notificationIdList: number[],
): Promise<ApiResponse> => {
  const response = await tokenInstance.put<ApiResponse>(
    `/rest-api/v1/notification`,
    {
      notificationIdList: notificationIdList,
    },
  );
  return response.data;
};
