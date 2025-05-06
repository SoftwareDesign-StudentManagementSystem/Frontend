import styled from "styled-components";
import 횃불이 from "../../assets/횃불이.svg";
import { useState } from "react";
import ButtonOrange from "../common/ButtonOrange";
import ButtonWhite from "../common/ButtonWhite";
import Modal from "./Modal";
import { UserDetailInfo } from "../../types/members.ts";
import useUserStore from "../../stores/useUserStore.ts";

const StudentInfoModal = ({
  onClose,
  studentInfo,
  profileImage,
}: {
  onClose: () => void;
  studentInfo?: UserDetailInfo;
  profileImage: string;
}) => {
  return (
    <Modal
      title={"학생 정보"}
      content={
        <StudentInfoModalContent
          onClose={onClose}
          studentInfo={studentInfo}
          profileImage={profileImage}
        />
      }
      onClose={onClose}
    />
  );
};
export default StudentInfoModal;

const StudentInfoModalContent = ({
  onClose,
  studentInfo,
  profileImage,
}: {
  onClose: () => void;
  studentInfo?: UserDetailInfo;
  profileImage: string;
}) => {
  const { userInfo } = useUserStore(); // 로그인 사용자 정보
  const isReadOnly =
    userInfo?.role === "ROLE_STUDENT" || userInfo?.role === "ROLE_PARENT";

  const [name, setName] = useState(studentInfo?.name);
  const [grade, setGrade] = useState(studentInfo?.year?.toString() || "");
  const [classnum, setClassnum] = useState(studentInfo?.classId?.toString());
  const [studentid, setStudentid] = useState(studentInfo?.number?.toString());

  const birthData = studentInfo?.birthday?.split("-") ?? ["", "", ""];
  const [birthYear, setBirthYear] = useState(birthData[0]);
  const [birthMonth, setBirthMonth] = useState(birthData[1]);
  const [birthDay, setBirthDay] = useState(birthData[2]);

  return (
    <ContentWrapper>
      <ContentLeft>
        <UserImage src={profileImage} alt="학생 이미지" />
      </ContentLeft>
      <ContentRight>
        <HorizontalLineWrapper>
          <div className="inputWrapper">
            <div className="inputtitle">이름</div>
            <InputBox
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={isReadOnly}
              style={{ width: "100%" }}
            />
          </div>
        </HorizontalLineWrapper>

        <HorizontalLineWrapper>
          <div className="inputWrapper">
            <div className="inputtitle">학년</div>
            <InputBox
              placeholder="학년"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              readOnly={isReadOnly}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">반</div>
            <InputBox
              placeholder="반"
              value={classnum}
              onChange={(e) => setClassnum(e.target.value)}
              readOnly={isReadOnly}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">번호</div>
            <InputBox
              placeholder="번호"
              value={studentid}
              onChange={(e) => setStudentid(e.target.value)}
              readOnly={isReadOnly}
            />
          </div>
        </HorizontalLineWrapper>

        <HorizontalLineWrapper>
          <div className="inputWrapper">
            <div className="inputtitle">생년월일</div>
            <InputBox
              placeholder="년"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              readOnly={isReadOnly}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">　</div>
            <InputBox
              placeholder="월"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              readOnly={isReadOnly}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">　</div>
            <InputBox
              placeholder="일"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              readOnly={isReadOnly}
            />
          </div>
        </HorizontalLineWrapper>

        {(userInfo?.role === "ROLE_ADMIN" ||
          userInfo?.role === "ROLE_TEACHER") && (
          <HorizontalLineWrapper>
            <ButtonOrange text={"학생 정보 수정"} onClick={onClose} />
            <ButtonWhite
              text={"학생 삭제"}
              onClick={() => {
                const isConfirmed = window.confirm("정말로 삭제하시겠어요?");
                if (isConfirmed) {
                  onClose(); // 삭제 작업 수행
                }
              }}
            />
          </HorizontalLineWrapper>
        )}
      </ContentRight>
    </ContentWrapper>
  );
};

// 스타일 컴포넌트
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const ContentLeft = styled.div`
  width: 300px;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }
`;

const UserImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 120px;
    width: auto;
  }
`;

const ContentRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;

  @media (max-width: 768px) {
    padding: 0 10px;
    gap: 12px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const InputBox = styled.input`
  flex: 1;
  height: 48px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 12px 20px;

  font-size: 14px;

  &:read-only {
    background-color: #f2f2f2;
    color: #555;
    cursor: default;
  }

  @media (max-width: 768px) {
    height: 40px;
    font-size: 12px;
    padding: 10px 14px;
  }
`;

const HorizontalLineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  gap: 8px;
  width: 100%;

  input {
    width: 150px;
  }

  .inputWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 8px;
  }

  .inputtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #808080;
  }

  button {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;

    input {
      width: 100%;
    }

    .inputtitle {
      font-size: 12px;
    }
  }
`;
