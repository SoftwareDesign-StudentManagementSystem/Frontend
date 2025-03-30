import styled from "styled-components";
import useUserStore from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

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

      <div className="UserWrapper">
        <button>{userInfo.nickname} 님</button>
        알림
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 0 32px;
  //width: 100%;
  height: 80px;
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
    color: white;
    padding: 0;
  }

  .LogoWrapper {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    font-weight: bolder;
  }
  .UserWrapper {
  }
`;
