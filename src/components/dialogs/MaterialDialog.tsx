import { Dialog } from '@mui/material';
import React from 'react';

type MaterialDialogProps = {
  open: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
};

const MaterialDialog: React.FC<MaterialDialogProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default MaterialDialog;
