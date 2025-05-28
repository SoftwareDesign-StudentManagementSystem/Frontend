import { Consult } from "../../types/consults.ts";
declare const ConsultList: ({ studentId, onSelect, }: {
    studentId: number;
    onSelect?: (consult: Consult) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default ConsultList;
