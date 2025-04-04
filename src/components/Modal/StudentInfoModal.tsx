import styled from "styled-components";
import 횃불이 from "../../assets/횃불이.svg";
import { useState } from "react";

const StudentInfoModal = ({ onClose }: { onClose: () => void }) => {
  const [grade, setGrade] = useState("");
  const [classnum, setClassnum] = useState("");
  const [studentid, setStudentid] = useState("");
  const [name, setName] = useState("");

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>학생 정보</h2>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </ModalHeader>
        <ContentWrapper>
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
          </ContentRight>
        </ContentWrapper>
      </ModalWrapper>
    </Overlay>
  );
};

export default StudentInfoModal;

// 모달 배경 (오버레이)
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨테이너
const ModalWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
`;

// 모달 헤더 (제목 + 닫기 버튼)
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

// 닫기 버튼
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

// 콘텐츠 컨테이너
const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

// 왼쪽 영역
const ContentLeft = styled.div`
  width: 200px;
  height: 100%;
  overflow: hidden;
`;

// 사용자 이미지
const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 오른쪽 정보 영역
const ContentRight = styled.div`
  flex: 1;
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
  align-items: center;
  gap: 8px;

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
`;
