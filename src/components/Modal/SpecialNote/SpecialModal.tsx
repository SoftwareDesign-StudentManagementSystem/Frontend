import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import SpecialAdd from "./SpecialAdd.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { useState } from "react";
import SpecialNoteList from "../../studentlobby/SpecialNoteList.tsx";
import useUserStore from "../../../stores/useUserStore.ts";
import { UserDetailInfo } from "../../../types/members";
import { Specialty } from "../../../types/specialnotes";

const SpecialModal = ({
  onClose,
  studentInfo,
}: {
  onClose: () => void;
  studentInfo?: UserDetailInfo;
}) => {
  return (
    <Modal
      onClose={onClose}
      content={<SpecialModalContent studentInfo={studentInfo} />}
      title={"특기사항"}
    />
  );
};
export default SpecialModal;

const SpecialModalContent = ({
  studentInfo,
}: {
  studentInfo?: UserDetailInfo;
}) => {
  const { userInfo } = useUserStore();

  const [isAddMode, setIsAddMode] = useState(false);
  const [editData, setEditData] = useState<Specialty | undefined>(undefined); // 추가

  return (
    <SpecialModalContentWrapper>
      {!isAddMode ? (
        <>
          <Card
            cardtitle={"특기 사항"}
            contentChildren={
              <SpecialNoteList
                setIsAddMode={setIsAddMode}
                setEditData={setEditData}
              />
            }
          />
          {userInfo.role !== "ROLE_STUDENT" && (
            <ButtonWhite
              text={"+ 특기사항 추가"}
              onClick={() => {
                setEditData(undefined); // 새 작성 시 초기화
                setIsAddMode(true);
              }}
            />
          )}
        </>
      ) : (
        <SpecialAdd
          setIsAddMode={setIsAddMode}
          studentInfo={studentInfo}
          editData={editData} // 전달
        />
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
