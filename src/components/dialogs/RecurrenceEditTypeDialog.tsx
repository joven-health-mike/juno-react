import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useState } from 'react';
import MaterialDialog from './MaterialDialog';

type RecurrenceEditTypeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onRecurrenceEditTypeSelected: (type: string) => void;
};

export const RECURRENCE_EDIT_TYPES = [
  { type: 'single', message: 'This appointment only' },
  { type: 'future', message: 'This and future appointments' },
  { type: 'all', message: 'All appointments' },
];

const RecurrenceEditTypeDialog: React.FC<RecurrenceEditTypeDialogProps> = ({
  isOpen,
  onClose,
  onRecurrenceEditTypeSelected,
}) => {
  const [recurrenceEditTypeSelection, setRecurrenceEditTypeSelection] =
    useState('single');

  const handleChange = (_: any, value: string) => {
    setRecurrenceEditTypeSelection(value);
  };

  const onFormSubmit = () => {
    onRecurrenceEditTypeSelected(recurrenceEditTypeSelection);
    onClose();
  };

  const onFormCancel = () => {
    onClose();
  };

  return (
    <MaterialDialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Series</DialogTitle>
      <DialogContent>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <RadioGroup
            aria-labelledby="editType"
            defaultValue="single"
            name="radio-buttons-group"
            onChange={handleChange}
            value={recurrenceEditTypeSelection}
          >
            {RECURRENCE_EDIT_TYPES.map(type => (
              <FormControlLabel
                key={type.type}
                value={type.type}
                control={<Radio />}
                label={type.message}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onFormSubmit}>Submit</Button>
        <Button onClick={onFormCancel}>Cancel</Button>
      </DialogActions>
    </MaterialDialog>
  );
};

export default RecurrenceEditTypeDialog;
