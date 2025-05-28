import { Specialty } from "../../types/specialnotes";
interface SpecialNoteListProps {
    setIsAddMode?: (value: boolean) => void;
    setEditData?: (note: Specialty) => void;
}
declare const SpecialNoteList: ({ setIsAddMode, setEditData, }: SpecialNoteListProps) => import("react/jsx-runtime").JSX.Element;
export default SpecialNoteList;
