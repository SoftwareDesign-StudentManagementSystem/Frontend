import { Specialty } from "../../../types/specialnotes";
import { UserDetailInfo } from "../../../types/members";
interface SpecialAddProps {
    setIsAddMode: (arg0: boolean) => void;
    studentInfo?: UserDetailInfo;
    editData?: Specialty;
}
declare const SpecialAdd: ({ setIsAddMode, studentInfo, editData, }: SpecialAddProps) => import("react/jsx-runtime").JSX.Element;
export default SpecialAdd;
