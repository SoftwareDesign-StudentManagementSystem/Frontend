import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import ConsultAdd from "./ConsultAdd.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { useState } from "react";
import ConsultList from "../../studentlobby/ConsultList.tsx";
import { useSearchParams } from "react-router-dom";
import useUserStore from "../../../stores/useUserStore.ts";

const ConsultModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      onClose={onClose}
      content={<ConsultModalContent />}
      title={"상담 내역"}
    />
  );
};
export default ConsultModal;

const ConsultModalContent = () => {
  const { userInfo } = useUserStore();

  //선택된 학생의 정보
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id");
  const [isAddMode, setIsAddMode] = useState(false);
  return (
    <FeedBackModalContentWrapper>
      {!isAddMode ? (
        <>
          <Card
            cardtitle={"상담 내역"}
            contentChildren={<ConsultList studentId={Number(studentId)} />}
          />
          {userInfo.role !== "ROLE_STUDENT" && (
            <>
              <ButtonWhite
                text={"+ 상담내역 추가"}
                onClick={() => setIsAddMode(true)}
              />
            </>
          )}
        </>
      ) : (
        <>
          <ConsultAdd setIsAddMode={setIsAddMode} />
        </>
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
