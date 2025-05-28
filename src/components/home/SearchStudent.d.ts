import { UserInfo } from "../../types/members";
interface SearchStudentProps {
    students: UserInfo[];
    onSearch: (params: {
        grade: string;
        classnum: string;
        studentid: string;
        name: string;
    }) => void;
}
declare const SearchStudent: ({ onSearch }: SearchStudentProps) => import("react/jsx-runtime").JSX.Element;
export default SearchStudent;
