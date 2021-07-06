import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { ConfirmModalProps } from './types';

const ConfirmModal = (props: ConfirmModalProps) => {
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          {props.cancelText || 'Cancel'}
        </Button>
        <Button
          onClick={props.onConfirm}
          color={props.deleteAction ? 'secondary' : 'primary'}
        >
          {props.confirmText || 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
