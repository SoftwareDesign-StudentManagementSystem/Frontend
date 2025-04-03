import styled from "styled-components";

const GradeList = () => {
  const grades = [
    {
      subject: "수학",
      score: "95 / 85",
      achievement: "A+ (30명)",
      rank: "1등급",
    },
    {
      subject: "영어",
      score: "88 / 82",
      achievement: "A (28명)",
      rank: "2등급",
    },
    {
      subject: "과학",
      score: "92 / 80",
      achievement: "A+ (25명)",
      rank: "1등급",
    },
    {
      subject: "국어",
      score: "85 / 78",
      achievement: "B+ (32명)",
      rank: "3등급",
    },
    {
      subject: "사회",
      score: "90 / 79",
      achievement: "A (27명)",
      rank: "2등급",
    },
  ];

  return (
    <GradeListWrapper>
      <table>
        <thead>
          <tr>
            <th>과목명</th>
            <th>원점수/과목 평균</th>
            <th>성취도 (수강자 수)</th>
            <th>석차 등급</th>
          </tr>
        </thead>
        <tbody>
          {grades.slice(0, 3).map((grade, index) => (
            <tr key={index}>
              <td>{grade.subject}</td>
              <td>{grade.score}</td>
              <td>{grade.achievement}</td>
              <td>{grade.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GradeListWrapper>
  );
};

export default GradeList;

const GradeListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    //border: 1px solid #f1f2f8;
    //background-color: #f9f9f9;
  }

  th,
  td {
    border: 1px solid #f1f2f8;
    padding: 10px;
    text-align: center;
  }

  .content {
    text-align: left;
  }

  th {
    //background-color: #f0f0f0;
    font-weight: bold;
    text-align: center;
  }
`;
