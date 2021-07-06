import { ReactNode } from 'react';

export interface ConfirmModalProps {
  title: ReactNode;
  contentText: ReactNode;
  open: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  // if true confirm button will use secondary color
  deleteAction?: boolean;
}
