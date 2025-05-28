import { ModalProps } from "../../types/modal.ts";
declare const Modal: ({ title, content, onClose }: ModalProps) => import("react").ReactPortal;
export default Modal;
