import "react-datepicker/dist/react-datepicker.css";
import { Consult } from "../../../types/consults.ts";
import { UserDetailInfo } from "../../../types/members";
interface ConsultAddProps {
    setIsAddMode: (value: boolean) => void;
    editData?: Consult | null;
    studentInfo: UserDetailInfo;
}
declare const ConsultAdd: ({ setIsAddMode, editData, studentInfo, }: ConsultAddProps) => import("react/jsx-runtime").JSX.Element;
export default ConsultAdd;
