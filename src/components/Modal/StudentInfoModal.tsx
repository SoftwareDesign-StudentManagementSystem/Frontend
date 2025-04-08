import styled from "styled-components";
import 횃불이 from "../../assets/횃불이.svg";
import { useState } from "react";
import ButtonOrange from "../common/ButtonOrange";
import ButtonWhite from "../common/ButtonWhite";
import Modal from "./Modal";

const StudentInfoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      title={"학생 정보"}
      content={<StudentInfoModalContent onClose={onClose} />}
      onClose={onClose}
    ></Modal>
  );
};
export default StudentInfoModal;

const StudentInfoModalContent = ({ onClose }: { onClose: () => void }) => {
  const [grade, setGrade] = useState("");
  const [classnum, setClassnum] = useState("");
  const [studentid, setStudentid] = useState("");
  const [name, setName] = useState("");

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
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">_</div>
            <InputBox
              placeholder="월"
              value={classnum}
              onChange={(e) => setClassnum(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">_</div>
            <InputBox
              placeholder="일"
              value={studentid}
              onChange={(e) => setStudentid(e.target.value)}
            />
          </div>
        </HorizontalLineWrapper>
        <HorizontalLineWrapper>
          <ButtonOrange text={"학생 정보 수정"} />
          <ButtonWhite text={"학생 삭제"} onClick={onClose} />
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
