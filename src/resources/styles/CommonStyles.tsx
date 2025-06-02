import { createGlobalStyle } from "styled-components";

const CommonStyles = createGlobalStyle`
  //이 안에 전체 프로젝트에 적용될 css를 작성하면 됩니다~!
    button{
        border: none;
        background: none;
        cursor: pointer;
    }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin:0;
  }
  

`;

import "react-datepicker/dist/react-datepicker.css";
export const DatePickerOverride = createGlobalStyle`
  .react-datepicker-popper {
    margin-left: 30px !important; /* 달력을 오른쪽으로 살짝 밀기 */
  }
`;

export default CommonStyles;
