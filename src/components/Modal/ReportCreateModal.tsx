import Modal from "./Modal";
import styled from "styled-components";
import { useState } from "react";
import ButtonOrange from "../common/ButtonOrange";
import DropDownMenu from "../common/DropDownMenu";
import { postReportRequest } from "../../apis/reportcreate";
import { useLoading } from "../../stores/LoadingProvider.tsx";

const ReportCreateModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      onClose={onClose}
      content={<ReportCreateModalContent />}
      title={"보고서 생성"}
    />
  );
};
export default ReportCreateModal;

const ReportCreateModalContent = () => {
  const categories = ["전체", "성적", "피드백", "상담내역", "출결", "특기사항"];
  const yearOptions = [
    { label: "1학년", value: "1" },
    { label: "2학년", value: "2" },
    { label: "3학년", value: "3" },
  ];
  const semesterOptions = [
    { label: "1학기", value: "FIRST_SEMESTER" },
    { label: "2학기", value: "SECOND_SEMESTER" },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState(yearOptions[0].value);
  const [selectedSemester, setSelectedSemester] = useState(
    semesterOptions[0].value,
  );

  const { showLoading, hideLoading } = useLoading();

  const toggleCategory = (category: string) => {
    if (category === "전체") {
      if (selectedCategories.length === categories.length - 1) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(categories.filter((c) => c !== "전체"));
      }
    } else {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const isAllSelected = selectedCategories.length === categories.length - 1;

  const extractStudentIdFromUrl = (): number | null => {
    const params = new URLSearchParams(window.location.search);
    const idStr = params.get("id");
    return idStr ? parseInt(idStr, 10) : null;
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleDownload = async () => {
    const studentId = extractStudentIdFromUrl();
    if (!studentId) {
      alert("학생 ID를 찾을 수 없습니다.");
      return;
    }

    const requestBody = {
      studentIdList: [studentId],
      year: parseInt(selectedYear),
      semester: selectedSemester as "FIRST_SEMESTER" | "SECOND_SEMESTER",
      reportFormat: "PDF",
      grade: selectedCategories.includes("성적"),
      attendance: selectedCategories.includes("출결"),
      counsel: selectedCategories.includes("상담내역"),
      feedback: selectedCategories.includes("피드백"),
      specialty: selectedCategories.includes("특기사항"),
    };

    try {
      alert("보고서 생성을 요청중입니다. 수 초 정도 걸릴 수 있습니다.");
      showLoading();
      const response = await postReportRequest(requestBody);
      const reportUrls = response?.data?.reportUrls;

      if (!reportUrls || typeof reportUrls !== "object") {
        alert("⚠️ 보고서 URL이 반환되지 않았습니다.");
        return;
      }

      const entries = Object.entries(reportUrls) as [string, string][];

      if (entries.length === 0) {
        alert("⚠️ 다운로드할 보고서가 없습니다.");
        return;
      }

      for (const [name, url] of entries) {
        const link = document.createElement("a");
        link.href = url;

        // 안전한 파일명
        const cleanName = decodeURIComponent(name)
          .replace(/\s+/g, "_")
          .replace(/[^\w가-힣_.-]/g, "")
          .concat(".pdf");

        link.download = cleanName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        await delay(500); // 파일당 500ms 딜레이
      }

      alert(`📄 총 ${entries.length}개의 보고서가 생성되었습니다.`);
    } catch (e) {
      console.error("❌ 보고서 생성 실패", e);
      alert("보고서 생성에 실패했습니다.");
    } finally {
      hideLoading();
    }
  };

  return (
    <ReportCreateModalContentWrapper>
      <div className="info">
        {/*보고서를 생성할 수 있어요.*/}
        {/*<br />*/}
        보고서를 생성하실 학기와 범주를 선택해주세요.
      </div>

      <DropdownRow>
        <DropDownMenu
          options={yearOptions.map((opt) => opt.label)}
          defaultSelected={yearOptions[0].label}
          onSelect={(label) => {
            const found = yearOptions.find((opt) => opt.label === label);
            if (found) setSelectedYear(found.value);
          }}
        />

        <DropDownMenu
          options={semesterOptions.map((opt) => opt.label)}
          defaultSelected={semesterOptions[0].label}
          onSelect={(label) => {
            const found = semesterOptions.find((opt) => opt.label === label);
            if (found) setSelectedSemester(found.value);
          }}
        />
      </DropdownRow>

      <CheckboxGroup>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={
                category === "전체"
                  ? isAllSelected
                  : selectedCategories.includes(category)
              }
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </CheckboxGroup>

      <ButtonWrapper>
        <ButtonOrange text={"다운로드"} onClick={handleDownload} />
      </ButtonWrapper>
    </ReportCreateModalContentWrapper>
  );
};

// 스타일
const ReportCreateModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 100%;

  .info {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 150%;
    color: #000000;
  }
`;

const DropdownRow = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    width: 200px;
  }
`;
