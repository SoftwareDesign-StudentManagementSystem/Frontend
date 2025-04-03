import styled from "styled-components";

const ListHeader = () => {
  return <ListHeaderWrapper>학년 반 번호 이름</ListHeaderWrapper>;
};

export default ListHeader;

const ListHeaderWrapper = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  color: #666666;
`;
