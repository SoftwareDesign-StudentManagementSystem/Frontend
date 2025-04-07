import styled from "styled-components";

const InputBox = () => {
  return <InputBoxWrapper placeholder="내용을 입력해주세요." />;
};
const InputBoxWrapper = styled.textarea`
  /* \bcheck-box */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  gap: 8px;

  width: 100%;
  height: 145px;

  background: #f1f2f8;
  border-radius: 8px 8px 0px 0px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  font-family: "Pretendard";

  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 125%;
  /* identical to box height, or 22px */

  color: #333333;

  resize: none;
`;

const ConsultAdd = () => {
  return (
    <ConsultAddWrapper>
      <div className="title">상담 날짜</div>

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
