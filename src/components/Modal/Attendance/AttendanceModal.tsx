import Modal from "../Modal";
import styled from "styled-components";

import Card from "../../common/Card";
import { useState } from "react";
import AttendanceList from "../../studentlobby/AttendanceList";
import { useSearchParams } from "react-router-dom";
import DropDownMenu from "../../common/DropDownMenu";

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
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // 🔹 월별 필터링 상태
  const [selectedMonth, setSelectedMonth] = useState<string>("전체");

  // 🔹 월 옵션 (1~12월 + 전체)
  const monthOptions = [
    "전체",
    ...Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
  ];

  return (
    <AttendanceModalContentWrapper>
      <Card
        cardtitle={"출결"}
        headerChildren={
          <HeaderWrapper>
            <div style={{ fontSize: "15px" }}>
              출석:O, 결석:🖤, 지각:×, 조퇴:◎
            </div>
            <DropDownMenu
              options={monthOptions}
              defaultSelected={"전체"}
              onSelect={(option) => setSelectedMonth(option)}
            />
          </HeaderWrapper>
        }
        contentChildren={
          <AttendanceList
            studentId={Number(id)}
            selectedMonth={selectedMonth}
            miniview={false}
          />
        }
      />
    </AttendanceModalContentWrapper>
  );
};

// const AttendanceModalContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 800px;
//   height: 100%;
//   //padding: 1rem;
//
//   button {
//     width: 100%;
//   }
//
//   .title {
//     font-style: normal;
//     font-weight: 400;
//     font-size: 20px;
//     line-height: 150%;
//     text-transform: capitalize;
//     color: #000000;
//     //margin-bottom: 8px;
//   }
// `;

const AttendanceModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;
