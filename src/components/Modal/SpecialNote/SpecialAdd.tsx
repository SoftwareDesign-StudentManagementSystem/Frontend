import styled from "styled-components";
import DropDownMenu from "../../common/DropDownMenu.tsx";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import ButtonOrange from "../../common/ButtonOrange.tsx";

const InputBox = () => {
  return <InputBoxWrapper placeholder="내용을 입력해주세요." />;
};
interface SpecialAddProps {
  setIsAddMode: (arg0: boolean) => void;
}
const SpecialAdd = ({ setIsAddMode }: SpecialAddProps) => {
  const options = ["25년 1월 13일"];
  return (
    <FeedBackAddWrapper>
      <div>
        <div className="title">기록일</div>

        <DropDownMenu options={options} />
      </div>
      <InputBox />

      <ButtonGroup>
        <ButtonWhite
          text={"돌아가기"}
          onClick={() => {
            setIsAddMode(false);
          }}
        />
        <ButtonOrange text={"저장"} onClick={() => {}} />
      </ButtonGroup>
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

  @media (max-width: 768px) {
    gap: 12px;

    .title {
      font-size: 16px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-top: 20px;

  @media (max-width: 768px) {
    gap: 8px;
    padding-top: 12px;
  }
`;
