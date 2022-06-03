// Copyright 2022 Social Fabric, LLC

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { StudentsContext } from '../../data/students';
import { ROLES, User } from '../../data/users';
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
  const emptyUser = {
    name: '',
    email: '',
    password: '',
    role: '',
    associatedAccount: '',
  };
  const [user, setUser] = useState(defaultUser ?? emptyUser);
  const [accountOptions, setAccountOptions] = useState<String[]>([]);
  const { counselors } = useContext(CounselorsContext);
  const { schools } = useContext(SchoolsContext);
  const { students } = useContext(StudentsContext);

  // update account drop-down options anytime the role changes
  const updateAccountOptions = useCallback(() => {
    let data = [];

    // there's probably a better way to do this...
    switch (user.role) {
      case 'admin':
        data.push('admin');
        break;
      case 'counselor':
        counselors.forEach(counselor => {
          data.push(counselor.name);
        });
        break;
      case 'facilitator':
        schools.forEach(school => {
          school.facilitators.forEach(facilitatorName => {
            data.push(facilitatorName);
          });
        });
        break;
      case 'school':
        schools.forEach(school => {
          data.push(school.name);
        });
        break;
      case 'student':
      case 'guardian':
        students.forEach(student => {
          data.push(student.first_name + ' ' + student.last_name);
        });
        break;
      default:
        break;
    }
    setAccountOptions(data);
  }, [user.role, counselors, schools, students]);

  // set up initial account options based on the defaultUser role
  useEffect(() => {
    updateAccountOptions();
  }, [updateAccountOptions, user.role]);

  const onRoleChanged = (role: string) => {
    // if role changes, clear out any previous account selection
    setUser({ ...user, role: role, associatedAccount: '' });
    updateAccountOptions();
  };

  const onAccountChanged = (account: string) => {
    setUser({ ...user, associatedAccount: account });
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(user);
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
      <label>
        Associated Account:{' '}
        <SelectList
          labelText="Select an Account"
          items={accountOptions}
          value={user.associatedAccount}
          onItemChanged={onAccountChanged}
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
