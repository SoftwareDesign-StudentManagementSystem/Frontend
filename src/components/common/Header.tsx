import styled from "styled-components";
import useUserStore from "../../stores/useUserStore";
import { useNavigate, useLocation } from "react-router-dom";

import notification from "../../assets/notification.svg";
import ButtonOrange from "./ButtonOrange";
import { useState } from "react";
import ReportCreateModal from "../Modal/ReportCreateModal.tsx";
import NotificationList from "../header/NotificationList.tsx";

import Logo from "../../assets/iedulogo.png";

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
        return type;
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
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 0 5px;
  gap: 10px;
  min-width: fit-content;
  max-height: 32px;
  background: #ffb608;

  div {
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    padding: 0 6px;
    //gap: 6px;

    div {
      font-size: 10px;
    }
  }
`;

export default function Header() {
  const { userInfo, setUserInfo, setTokenInfo } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [openModal, setOpenModal] = useState<string | null>(null);
  const closeModal = () => setOpenModal(null);
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

  // const handleLogout2 = () => {
  //   // setUserInfo({
  //   //   id: 0,
  //   //   name: "",
  //   //   profileImageUrl: null,
  //   //   schoolName: "",
  //   //   year: 0,
  //   //   number: 0,
  //   //   classId: 0,
  //   //   subject: null,
  //   //   role: "",
  //   // });
  //
  //   setTokenInfo({
  //     accessToken: "",
  //     refreshToken: useUserStore.getState().tokenInfo.refreshToken,
  //   });
  //   // localStorage.removeItem("tokenInfo");
  //   // navigate("/");
  // };

  const isStudentLobby = location.pathname === "/studentlobby";

  return (
    <>
      {openModal === "reportCreate" && (
        <ReportCreateModal onClose={closeModal} />
      )}
      <StyledHeader>
        <div className="LogoWrapper" onClick={() => navigate("/home")}>
          <img src={Logo} alt="logo" style={{ height: "60%" }} />
        </div>

        <div className="RightWrapper">
          {userInfo.role !== "ROLE_TEACHER" && (
            <NotificationBtn
              src={notification}
              onClick={() => setShowNotifications((prev) => !prev)}
            />
          )}
          <div className="UserWrapper">
            <UserTypeLabel type={userInfo.role} />
            <button className="btntype1">{userInfo.name} 님</button>
          </div>

          {showNotifications && <NotificationList />}
          <button className="btntype1" onClick={handleLogout}>
            로그아웃
          </button>
          {/*<button className="btntype1" onClick={handleLogout2}>*/}
          {/*  로그아웃2*/}
          {/*</button>*/}

          {isStudentLobby && (
            <ButtonOrange
              text={"보고서 생성"}
              onClick={() => setOpenModal("reportCreate")}
            />
          )}
        </div>
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  padding: 0 24px;
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
    background-color: transparent;
    border: none;
    font-weight: 600;
    text-transform: capitalize;
    color: #333333;
    min-width: fit-content;
  }

  .LogoWrapper {
    display: flex;
    font-size: 30px;
    font-weight: bolder;
    cursor: pointer;
  }

  .RightWrapper {
    width: fit-content;
    height: 100%;
    gap: 30px;

    .UserWrapper {
      width: fit-content;
      gap: 10px;
    }
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    height: 56px;

    .btntype1 {
      font-size: 12px;
      padding: 0;
      margin: 0;
    }

    .LogoWrapper {
      font-size: 20px;
    }

    .RightWrapper {
      gap: 10px;

      .UserWrapper {
        min-width: fit-content;
        gap: 4px;
      }
    }

    div {
      gap: 12px;
    }
  }
`;

const NotificationBtn = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
