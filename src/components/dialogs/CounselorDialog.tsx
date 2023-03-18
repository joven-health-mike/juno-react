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
import { Counselor, emptyCounselor } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidURL,
} from '../../services/http-common';
import { TIME_ZONES } from '../../utils/DateUtils';
import MaterialDialog from './MaterialDialog';

type CounselorDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onCounselorAdded: (counselor: Counselor) => void;
  readonly initialCounselor: Counselor;
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
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [docsUrlError, setDocsUrlError] = useState(false);
  const [roomLinkError, setRoomLinkError] = useState(false);
  const [roomLink2Error, setRoomLink2Error] = useState(false);
  const [timeZoneError, setTimeZoneError] = useState(false);
  const [schoolsError, setSchoolsError] = useState(false);

  useEffect(() => {
    if (initialCounselor.counselorAssignedSchools) {
      setSchoolNames(
        initialCounselor.counselorAssignedSchools.map(school => school.name)
      );
    }

    setCounselor({ ...initialCounselor });
  }, [initialCounselor]);

  const validateInputs = () => {
    let allInputsValid = true;

    if (counselor.firstName.length === 0) {
      setFirstNameError(true);
      allInputsValid = false;
    } else setFirstNameError(false);

    if (counselor.lastName.length === 0) {
      setLastNameError(true);
      allInputsValid = false;
    } else setLastNameError(false);

    if (
      typeof counselor.email === 'undefined' ||
      counselor.email.length === 0 ||
      !isValidEmail(counselor.email)
    ) {
      setEmailError(true);
      allInputsValid = false;
    } else setEmailError(false);

    if (
      typeof counselor.docsUrl === 'undefined' ||
      counselor.docsUrl.length === 0 ||
      !isValidURL(counselor.docsUrl)
    ) {
      setDocsUrlError(true);
      allInputsValid = false;
    } else setDocsUrlError(false);

    if (
      typeof counselor.counselorRoomLink === 'undefined' ||
      counselor.counselorRoomLink.length === 0 ||
      !isValidURL(counselor.counselorRoomLink)
    ) {
      setRoomLinkError(true);
      allInputsValid = false;
    } else setRoomLinkError(false);

    if (
      counselor.counselorRoomLink2?.length! > 0 &&
      !isValidURL(counselor.counselorRoomLink2!)
    ) {
      setRoomLink2Error(true);
      allInputsValid = false;
    } else setRoomLink2Error(false);

    if (counselor.phone?.length! > 0 && !isValidPhoneNumber(counselor.phone!)) {
      setPhoneError(true);
      allInputsValid = false;
    } else setPhoneError(false);

    if (TIME_ZONES.indexOf(`${counselor.timeZoneIanaName}`) === -1) {
      setTimeZoneError(true);
      allInputsValid = false;
    } else setTimeZoneError(false);

    return allInputsValid;
  };

  const onFormSubmit = () => {
    const validInputs = validateInputs();
    if (!validInputs) return;

    const submittedCounselor = counselor;

    submittedCounselor.role = 'COUNSELOR';
    submittedCounselor.counselorAssignedSchools = schools.filter(school =>
      schoolNames.includes(school.name)
    );

    onCounselorAdded(submittedCounselor);
    setCounselor(emptyCounselor);
    onClose();
  };
  const onFormCancel = () => {
    setCounselor(emptyCounselor);
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPhoneError(false);
    setDocsUrlError(false);
    setRoomLinkError(false);
    setRoomLink2Error(false);
    setTimeZoneError(false);
    setSchoolsError(false);
    onClose();
  };

  return (
    <div>
      <MaterialDialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth required sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="firstName" error={firstNameError}>
              First Name
            </InputLabel>
            <Input
              id="firstName"
              value={counselor.firstName}
              onChange={e => {
                e.preventDefault();
                setFirstNameError(false);
                setCounselor({ ...counselor, firstName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="lastName" error={lastNameError}>
              Last Name
            </InputLabel>
            <Input
              id="lastName"
              value={counselor.lastName}
              onChange={e => {
                e.preventDefault();
                setLastNameError(false);
                setCounselor({ ...counselor, lastName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel htmlFor="email" error={emailError}>
              Email address
            </InputLabel>
            <Input
              id="email"
              value={counselor.email}
              onChange={e => {
                e.preventDefault();
                setEmailError(false);
                setCounselor({ ...counselor, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="phone" error={phoneError}>
              Phone number
            </InputLabel>
            <Input
              id="phone"
              value={counselor.phone}
              onChange={e => {
                e.preventDefault();
                setPhoneError(false);
                setCounselor({ ...counselor, phone: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="docsUrl" error={docsUrlError}>
              Docs URL
            </InputLabel>
            <Input
              id="docsUrl"
              value={counselor.docsUrl}
              onChange={e => {
                e.preventDefault();
                setDocsUrlError(false);
                setCounselor({ ...counselor, docsUrl: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="roomLink" error={roomLinkError}>
              Room Link 1
            </InputLabel>
            <Input
              id="roomLink"
              value={counselor.counselorRoomLink}
              onChange={e => {
                e.preventDefault();
                setRoomLinkError(false);
                setCounselor({
                  ...counselor,
                  counselorRoomLink: e.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="roomLink2" error={roomLink2Error}>
              Room Link 2
            </InputLabel>
            <Input
              id="roomLink2"
              value={counselor.counselorRoomLink2}
              onChange={e => {
                e.preventDefault();
                setRoomLink2Error(false);
                setCounselor({
                  ...counselor,
                  counselorRoomLink2: e.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="timeZone" error={timeZoneError}>
              Time Zone
            </InputLabel>
            <Select
              labelId="timeZone"
              id="timeZone"
              defaultValue={TIME_ZONES[0]}
              value={counselor.timeZoneIanaName}
              label="Time Zone"
              onChange={e => {
                e.preventDefault();
                setTimeZoneError(false);
                setCounselor({
                  ...counselor,
                  timeZoneIanaName: e.target.value,
                });
              }}
            >
              {TIME_ZONES.map((timeZone, index) => (
                <MenuItem value={timeZone} key={index}>
                  {timeZone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="schools" error={schoolsError}>
              Assigned Schools
            </InputLabel>
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
                e.preventDefault();
                setSchoolsError(false);
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
