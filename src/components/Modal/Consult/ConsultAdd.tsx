import styled from "styled-components";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper.tsx";
import DropDownMenu from "../../common/DropDownMenu.tsx";

const InputBox = () => {
  return <InputBoxWrapper placeholder="내용을 입력해주세요." />;
};

const ConsultAdd = () => {
  const options = ["25년 1월 23일"];
  return (
    <ConsultAddWrapper>
      <div>
        <div>
          <div className="title">상담 날짜</div>
          <DropDownMenu options={options} />
          <div className="title">다음 상담 날짜</div>
          <DropDownMenu options={options} />
        </div>
        <div>
          <div className="title">상담 교사명</div>
          <DropDownMenu options={options} />
        </div>
      </div>

      <InputBox />
    </ConsultAddWrapper>
  );
};

export default ConsultAdd;

const ConsultAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-transform: capitalize;
    color: #000000;
    //margin-bottom: 8px;
  }
`;
