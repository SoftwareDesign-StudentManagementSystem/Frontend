import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAllSpecialties } from "../../apis/specialnote";
import { Specialty } from "../../types/specialnotes";
import { useSearchParams } from "react-router-dom";

interface SpecialNoteListProps {
  setIsAddMode?: (value: boolean) => void;
  setEditData?: (note: Specialty) => void;
}

const SpecialNoteList = ({
  setIsAddMode,
  setEditData,
}: SpecialNoteListProps) => {
  const [notes, setNotes] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getAllSpecialties(Number(id));
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setNotes(sorted.slice(0, 3));
      } catch (error) {
        console.error("특기사항 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, [id]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

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
          {loading ? (
            <tr>
              <td colSpan={2} className="nodata">
                불러오는 중...
              </td>
            </tr>
          ) : notes.length === 0 ? (
            <tr>
              <td colSpan={2} className="nodata">
                특기사항 정보가 없습니다.
              </td>
            </tr>
          ) : (
            notes.map((note) => (
              <tr
                key={note.id}
                onClick={() => {
                  if (setEditData && setIsAddMode) {
                    setEditData(note);
                    setIsAddMode(true);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <td>{formatDate(note.date)}</td>
                <td className="content">{note.content}</td>
              </tr>
            ))
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
    padding: 60px 0;
    color: #999;
    background-color: #f8f8f8;
    font-size: 15px;
  }
`;
