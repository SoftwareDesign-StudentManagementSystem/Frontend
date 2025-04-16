import styled from "styled-components";

interface StudentInfoProps {
  name: string;
  school: string;
  grade: number;
  classnum: number;
  number: number;
}
const StudentInfo = ({
  name,
  school,
  grade,
  classnum,
  number,
}: StudentInfoProps) => {
  return (
    <StudentInfoWrapper>
      <ProfileImage />
      <RightContent>
        <span className="name">{name}</span>
        <br />
        <span className="info">
          <span className="school" style={{ color: "#FFB608" }}>
            {school}{" "}
          </span>
          {grade}학년 {classnum}반 {number}번
        </span>
      </RightContent>
    </StudentInfoWrapper>
  );
};

export default StudentInfo;

const StudentInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 40px;

  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const ProfileImage = styled.img`
  background-color: #763636;
  width: 102px;
  height: 102px;
  border-radius: 50%;
`;
const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

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

    .school {
      display: inline;
    }

    @media (max-width: 768px) {
      .school {
        display: block;
      }
    }
  }
`;
