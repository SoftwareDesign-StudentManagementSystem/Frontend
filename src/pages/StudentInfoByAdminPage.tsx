import { useLocation, useNavigate } from "react-router-dom";
import { UserDetailInfo } from "../types/members";
import styled from "styled-components";

export default function StudentInfoByAdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const student: UserDetailInfo = location.state;

  if (!student) {
    return <Message>학생 정보가 없습니다.</Message>;
  }

  return (
    <Wrapper>
      <Header>
        {/*<ProfileImage*/}
        {/*  src={student.profileImageUrl || "/default-profile.png"}*/}
        {/*  alt="프로필 이미지"*/}
        {/*/>*/}
        <Info>
          <Name>{student.name}</Name>
          <SubInfo>
            {student.schoolName} / {student.year}학년 {student.classId}반{" "}
            {student.number}번
          </SubInfo>
        </Info>
      </Header>

      <DetailSection>
        <DetailItem>
          <Label>계정 ID</Label>
          <Value>{student.accountId}</Value>
        </DetailItem>
        <DetailItem>
          <Label>생년월일</Label>
          <Value>{student.birthday}</Value>
        </DetailItem>
        <DetailItem>
          <Label>성별</Label>
          <Value>{student.gender === "MALE" ? "남자" : "여자"}</Value>
        </DetailItem>
        <DetailItem>
          <Label>이메일</Label>
          <Value>{student.email}</Value>
        </DetailItem>
        <DetailItem>
          <Label>전화번호</Label>
          <Value>{student.phone}</Value>
        </DetailItem>
        <DetailItem>
          <Label>역할</Label>
          <Value>
            {student.role === "ROLE_STUDENT" ? "학생" : student.role}
          </Value>
        </DetailItem>
      </DetailSection>

      <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 32px;
  max-width: 600px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// const ProfileImage = styled.img`
//   width: 96px;
//   height: 96px;
//   border-radius: 50%;
//   object-fit: cover;
//   background-color: #eee;
// `;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const SubInfo = styled.div`
  font-size: 16px;
  color: #666;
`;

const DetailSection = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DetailItem = styled.div`
  display: flex;
`;

const Label = styled.div`
  width: 120px;
  font-weight: bold;
`;

const Value = styled.div``;

const Message = styled.div`
  padding: 40px;
  text-align: center;
`;

const BackButton = styled.button`
  margin-top: 32px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;
