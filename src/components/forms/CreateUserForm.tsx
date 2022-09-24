// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import {
  emptyUser,
  UserContextData,
  ROLES,
  User,
  UsersContext,
} from '../../data/users';
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
  const { users } = useContext<UserContextData>(UsersContext);

  const onRoleChanged = (role: string) => {
    setUser({ ...user, role: role });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedUser = defaultUser ? user : { ...user, _id: users.length };
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
        Name
        <input
          data-testid={'input-name'}
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, name: e.target.value })
          }
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
        Password
        <input
          data-testid={'input-password'}
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
        />
      </label>
      <label>
        Role:{' '}
        <SelectList
          labelText="Select a Role"
          items={ROLES}
          value={ROLES.indexOf(user.role)}
          onItemChanged={onRoleChanged}
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
