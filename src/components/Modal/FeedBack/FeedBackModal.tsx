import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import FeedbackList from "../../studentlobby/FeedbackList.tsx";
import FeedBackAdd from "./FeedBackAdd.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FeedBackModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      onClose={onClose}
      content={<FeedBackModalContent />}
      title={"피드백"}
    />
  );
};
export default FeedBackModal;

const FeedBackModalContent = () => {
  const [isAddMode, setIsAddMode] = useState(false);

  //선택된 학생의 정보
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id");

  return (
    <FeedBackModalContentWrapper>
      {!isAddMode ? (
        <>
          <Card
            cardtitle={"피드백"}
            contentChildren={<FeedbackList studentId={Number(studentId)} />}
          />
          <ButtonWhite
            text={"+ 피드백 추가"}
            onClick={() => setIsAddMode(true)}
          />
        </>
      ) : (
        <FeedBackAdd setIsAddMode={setIsAddMode} />
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
