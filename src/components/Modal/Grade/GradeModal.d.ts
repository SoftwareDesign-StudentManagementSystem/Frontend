declare const GradeModal: ({ onClose, studentId, studentInfo, }: {
    onClose: () => void;
    studentId: number;
    studentInfo?: UserDetailInfo;
}) => import("react/jsx-runtime").JSX.Element;
export default GradeModal;
import { UserDetailInfo } from "../../../types/members";
