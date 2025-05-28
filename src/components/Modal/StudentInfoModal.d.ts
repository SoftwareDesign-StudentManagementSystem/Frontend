import { UserDetailInfo } from "../../types/members.ts";
declare const StudentInfoModal: ({ onClose, studentInfo, profileImage, }: {
    onClose: () => void;
    studentInfo?: UserDetailInfo;
    profileImage: string;
}) => import("react/jsx-runtime").JSX.Element;
export default StudentInfoModal;
