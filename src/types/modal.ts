import { ReactNode } from "react";

export interface ModalProps {
  title: string;
  content: ReactNode;
  onClose: () => void;
}
