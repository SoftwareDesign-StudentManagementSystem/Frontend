import styled from "styled-components";
import DropDownMenu from "../../common/DropDownMenu.tsx";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper.tsx";

const InputBox = () => {
  return <InputBoxWrapper placeholder="내용을 입력해주세요." />;
};

const SpecialAdd = () => {
  const options = ["25년 1월 13일"];
  return (
    <FeedBackAddWrapper>
      <div>
        <div className="title">기록일</div>

        <DropDownMenu options={options} />
      </div>
      <InputBox />
    </FeedBackAddWrapper>
  );
};

export default SpecialAdd;

const FeedBackAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-transform: capitalize;
    color: #000000;
    margin-bottom: 10px;
  }
`;
