// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { User } from '../../data/users';

type UserDetailsProps = {
  user: User;
};

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <>
      <h2>{user.name}</h2>
      <p>ID: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <p>Role: {user.role}</p>
    </>
  );
};

export default UserDetails;
