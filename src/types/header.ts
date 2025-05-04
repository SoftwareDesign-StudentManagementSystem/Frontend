export interface Notification {
  objectId: number;
  content: string;
  isRead: boolean;
  targetObject: string; // 예: "Attendance"
}
