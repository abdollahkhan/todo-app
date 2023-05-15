import { ModalProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface CustomModal extends Partial<ModalProps> {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  children: ReactNode | string | number;
  title: string;
  hideCloseButton?: boolean;
  hideActionButton?: boolean;
  actionButtonText?: string;
  actionHandler?: () => void;
  hideDefaultOpenBtn?: boolean;
  openBtnText?: string;
  closeBtnText?: string;
}
