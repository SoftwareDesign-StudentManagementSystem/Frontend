import Modal from "../Modal";
import styled from "styled-components";

import Card from "../../common/Card";
import { useState } from "react";
import AttendanceList from "../../studentlobby/AttendanceList";
import { useSearchParams } from "react-router-dom";
import DropDownMenu from "../../common/DropDownMenu";
import { UserDetailInfo } from "../../../types/members";

const AttendanceModal = ({
  onClose,
  studentInfo,
}: {
  onClose: () => void;
  studentInfo: UserDetailInfo;
}) => {
  return (
    <Modal
      onClose={onClose}
      content={<AttendanceModalContent studentInfo={studentInfo} />}
      title={"출결"}
    />
  );
};
export default AttendanceModal;

const AttendanceModalContent = ({
  studentInfo,
}: {
  studentInfo: UserDetailInfo;
}) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // 🔹 현재 월을 기본값으로 설정
  const getCurrentMonthLabel = () => `${new Date().getMonth() + 1}월`;
  const [selectedMonth, setSelectedMonth] = useState<string>(
    getCurrentMonthLabel(),
  );

  // 🔹 학년 상태 및 숫자 변환 로직
  const gradeOptions = ["1학년", "2학년", "3학년"];
  const [selectedGrade, setSelectedGrade] = useState<string>(
    studentInfo.year + "학년",
  );

  // 🔹 선택된 학년을 숫자로 변환
  const selectedGradeNumber = Number(selectedGrade.replace("학년", ""));

  // 🔹 월 옵션 (1월 ~ 12월)
  const monthOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  return (
    <AttendanceModalContentWrapper>
      <Card
        cardtitle={"출결"}
        headerChildren={
          <HeaderWrapper>
            <div style={{ fontSize: "15px" }}>
              출석:O, 결석:🖤, 지각:×, 조퇴:◎
            </div>

            {/* 🔹 학년 선택 드롭다운 */}
            <DropDownMenu
              options={gradeOptions}
              defaultSelected={gradeOptions[0]}
              onSelect={(option) => setSelectedGrade(option)}
            />

            {/* 🔹 월 선택 드롭다운 */}
            <DropDownMenu
              options={monthOptions}
              defaultSelected={getCurrentMonthLabel()}
              onSelect={(option) => setSelectedMonth(option)}
            />
          </HeaderWrapper>
        }
        contentChildren={
          <AttendanceList
            studentId={Number(id)}
            selectedMonth={selectedMonth}
            miniview={false}
            selectedGrade={selectedGradeNumber} // 🔹 숫자로 전달
          />
        }
      />
    </AttendanceModalContentWrapper>
  );
};

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
