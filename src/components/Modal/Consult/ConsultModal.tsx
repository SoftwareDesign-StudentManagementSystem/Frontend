import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import ConsultAdd from "./ConsultAdd.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { useState } from "react";
import ConsultList from "../../studentlobby/ConsultList.tsx";

const ConsultModal = ({
  onClose,
  studentId,
}: {
  onClose: () => void;
  studentId: number;
}) => {
  return (
    <Modal
      onClose={onClose}
      content={<ConsultModalContent studentId={studentId} />}
      title={"상담 내역"}
    />
  );
};
export default ConsultModal;

const ConsultModalContent = ({ studentId }: { studentId: number }) => {
  const [isAddMode, setIsAddMode] = useState(false);
  return (
    <FeedBackModalContentWrapper>
      {!isAddMode ? (
        <>
          <Card
            cardtitle={"상담 내역"}
            contentChildren={<ConsultList studentId={Number(studentId)} />}
          />
          <ButtonWhite
            text={"+ 상담내역 추가"}
            onClick={() => setIsAddMode(true)}
          />
        </>
      ) : (
        <ConsultAdd />
      )}
    </FeedBackModalContentWrapper>
  );
};

const FeedBackModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 100%;
  //padding: 1rem;

  button {
    width: 100%;
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #e2e0db;
  }
`;
