import { Specialty } from "../../types/specialnotes";
interface SpecialNoteListProps {
    setIsAddMode?: (value: boolean) => void;
    setEditData?: (note: Specialty) => void;
    miniView?: boolean;
}
declare const SpecialNoteList: ({ setIsAddMode, setEditData, miniView, }: SpecialNoteListProps) => import("react/jsx-runtime").JSX.Element;
export default SpecialNoteList;
