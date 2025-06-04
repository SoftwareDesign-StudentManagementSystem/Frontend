interface Props {
    studentId: number;
    selectedGrade: number;
    selectedMonth?: string;
    miniview?: boolean;
    canEdit?: boolean;
}
declare const AttendanceList: ({ studentId, selectedGrade, selectedMonth, miniview, canEdit, }: Props) => import("react/jsx-runtime").JSX.Element;
export default AttendanceList;
