import styled from "styled-components";
import 횃불이 from "../../assets/횃불이.svg";
import { useState } from "react";
import ButtonOrange from "../common/ButtonOrange";
import ButtonWhite from "../common/ButtonWhite";
import Modal from "./Modal";
import { UserInfo } from "../../types/members.ts";
import useUserStore from "../../stores/useUserStore.ts";

const StudentInfoModal = ({
  onClose,
  studentInfo,
}: {
  onClose: () => void;
  studentInfo?: UserInfo;
}) => {
  return (
    <Modal
      title={"학생 정보"}
      content={
        <StudentInfoModalContent
          onClose={onClose}
          studentInfo={studentInfo ? studentInfo : undefined}
        />
      }
      onClose={onClose}
    ></Modal>
  );
};
export default StudentInfoModal;

const StudentInfoModalContent = ({
  onClose,
  studentInfo,
}: {
  onClose: () => void;
  studentInfo?: UserInfo;
}) => {
  const { userInfo } = useUserStore(); //로그인 되어있는 사용자 정보

  const [name, setName] = useState(studentInfo?.name); //이름
  const [grade, setGrade] = useState(studentInfo?.year?.toString() || ""); //학년
  const [classnum, setClassnum] = useState(studentInfo?.classId?.toString()); //반
  const [studentid, setStudentid] = useState(studentInfo?.number?.toString()); //번호

  //생년월일
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  return (
    <>
      <ContentLeft>
        <UserImage src={횃불이} alt="학생 이미지" />
      </ContentLeft>
      <ContentRight>
        <HorizontalLineWrapper>
          <div className="inputWrapper">
            <div className="inputtitle">이름</div>
            <InputBox
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">반</div>
            <InputBox
              placeholder="반"
              value={classnum}
              onChange={(e) => setClassnum(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">번호</div>
            <InputBox
              placeholder="번호"
              value={studentid}
              onChange={(e) => setStudentid(e.target.value)}
            />
          </div>
        </HorizontalLineWrapper>
        <HorizontalLineWrapper>
          <div className="inputWrapper">
            <div className="inputtitle">생년월일</div>
            <InputBox
              placeholder="년"
              value={birthYear}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">_</div>
            <InputBox
              placeholder="월"
              value={birthMonth}
              onChange={(e) => setClassnum(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">_</div>
            <InputBox
              placeholder="일"
              value={birthDay}
              onChange={(e) => setStudentid(e.target.value)}
            />
          </div>
        </HorizontalLineWrapper>
        <HorizontalLineWrapper>
          <ButtonOrange text={"학생 정보 수정"} onClick={onClose} />
          {userInfo?.role === "ROLE_ADMIN" ||
            (userInfo?.role === "ROLE_TEACHER" && (
              <>
                <ButtonWhite
                  text={"학생 삭제"}
                  onClick={() => {
                    const isConfirmed =
                      window.confirm("정말로 삭제하시겠어요?");
                    if (isConfirmed) {
                      onClose(); // 삭제 작업 수행
                    }
                  }}
                />
              </>
            ))}
        </HorizontalLineWrapper>
      </ContentRight>
    </>
  );
};

// 왼쪽 영역
const ContentLeft = styled.div`
  width: fit-content;
  height: 100%;
  //background: red;
  //overflow: hidden;
`;

// 사용자 이미지
const UserImage = styled.img`
  //width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 오른쪽 정보 영역
const ContentRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  //gap: 20px;
  justify-content: space-between;
  padding: 10px 15px;
`;

const InputBox = styled.input`
  flex: 1;

  height: 48px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 12px 20px;
`;

const HorizontalLineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: center;
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
    line-height: 150%; /* identical to box height, or 21px */
    color: #808080;
  }

  button {
    width: 100%;
  }
`;
