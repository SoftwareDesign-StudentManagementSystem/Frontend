import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import ConsultAdd from "./ConsultAdd.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { useState } from "react";
import ConsultList from "../../studentlobby/ConsultList.tsx";
import { useSearchParams } from "react-router-dom";
import useUserStore from "../../../stores/useUserStore.ts";
import { Consult } from "../../../types/consults.ts";
import { UserDetailInfo } from "../../../types/members";

const ConsultModal = ({
  onClose,
  studentInfo,
}: {
  onClose: () => void;
  studentInfo: UserDetailInfo;
}) => {
  return (
    <Modal
      onClose={onClose}
      content={<ConsultModalContent studentInfo={studentInfo} />}
      title={"상담 내역"}
    />
  );
};
export default ConsultModal;

const ConsultModalContent = ({
  studentInfo,
}: {
  studentInfo: UserDetailInfo;
}) => {
  const { userInfo } = useUserStore();

  //선택된 학생의 정보
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id");
  const [isAddMode, setIsAddMode] = useState(false);

  const [selectedConsult, setSelectedConsult] = useState<Consult | null>(null);

  return (
    <FeedBackModalContentWrapper>
      {!isAddMode ? (
        <>
          <Card
            cardtitle={"상담 내역"}
            contentChildren={
              <ConsultList
                studentId={Number(studentId)}
                onSelect={(consult) => {
                  setSelectedConsult(consult);
                  setIsAddMode(true);
                }}
              />
            }
          />
          {userInfo.role === "ROLE_TEACHER" && (
            <>
              <ButtonWhite
                text={"+ 상담내역 추가"}
                onClick={() => {
                  setSelectedConsult(null);
                  setIsAddMode(true);
                }}
              />
            </>
          )}
        </>
      ) : (
        <>
          <ConsultAdd
            setIsAddMode={setIsAddMode}
            editData={selectedConsult}
            studentInfo={studentInfo}
          />
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
