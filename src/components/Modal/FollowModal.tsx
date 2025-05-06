import Modal from "./Modal";
import styled from "styled-components";
import ButtonOrange from "../common/ButtonOrange.tsx";
import ButtonWhite from "../common/ButtonWhite.tsx";
import { postFollowAccept } from "../../apis/members.ts";

const FollowModal = ({
  onClose,
  parentName,
  memberId,
}: {
  onClose: () => void;
  parentName: string;
  memberId: number;
}) => {
  return (
    <Modal
      onClose={onClose}
      content={
        <FollowModalContent parentName={parentName} memberId={memberId} />
      }
      title={"팔로우"}
    />
  );
};
export default FollowModal;

const FollowModalContent = ({
  parentName,
  memberId,
}: {
  parentName: string;
  memberId: number;
}) => {
  //팔로우 승인 함수
  const handleAccept = async () => {
    try {
      const data = await postFollowAccept(memberId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FollowModalContentWrapper>
      <div className="info">{parentName}</div>

      <ButtonWrapper>
        <ButtonWhite text={"거절하기"} onClick={() => {}} />
        <ButtonOrange text={"승인하기"} onClick={handleAccept} />
      </ButtonWrapper>
    </FollowModalContentWrapper>
  );
};

const FollowModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 100%;
  //padding: 1rem;

  .info {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;

    color: #000000;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
  button {
    width: 200px;
  }
`;
