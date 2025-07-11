import { Consult } from "../../types/consults";
declare const ConsultList: ({ studentId, onSelect, miniView, }: {
    studentId: number;
    onSelect?: (consult: Consult) => void;
    miniView?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default ConsultList;
