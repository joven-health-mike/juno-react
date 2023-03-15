import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Counselor } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { TIME_ZONES } from '../../utils/DateUtils';
import MaterialDialog from './MaterialDialog';

type CounselorDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onCounselorAdded: (counselor: Counselor) => void;
  initialCounselor: Counselor;
  title: string;
};

const CounselorDialog: React.FC<CounselorDialogProps> = ({
  isOpen,
  onClose,
  onCounselorAdded,
  initialCounselor,
  title,
}) => {
  const [counselor, setCounselor] = useState(initialCounselor);
  const [schoolNames, setSchoolNames] = useState<string[]>([]);
  const { data: schools } = useContext(SchoolsContext);

  useEffect(() => {
    if (initialCounselor.counselorAssignedSchools) {
      setSchoolNames(
        initialCounselor.counselorAssignedSchools.map(school => school.name)
      );
    }

    setCounselor({ ...initialCounselor });
  }, [initialCounselor]);

  const onFormSubmit = () => {
    const submittedCounselor = counselor;

    submittedCounselor.role = 'COUNSELOR';
    submittedCounselor.counselorAssignedSchools = schools.filter(school =>
      schoolNames.includes(school.name)
    );

    onCounselorAdded(submittedCounselor);
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
            <InputLabel id="firstName">First Name</InputLabel>
            <Input
              id="firstName"
              value={counselor.firstName}
              onChange={e => {
                setCounselor({ ...counselor, firstName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="lastName">Last Name</InputLabel>
            <Input
              id="lastName"
              value={counselor.lastName}
              onChange={e => {
                setCounselor({ ...counselor, lastName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              value={counselor.email}
              onChange={e => {
                setCounselor({ ...counselor, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="username">Username</InputLabel>
            <Input
              id="username"
              value={counselor.username}
              onChange={e => {
                setCounselor({ ...counselor, username: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="phone">Phone number</InputLabel>
            <Input
              id="phone"
              value={counselor.phone}
              onChange={e => {
                setCounselor({ ...counselor, phone: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="docsUrl">Docs URL</InputLabel>
            <Input
              id="docsUrl"
              value={counselor.docsUrl}
              onChange={e => {
                setCounselor({ ...counselor, docsUrl: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="roomLink">Room Link 1</InputLabel>
            <Input
              id="roomLink"
              value={counselor.counselorRoomLink}
              onChange={e => {
                setCounselor({
                  ...counselor,
                  counselorRoomLink: e.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="roomLink2">Room Link 2</InputLabel>
            <Input
              id="roomLink2"
              value={counselor.counselorRoomLink2}
              onChange={e => {
                setCounselor({
                  ...counselor,
                  counselorRoomLink2: e.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="timeZone">Time Zone</InputLabel>
            <Select
              labelId="timeZone"
              id="timeZone"
              defaultValue={TIME_ZONES[0]}
              value={counselor.timeZoneIanaName}
              label="Duration"
              onChange={e =>
                setCounselor({
                  ...counselor,
                  timeZoneIanaName: e.target.value,
                })
              }
            >
              {TIME_ZONES.map((timeZone, index) => (
                <MenuItem value={timeZone} key={index}>
                  {timeZone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="schools">Assigned Schools</InputLabel>
            <Select
              labelId="schools"
              id="schools"
              multiple
              defaultValue={[]}
              value={schoolNames}
              label="Schools"
              renderValue={(selected: string[]) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value: string) => {
                    return <Chip key={value} label={value} />;
                  })}
                </Box>
              )}
              onChange={(e: SelectChangeEvent<typeof schoolNames>) => {
                const value = e.target.value;
                const newValue =
                  typeof value === 'string' ? value.split(',') : value;
                setSchoolNames(newValue);
              }}
            >
              {schools.map((school, index) => {
                return (
                  <MenuItem value={school.name} key={index}>
                    {school.name}
                  </MenuItem>
                );
              })}
            </Select>
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

export default CounselorDialog;
