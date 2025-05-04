import styled from "styled-components";
import useUserStore from "../../stores/useUserStore";
import { useNavigate, useLocation } from "react-router-dom";

import notification from "../../assets/notification.svg";
import ButtonOrange from "./ButtonOrange";
import { useState } from "react";
import ReportCreateModal from "../Modal/ReportCreateModal.tsx";
import NotificationList from "../header/NotificationList.tsx";

import Logo from "../../assets/logo_row.png";

const UserTypeLabel = ({ type }: { type: string }) => {
  const getLabel = (type: string) => {
    switch (type) {
      case "ROLE_TEACHER":
        return "교사";
      case "ROLE_STUDENT":
        return "학생";
      case "ROLE_PARENT":
        return "학부모";
      case "ROLE_ADMIN":
        return "관리자";
      default:
        return type; // 알 수 없는 값은 그대로 표시
    }
  };

  return (
    <UserTypeLabelWrapper>
      <div>{getLabel(type)}</div>
    </UserTypeLabelWrapper>
  );
};

const UserTypeLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 0 5px;
  gap: 10px;

  min-width: fit-content;
  max-height: 32px;
  background: #ffb608;

  div {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    text-transform: capitalize;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    padding: 0 4px;
    gap: 6px;

    div {
      font-size: 10px;
    }
  }
`;

export default function Header() {
  const { userInfo, setUserInfo, setTokenInfo } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  const [openModal, setOpenModal] = useState<string | null>(null);
  const closeModal = () => setOpenModal(null);

  // 상태 추가
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    setUserInfo({
      id: 0,
      name: "",
      profileImageUrl: null,
      schoolName: "",
      year: 0,
      number: 0,
      classId: 0,
      subject: null,
      role: "",
    });
    setTokenInfo({
      accessToken: "",
      refreshToken: "",
    });
    localStorage.removeItem("tokenInfo");
    navigate("/");
  };

  const isStudentLobby = location.pathname === "/studentlobby"; // 현재 경로가 /studentLobby 인지 확인

  return (
    <>
      {openModal === "reportCreate" && (
        <ReportCreateModal onClose={closeModal} />
      )}
      <StyledHeader>
        <div
          className="LogoWrapper"
          onClick={() => {
            navigate("/home");
          }}
        >
          <img src={Logo} alt={"logo"} style={{ height: "70%" }} />
        </div>

        <div className="RightWrapper">
          <div className="UserWrapper">
            <UserTypeLabel type={userInfo.role} />
            <button className="btntype1">{userInfo.name} 님</button>
          </div>

          {userInfo.role != "ROLE_TEACHER" && (
            <>
              <NotificationBtn
                src={notification}
                onClick={() => setShowNotifications((prev) => !prev)}
              />
            </>
          )}

          {showNotifications && <NotificationList />}
          <button className="btntype1" onClick={handleLogout}>
            로그아웃
          </button>

          {isStudentLobby && (
            <ButtonOrange
              text={"보고서 작성"}
              onClick={() => {
                setOpenModal("reportCreate");
              }}
            />
          )}
        </div>
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  padding: 0 32px;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(28, 28, 27, 0.1);

  display: flex;
  justify-content: space-between;

  div {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  img {
    height: 100%;
  }

  .btntype1 {
    font-size: 20px;
    line-height: 20px;
    background-color: transparent;
    border: none;
    color: white;
    padding: 0;

    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 150%;
    text-transform: capitalize;

    color: #333333;

    min-width: fit-content;
  }

  .LogoWrapper {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    font-weight: bolder;
    cursor: pointer;
  }

  .RightWrapper {
    width: fit-content;
    height: 100%;
    gap: 50px;

    .UserWrapper {
      width: fit-content;
      gap: 10px;
    }
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 60px;

    .btntype1 {
      font-size: 14px;
    }

    .LogoWrapper {
      font-size: 22px;
    }

    .RightWrapper {
      gap: 20px;

      .UserWrapper {
        gap: 6px;
      }
    }

    div {
      gap: 16px;
    }
  }
`;

const NotificationBtn = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;
