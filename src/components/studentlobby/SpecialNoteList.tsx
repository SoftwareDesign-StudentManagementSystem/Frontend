import styled from "styled-components";

const SpecialNoteList = () => {
  const notes = [
    { date: "2025-05-01", content: "수학 경시대회 최우수상 수상" },
    { date: "2025-05-03", content: "체육 수업에서 적극적인 태도 칭찬" },
    { date: "2025-05-07", content: "과학 프로젝트 발표 우수" },
    { date: "2025-05-10", content: "학급 내 리더십 발휘" },
    { date: "2025-05-12", content: "국어 독후감 경진대회 입상" },
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedNotes = notes.slice(0, 3);

  return (
    <SpecialNoteListWrapper>
      <table>
        <thead>
          <tr>
            <th>기록일</th>
            <th>특기사항</th>
          </tr>
        </thead>
        <tbody>
          {displayedNotes.length === 0 ? (
            <tr>
              <td colSpan={2} className="nodata">
                등록된 특기사항이 없습니다.
              </td>
            </tr>
          ) : (
            displayedNotes.map((note, index) => {
              const formatDate = (dateStr: string) => {
                const date = new Date(dateStr);
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");
                return `${month}/${day}`;
              };

              return (
                <tr key={index}>
                  <td>{formatDate(note.date)}</td>
                  <td className="content">{note.content}</td>
                </tr>
              );
            })
          )}
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

  table {
    width: 100%;
    border-collapse: collapse;
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
    font-weight: bold;
    text-align: center;
  }

  .nodata {
    text-align: center;
    padding: 20px 0;
    color: #999;
    background-color: #f8f8f8;
    font-size: 15px;
  }
`;
