import styled from "styled-components";
import Card from "../../common/Card.tsx";
import AttendanceList from "../../studentlobby/AttendanceList.tsx";

const AttendanceAdd = () => {
  return (
    <AttendanceAddWrapper>
      <Card cardtitle={"출결"} contentChildren={<AttendanceList />} />
    </AttendanceAddWrapper>
  );
};

export default AttendanceAdd;

const AttendanceAddWrapper = styled.div`
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
