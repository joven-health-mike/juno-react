// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { emptyUser, ROLES, User, UsersContext } from '../../data/users';
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
  const [user, setUser] = useState(defaultUser ?? emptyUser);
  const { users } = useContext(UsersContext);

  const onRoleChanged = (role: string) => {
    setUser({ ...user, role: role });
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ ...user, _id: users.length });
  };

  const onFormCancel = (e: any) => {
    e.preventDefault();
    setUser(defaultUser ?? emptyUser);
    onCancel();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Name
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          required
          onChange={e => setUser({ ...user, name: e.target.value })}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          required
          onChange={e => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          required
          onChange={e => setUser({ ...user, password: e.target.value })}
        />
      </label>
      <label>
        Role:{' '}
        <SelectList
          labelText="Select a Role"
          items={ROLES}
          value={user.role}
          onItemChanged={onRoleChanged}
        />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CreateUserForm;
