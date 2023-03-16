import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { School } from '../../data/schools';
import MaterialDialog from './MaterialDialog';

type SchoolDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSchoolAdded: (school: School) => void;
  initialSchool: School;
  title: string;
};

const SchoolDialog: React.FC<SchoolDialogProps> = ({
  isOpen,
  onClose,
  onSchoolAdded,
  initialSchool,
  title,
}) => {
  const [school, setSchool] = useState<School>(initialSchool);

  useEffect(() => {
    setSchool({ ...initialSchool });
  }, [initialSchool]);

  const onFormSubmit = () => {
    const submittedSchool = { ...school };
    onSchoolAdded(submittedSchool);
    onClose();
  };

  const onFormCancel = () => {
    onClose();
  };

  return (
    <div>
      <MaterialDialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="name">Name</InputLabel>
            <Input
              id="name"
              value={school.name}
              onChange={e => {
                setSchool({ ...school, name: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="address">Address</InputLabel>
            <Input
              id="address"
              value={school.address}
              onChange={e => {
                setSchool({ ...school, address: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="city">City</InputLabel>
            <Input
              id="city"
              value={school.city}
              onChange={e => {
                setSchool({ ...school, city: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="state">State</InputLabel>
            <Input
              id="state"
              value={school.state}
              onChange={e => {
                setSchool({ ...school, state: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="zip">Zip Code</InputLabel>
            <Input
              id="zip"
              value={school.zip}
              onChange={e => {
                setSchool({ ...school, zip: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              value={school.primaryEmail}
              onChange={e => {
                setSchool({ ...school, primaryEmail: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="phone">Phone number</InputLabel>
            <Input
              id="phone"
              value={school.primaryPhone}
              onChange={e => {
                setSchool({ ...school, primaryPhone: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="docsUrl">Docs URL</InputLabel>
            <Input
              id="docsUrl"
              value={school.docsUrl}
              onChange={e => {
                setSchool({ ...school, docsUrl: e.target.value });
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onFormSubmit}>Submit</Button>
          <Button onClick={onFormCancel}>Cancel</Button>
        </DialogActions>
      </MaterialDialog>
    </div>
  );
};

export default SchoolDialog;
