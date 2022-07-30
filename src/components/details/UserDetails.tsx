// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { User } from '../../data/users';

type UserDetailsProps = {
  user: User;
};

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <>
      <h2 data-testid={'name'}>{user.name}</h2>
      <p data-testid={'id'}>ID: {user._id}</p>
      <p data-testid={'email'}>Email: {user.email}</p>
      <p data-testid={'userPassword'}>Password: {user.password}</p>
      <p data-testid={'userRole'}>Role: {user.role}</p>
    </>
  );
};

export default UserDetails;
