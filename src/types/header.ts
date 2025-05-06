export interface Notification {
  id: number;
  objectId: number;
  content: string;
  isRead: boolean;
  targetObject: string; // 예: "Attendance"
}
