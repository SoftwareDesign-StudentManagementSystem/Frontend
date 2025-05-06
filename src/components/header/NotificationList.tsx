import styled from "styled-components";
import { getNotification, putNotificationRead } from "../../apis/header.ts";
import { useEffect, useState } from "react";
import { Notification } from "../../types/header.ts";
import FollowModal from "../Modal/FollowModal.tsx";
import useUserStore from "../../stores/useUserStore.ts";

export default function NotificationList() {
  const { userDetailInfo } = useUserStore();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpenFollowModal, setIsOpenFollowModal] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentId, setParentId] = useState(-1);

  const closeModal = () => setIsOpenFollowModal(false);

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

  const handleNotiClick = async (object: Notification) => {
    console.log(object);
    try {
      const data = await putNotificationRead([object.id]);
      console.log("알림 읽기 처리 성공!", data);
      alert("알림 읽기 처리 성공!");
    } catch (e) {
      console.log(e);
      alert("알림 읽기 처리 실패!");
    }
    //팔로우 처리
    if (object.targetObject === "Follow") {
      if (userDetailInfo.followRecList.length === 0) {
        alert("이미 처리된 팔로우입니다.");
        return;
      }
      setParentName(object.content);
      setParentId(userDetailInfo.followRecList[0].id);
      setIsOpenFollowModal(true);
    }
  };

  return (
    <>
      {isOpenFollowModal && (
        <div className="ModalWrapper">
          <FollowModal
            onClose={closeModal}
            parentName={parentName}
            memberId={parentId}
          />
        </div>
      )}
      <DropdownWrapper>
        <ItemWrapper>
          {notifications.map((item, index) => (
            <NotificationItem
              key={index}
              read={item.isRead}
              onClick={() => {
                handleNotiClick(item);
              }}
            >
              <div className="title">{item.targetObject}</div>
              <div className="message">{item.content}</div>
              <div className="time">{item.isRead}</div>
            </NotificationItem>
          ))}
          {notifications.length === 0 && <div>알림이 없습니다.</div>}
        </ItemWrapper>
      </DropdownWrapper>
    </>
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
  @media (min-width: 768px) {
    right: 300px;
  }
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
