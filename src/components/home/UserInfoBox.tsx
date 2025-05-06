import styled from "styled-components";
import { UserInfo } from "../../types/members";
import { getRandomProfileImage } from "../../utils/getRandomProfileImage";
import { useMemo } from "react";

const UserInfoBox = ({
  userInfo,
  roleString,
}: {
  userInfo: UserInfo;
  roleString: string;
}) => {
  const profileImage = useMemo(() => getRandomProfileImage(), []);

  return (
    <UserInfoWrapper>
      <ProfileImage src={profileImage} />
      <span className="name">
        {userInfo.name} {roleString}님
      </span>
      <span className="info">
        <span style={{ color: "#FFB608" }}>{userInfo.schoolName}</span>{" "}
        {userInfo.role !== "ROLE_PARENT" && (
          <>
            {userInfo.year}학년 {userInfo.classId}반{" "}
            {userInfo.role === "ROLE_STUDENT" && <>{userInfo.number}번</>}
          </>
        )}
      </span>
    </UserInfoWrapper>
  );
};

export default UserInfoBox;

const UserInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  .name {
    font-weight: 600;
    font-size: 24px;
    text-align: center;
    color: #333333;
  }
  .info {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    color: #333333;
  }
`;

const ProfileImage = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #eee;
`;
