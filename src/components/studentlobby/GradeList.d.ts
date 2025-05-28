import { GradeListProps } from "../../types/grades.ts";
interface GradeListExtendedProps extends GradeListProps {
    showInputRow?: boolean;
    setShowInputRow?: (v: boolean) => void;
}
declare const GradeList: ({ studentId, year, semester, miniView, showInputRow, setShowInputRow, }: GradeListExtendedProps) => import("react/jsx-runtime").JSX.Element;
export default GradeList;
