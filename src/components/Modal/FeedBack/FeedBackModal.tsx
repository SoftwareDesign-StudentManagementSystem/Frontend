import Modal from "../Modal";
import styled from "styled-components";

import Card from "../../common/Card";
import FeedbackList from "../../studentlobby/FeedbackList";
import FeedBackAdd from "./FeedBackAdd";
import ButtonWhite from "../../common/ButtonWhite";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUserStore from "../../../stores/useUserStore";
import { UserDetailInfo } from "../../../types/members";
import { Feedback } from "../../../types/feedback";

const FeedBackModal = ({
  onClose,
  studentInfo,
}: {
  onClose: () => void;
  studentInfo: UserDetailInfo;
}) => {
  return (
    <Modal
      onClose={onClose}
      content={<FeedBackModalContent studentInfo={studentInfo} />}
      title={"피드백"}
    />
  );
};
export default FeedBackModal;

const FeedBackModalContent = ({
  studentInfo,
}: {
  studentInfo: UserDetailInfo;
}) => {
  const { userInfo } = useUserStore();

  //선택된 학생의 정보
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id");

  const [isAddMode, setIsAddMode] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);

  return (
    <FeedBackModalContentWrapper>
      {!isAddMode ? (
        <>
          <Card
            cardtitle={"피드백"}
            contentChildren={
              <FeedbackList
                studentId={Number(studentId)}
                onSelectFeedback={(feedback) => {
                  setEditingFeedback(feedback);
                  setIsAddMode(true);
                }}
              />
            }
          />

          {userInfo.role === "ROLE_TEACHER" && (
            <>
              <ButtonWhite
                text={"+ 피드백 추가"}
                onClick={() => {
                  setEditingFeedback(null);
                  setIsAddMode(true);
                }}
              />
            </>
          )}
        </>
      ) : (
        <FeedBackAdd
          setIsAddMode={setIsAddMode}
          studentInfo={studentInfo}
          initialFeedback={editingFeedback}
        />
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
