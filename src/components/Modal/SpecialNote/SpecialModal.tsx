import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import SpecialAdd from "./SpecialAdd.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { useState } from "react";
import SpecialNoteList from "../../studentlobby/SpecialNoteList.tsx";
import useUserStore from "../../../stores/useUserStore.ts";

const SpecialModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      onClose={onClose}
      content={<SpecialModalContent />}
      title={"특기사항"}
    />
  );
};
export default SpecialModal;

const SpecialModalContent = () => {
  const { userInfo } = useUserStore();

  const [isAddMode, setIsAddMode] = useState(false);
  return (
    <SpecialModalContentWrapper>
      {!isAddMode ? (
        <>
          <Card cardtitle={"특기 사항"} contentChildren={<SpecialNoteList />} />
          {userInfo.role !== "ROLE_STUDENT" && (
            <>
              <ButtonWhite
                text={"+ 특기사항 추가"}
                onClick={() => setIsAddMode(true)}
              />
            </>
          )}
        </>
      ) : (
        <SpecialAdd setIsAddMode={setIsAddMode} />
      )}
    </SpecialModalContentWrapper>
  );
};

const SpecialModalContentWrapper = styled.div`
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
