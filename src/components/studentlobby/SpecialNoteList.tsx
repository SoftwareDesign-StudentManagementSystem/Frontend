import styled from "styled-components";

const SpecialNoteList = () => {
  const notes = [
    { date: "2025-04-01", content: "회의 일정 조정" },
    { date: "2025-04-02", content: "프로젝트 마감일 확인" },
    { date: "2025-04-03", content: "신규 기능 추가 논의" },
    { date: "2025-04-04", content: "디자인 시안 검토" },
    { date: "2025-04-05", content: "코드 리뷰 및 수정" },
  ];

  return (
    <SpecialNoteListWrapper>
      <table>
        <thead>
          <tr>
            <th>기록일</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {notes.slice(0, 3).map((note, index) => (
            <tr key={index}>
              <td>{note.date}</td>
              <td className="content">{note.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SpecialNoteListWrapper>
  );
};

export default SpecialNoteList;

const SpecialNoteListWrapper = styled.div`
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
