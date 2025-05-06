import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import AttendanceAdd from "./AttendanceAdd.tsx";
import { useState } from "react";
import AttendanceList from "../../studentlobby/AttendanceList.tsx";

const AttendanceModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      onClose={onClose}
      content={<AttendanceModalContent />}
      title={"출결"}
    />
  );
};
export default AttendanceModal;

const AttendanceModalContent = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  return (
    <AttendanceModalContentWrapper>
      {!isAddMode ? (
        <>
          {/*<div className="title">출결을 수정하실 날짜를 선택해주세요.</div>*/}
          <Card cardtitle={"출결"} contentChildren={<AttendanceList />} />
        </>
      ) : (
        <AttendanceAdd />
      )}
    </AttendanceModalContentWrapper>
  );
};

const AttendanceModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 100%;
  //padding: 1rem;

  button {
    width: 100%;
  }

  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-transform: capitalize;
    color: #000000;
    //margin-bottom: 8px;
  }
`;
