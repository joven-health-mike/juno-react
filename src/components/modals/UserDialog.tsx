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
import { User } from '../../data/users';
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

  const onFormSubmit = () => {
    onUserAdded(user);
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
              value={user.firstName}
              onChange={e => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="lastName">Last Name</InputLabel>
            <Input
              id="lastName"
              value={user.lastName}
              onChange={e => {
                setUser({ ...user, lastName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              value={user.email}
              onChange={e => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="username">Username</InputLabel>
            <Input
              id="username"
              value={user.username}
              onChange={e => {
                setUser({ ...user, username: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="phone">Phone number</InputLabel>
            <Input
              id="phone"
              value={user.phone}
              onChange={e => {
                setUser({ ...user, phone: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="docsUrl">Docs URL</InputLabel>
            <Input
              id="docsUrl"
              value={user.docsUrl}
              onChange={e => {
                setUser({ ...user, docsUrl: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="timeZone">Time Zone</InputLabel>
            <Select
              labelId="timeZone"
              id="timeZone"
              defaultValue={TIME_ZONES[0]}
              value={user.timeZoneIanaName}
              label="Time Zone"
              onChange={e =>
                setUser({
                  ...user,
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
