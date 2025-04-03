import styled from "styled-components";

interface StudentInfoProps {
  name: string;
  school: string;
  grade: number;
  classnum: number;
  number: number;
}
const UserInfo = ({
  name,
  school,
  grade,
  classnum,
  number,
}: StudentInfoProps) => {
  return (
    <UserInfoWrapper>
      <ProfileImage />
      <span className="name">{name}</span>
      <span className="info">
        <span style={{ color: "#FFB608" }}>{school}</span> {grade}학년{" "}
        {classnum}반 {number}번
      </span>
    </UserInfoWrapper>
  );
};

export default UserInfo;

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
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 125%;
    /* identical to box height, or 30px */
    text-align: center;

    color: #333333;
  }
  .info {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 125%;
    /* identical to box height, or 22px */
    text-align: center;

    color: #333333;
  }
`;

const ProfileImage = styled.img`
  background-color: #763636;
  width: 102px;
  height: 102px;
  border-radius: 50%;
`;
