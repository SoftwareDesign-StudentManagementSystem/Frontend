import styled from "styled-components";
import { getNotification, putNotificationRead } from "../../apis/header.ts";
import { useEffect, useState } from "react";
import { Notification } from "../../types/header.ts";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await getNotification();
        console.log(res);
        setNotifications(res);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    getNotifications();
  }, []);

  const handleNotiClick = (objectId: number) => {
    console.log([objectId]);
    try {
      putNotificationRead([objectId]).then((res) => {
        console.log(res);
        alert("알림 읽기 처리 성공!");
      });
    } catch (e) {
      console.log(e);
      alert("알림 읽기 처리 실패!");
    }
  };

  return (
    <DropdownWrapper>
      <ItemWrapper>
        {notifications.map((item) => (
          <NotificationItem
            key={item.objectId}
            read={item.isRead}
            onClick={() => {
              handleNotiClick(item.objectId);
            }}
          >
            <div className="title">{item.targetObject}</div>
            <div className="message">{item.content}</div>
            <div className="time">{item.isRead}</div>
          </NotificationItem>
        ))}
      </ItemWrapper>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  position: absolute;
  top: 80px;
  right: 40px;
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  z-index: 1000;
  padding: 16px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const NotificationItem = styled.span<{ read: boolean }>`
  padding: 12px 16px;
  box-sizing: border-box;
  font-weight: ${(props) => (props.read ? "normal" : "bold")};
  background-color: ${(props) => (props.read ? "white" : "#fff8e1")};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 12px;

  .title {
    font-size: 14px;
    margin-bottom: 4px;
  }

  .message {
    font-size: 12px;
    color: #555;
    line-height: 1.4;
  }

  .time {
    font-size: 10px;
    color: #999;
    margin-top: 6px;
  }
`;
