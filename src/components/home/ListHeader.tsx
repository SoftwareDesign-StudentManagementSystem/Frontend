import styled from "styled-components";

const ListHeader = () => {
  return (
    <ListHeaderWrapper>
      <span>학년</span> <span>반</span> <span>번호</span> <span>이름</span>
    </ListHeaderWrapper>
  );
};

export default ListHeader;

const ListHeaderWrapper = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  color: #666666;

  display: flex;
  flex-direction: row;
  gap: 10px;

  padding-left: 40px;
`;
