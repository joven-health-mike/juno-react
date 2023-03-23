import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { emptySchool, School } from '../../data/schools';
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidURL,
} from '../../services/http-common';
import { AvailableTimeZone, TIME_ZONES } from '../../utils/DateUtils';
import MaterialDialog from './MaterialDialog';

type SchoolDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSchoolAdded: (school: School) => void;
  readonly initialSchool: School;
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
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [docsUrlError, setDocsUrlError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [zipError, setZipError] = useState(false);
  const [timeZoneError, setTimeZoneError] = useState(false);

  useEffect(() => {
    setSchool({ ...initialSchool });
  }, [initialSchool]);
  const validateInputs = () => {
    let allInputsValid = true;

    if (typeof school.name === 'undefined' || school.name.length === 0) {
      setNameError(true);
      allInputsValid = false;
    } else setNameError(false);

    if (
      typeof school.primaryEmail === 'undefined' ||
      school.primaryEmail.length === 0 ||
      !isValidEmail(school.primaryEmail)
    ) {
      setEmailError(true);
      allInputsValid = false;
    } else setEmailError(false);

    if (
      typeof school.primaryPhone === 'undefined' ||
      school.primaryPhone.length === 0 ||
      !isValidPhoneNumber(school.primaryPhone)
    ) {
      setPhoneError(true);
      allInputsValid = false;
    } else setPhoneError(false);

    if (
      typeof school.docsUrl === 'undefined' ||
      school.docsUrl.length === 0 ||
      !isValidURL(school.docsUrl)
    ) {
      setDocsUrlError(true);
      allInputsValid = false;
    } else setDocsUrlError(false);

    if (school.state?.length! !== 0 && school.state?.length! !== 2) {
      setStateError(true);
      allInputsValid = false;
    } else setStateError(false);

    if (school.zip?.length! !== 0 && school.zip?.length! !== 5) {
      setZipError(true);
      allInputsValid = false;
    } else setZipError(false);

    if (TIME_ZONES.indexOf(school?.timeZoneIanaName!) < 0) {
      setTimeZoneError(true);
      allInputsValid = false;
    } else setTimeZoneError(false);

    return allInputsValid;
  };

  const onFormSubmit = () => {
    const validInputs = validateInputs();
    if (!validInputs) {
      return;
    }

    const submittedSchool = { ...school };
    onSchoolAdded(submittedSchool);
    setSchool(emptySchool);
    onClose();
  };

  const onFormCancel = () => {
    setSchool(emptySchool);
    onClose();
  };

  return (
    <div>
      <MaterialDialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth required sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="name" error={nameError}>
              Name
            </InputLabel>
            <Input
              id="name"
              value={school.name}
              onChange={e => {
                setNameError(false);
                setSchool({ ...school, name: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel htmlFor="email" error={emailError}>
              Email address
            </InputLabel>
            <Input
              id="email"
              value={school.primaryEmail}
              onChange={e => {
                setEmailError(false);
                setSchool({ ...school, primaryEmail: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="phone" error={phoneError}>
              Phone number
            </InputLabel>
            <Input
              id="phone"
              value={school.primaryPhone}
              onChange={e => {
                setPhoneError(false);
                setSchool({ ...school, primaryPhone: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="docsUrl" error={docsUrlError}>
              Docs URL
            </InputLabel>
            <Input
              id="docsUrl"
              value={school.docsUrl}
              onChange={e => {
                setDocsUrlError(false);
                setSchool({ ...school, docsUrl: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="address" error={addressError}>
              Address
            </InputLabel>
            <Input
              id="address"
              value={school.address}
              onChange={e => {
                setAddressError(false);
                setSchool({ ...school, address: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="city" error={cityError}>
              City
            </InputLabel>
            <Input
              id="city"
              value={school.city}
              onChange={e => {
                setCityError(false);
                setSchool({ ...school, city: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="state" error={stateError}>
              State
            </InputLabel>
            <Input
              id="state"
              value={school.state}
              onChange={e => {
                setStateError(false);
                setSchool({ ...school, state: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="zip" error={zipError}>
              Zip Code
            </InputLabel>
            <Input
              id="zip"
              value={school.zip}
              onChange={e => {
                setZipError(false);
                setSchool({ ...school, zip: e.target.value });
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
              value={school.timeZoneIanaName}
              label="Time Zone"
              onChange={e => {
                e.preventDefault();
                setTimeZoneError(false);
                setSchool({
                  ...school,
                  timeZoneIanaName: e.target.value as AvailableTimeZone,
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
