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
import React, { useState } from 'react';
import { emptyUser, User } from '../../data/users';
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidURL,
} from '../../services/http-common';
import { Role, ROLES } from '../../services/user.service';
import { TIME_ZONES } from '../../utils/DateUtils';
import MaterialDialog from './MaterialDialog';

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (user: User) => void;
  initialUser: User;
  title: string;
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onUserAdded,
  initialUser,
  title,
}) => {
  const [user, setUser] = useState<User>(initialUser);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [docsUrlError, setDocsUrlError] = useState(false);
  const [timeZoneError, setTimeZoneError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const validateInputs = () => {
    let allInputsValid = true;

    if (user.firstName.length === 0) {
      setFirstNameError(true);
      allInputsValid = false;
    } else setFirstNameError(false);

    if (user.lastName.length === 0) {
      setLastNameError(true);
      allInputsValid = false;
    } else setLastNameError(false);

    if (user.email?.length! > 0 && !isValidEmail(user.email!)) {
      setEmailError(true);
      allInputsValid = false;
    } else setEmailError(false);

    if (
      typeof user.username === 'undefined' ||
      user.username.length === 0 ||
      user.username.length > 15
    ) {
      setUsernameError(true);
      allInputsValid = false;
    } else setUsernameError(false);

    if (user.docsUrl?.length! > 0 && !isValidURL(user.docsUrl!)) {
      setDocsUrlError(true);
      allInputsValid = false;
    } else setDocsUrlError(false);

    if (user.phone?.length! > 0 && !isValidPhoneNumber(user.phone!)) {
      setPhoneError(true);
      allInputsValid = false;
    } else setPhoneError(false);

    if (TIME_ZONES.indexOf(`${user.timeZoneIanaName}`) === -1) {
      setTimeZoneError(true);
      allInputsValid = false;
    } else setTimeZoneError(false);

    if (ROLES.indexOf(`${user.role}`) === -1) {
      setRoleError(true);
      allInputsValid = false;
    } else setRoleError(false);

    return allInputsValid;
  };

  const onFormSubmit = () => {
    const validInputs = validateInputs();
    if (!validInputs) return;

    onUserAdded(user);
    setUser(emptyUser);
    onClose();
  };
  const onFormCancel = () => {
    setUser(emptyUser);
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setUsernameError(false);
    setPhoneError(false);
    setDocsUrlError(false);
    setTimeZoneError(false);
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
              value={user.firstName}
              onChange={e => {
                e.preventDefault();
                setFirstNameError(false);
                setUser({ ...user, firstName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="lastName" error={lastNameError}>
              Last Name
            </InputLabel>
            <Input
              id="lastName"
              value={user.lastName}
              onChange={e => {
                e.preventDefault();
                setLastNameError(false);
                setUser({ ...user, lastName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="email" error={emailError}>
              Email address
            </InputLabel>
            <Input
              id="email"
              value={user.email}
              onChange={e => {
                e.preventDefault();
                setEmailError(false);
                setUser({ ...user, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="username" error={usernameError}>
              Username
            </InputLabel>
            <Input
              id="username"
              value={user.username}
              onChange={e => {
                e.preventDefault();
                setUsernameError(false);
                setUser({ ...user, username: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="phone" error={phoneError}>
              Phone number
            </InputLabel>
            <Input
              id="phone"
              value={user.phone}
              onChange={e => {
                e.preventDefault();
                setPhoneError(false);
                setUser({ ...user, phone: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="docsUrl" error={docsUrlError}>
              Docs URL
            </InputLabel>
            <Input
              id="docsUrl"
              value={user.docsUrl}
              onChange={e => {
                e.preventDefault();
                setDocsUrlError(false);
                setUser({ ...user, docsUrl: e.target.value });
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
              value={user.timeZoneIanaName}
              label="Time Zone"
              onChange={e => {
                e.preventDefault();
                setTimeZoneError(false);
                setUser({
                  ...user,
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
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="role" error={roleError}>
              Role
            </InputLabel>
            <Select
              labelId="role"
              id="role"
              defaultValue={ROLES[0]}
              value={user.role}
              label="Role"
              onChange={e => {
                e.preventDefault();
                setRoleError(false);
                setUser({
                  ...user,
                  role: e.target.value as Role,
                });
              }}
            >
              {ROLES.map((role, index) => (
                <MenuItem value={role} key={index}>
                  {role}
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

export default CreateUserModal;
