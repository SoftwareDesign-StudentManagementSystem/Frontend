import "react-datepicker/dist/react-datepicker.css";
import { Consult } from "../../../types/consults.ts";
interface ConsultAddProps {
    setIsAddMode: (value: boolean) => void;
    editData?: Consult | null;
}
declare const ConsultAdd: ({ setIsAddMode, editData }: ConsultAddProps) => import("react/jsx-runtime").JSX.Element;
export default ConsultAdd;
