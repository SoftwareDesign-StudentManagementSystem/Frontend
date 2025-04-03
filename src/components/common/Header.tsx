import styled from "styled-components";
import useUserStore from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

import notification from "../../assets/notification.svg";

const UserTypeLabel = ({ type }: { type: string }) => {
  return (
    <UserTypeLabelWrapper>
      {/*{type}*/}
      <div>{type}</div>
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
    /* identical to box height, or 18px */
    text-transform: capitalize;

    color: #ffffff;
  }
`;

export default function Header() {
  const { userInfo, setUserInfo, setTokenInfo } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserInfo({ id: 0, nickname: "", role: "", fireId: 0 });
    setTokenInfo({
      accessToken: "",
      accessTokenExpiredTime: "",
      refreshToken: "",
      refreshTokenExpiredTime: "",
    });
    localStorage.removeItem("tokenInfo");
    navigate("/");
  };

  return (
    <StyledHeader>
      <div className="LogoWrapper">LOGO</div>

      <div className="RightWrapper">
        <div className="UserWrapper">
          <UserTypeLabel type="교사" />
          <button>{userInfo.nickname} 배현준 님</button>
        </div>

        <NotificationBtn src={notification} />
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </StyledHeader>
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

  button {
    font-size: 20px;
    line-height: 20px;
    background-color: transparent;
    border: none;
    //color: white;
    padding: 0;

    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 150%;
    /* identical to box height, or 30px */
    text-transform: capitalize;

    color: #333333;
  }

  .LogoWrapper {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    font-weight: bolder;
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
`;

const NotificationBtn = styled.img`
  width: 30px;
  height: 30px;
`;
