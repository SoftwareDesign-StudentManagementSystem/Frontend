import styled from "styled-components";

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
  border: none;

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

export default InputBoxWrapper;
