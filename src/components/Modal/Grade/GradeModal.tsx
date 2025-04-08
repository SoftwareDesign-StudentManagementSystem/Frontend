import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import GradeAdd from "./GradeAdd.tsx";
import { useState } from "react";
import GradeList from "../../studentlobby/GradeList.tsx";
import chart from "../../../assets/chart.svg";

const GradeModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose} content={<GradeModalContent />} title={"성적"} />
  );
};
export default GradeModal;

const GradeModalContent = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  return (
    <GradeModalContentWrapper>
      {!isAddMode ? (
        <GradeViewWrapper>
          <div className="leftcontent">
            <div
              onClick={() => {
                setIsAddMode(true);
              }}
            >
              <Card cardtitle={"3학년 2학기"} contentChildren={<GradeList />} />
            </div>
          </div>
          <Chart src={chart} />
        </GradeViewWrapper>
      ) : (
        <GradeAdd />
      )}
    </GradeModalContentWrapper>
  );
};

const GradeModalContentWrapper = styled.div`
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

const GradeViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;

  align-items: center;

  .leftcontent {
    min-width: fit-content;
  }
`;

const Chart = styled.img`
  width: 50%;
`;
