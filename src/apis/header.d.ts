import { ApiResponse } from "../types/common";
import { Notification } from "../types/header";
export declare const getNotification: () => Promise<Notification[]>;
export declare const putNotificationRead: (notificationIdList: number[]) => Promise<ApiResponse>;
