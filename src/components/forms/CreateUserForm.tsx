// Copyright 2022 Social Fabric, LLC

import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { emptyUser, User } from '../../data/users';
import { Role, ROLES } from '../../services/user.service';
import SelectList from '../selectList/SelectList';

type CreateUserFormProps = {
  defaultUser?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
};

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  defaultUser,
  onSubmit,
  onCancel,
}) => {
  const [user, setUser] = useState<User>(defaultUser ?? emptyUser);

  const onRoleChanged = (role: Role) => {
    setUser({ ...user, role: role });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedUser = defaultUser ? user : { ...user, id: `-1` };
    onSubmit(submittedUser);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setUser(defaultUser ?? emptyUser);
    onCancel();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        First Name
        <input
          data-testid={'input-first-name'}
          type="text"
          placeholder="First Name"
          name="firstName"
          value={user.firstName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, firstName: e.target.value });
          }}
        />
      </label>
      <label>
        Last Name
        <input
          data-testid={'input-last-name'}
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={user.lastName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, lastName: e.target.value });
          }}
        />
      </label>
      <label>
        Email
        <input
          data-testid={'input-email'}
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, email: e.target.value })
          }
        />
      </label>
      <label>
        Username
        <input
          data-testid={'input-username'}
          type="text"
          placeholder="Userame"
          name="username"
          value={user.username}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
      </label>
      <label>
        Phone
        <input
          data-testid={'input-phone'}
          type="phone"
          placeholder="Phone"
          name="phone"
          value={user.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, phone: e.target.value });
          }}
        />
      </label>
      <label>
        Docs URL
        <input
          data-testid={'input-docsUrl'}
          type="URL"
          placeholder="Docs URL"
          name="docsUrl"
          value={user.docsUrl}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, docsUrl: e.target.value });
          }}
        />
      </label>
      <label>
        Time Zone Offset
        <input
          data-testid={'input-timeZoneOffset'}
          type="number"
          placeholder="Time Zone Offset"
          name="timeZoneOffset"
          value={user.timeZoneOffset}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, timeZoneOffset: parseInt(e.target.value) });
          }}
        />
      </label>
      <label>
        Role:{' '}
        <SelectList
          labelText="Select a Role"
          items={ROLES}
          value={ROLES.indexOf(user.role)}
          onItemChanged={item => {
            return onRoleChanged(ROLES[parseInt(item)] as Role);
          }}
        />
      </label>

      <button type="submit" data-testid={'button-submit'}>
        Submit
      </button>
      <button
        type="button"
        data-testid={'button-cancel'}
        onClick={onFormCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateUserForm;
