import { UserInfo } from "../../types/members";
interface StudentListProps {
    students: UserInfo[];
    maxHeight?: string;
}
declare const StudentList: ({ students, maxHeight }: StudentListProps) => import("react/jsx-runtime").JSX.Element;
export default StudentList;
