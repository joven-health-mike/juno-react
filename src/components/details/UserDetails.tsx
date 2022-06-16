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
      <p>{user._id}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
      <p>{user.role}</p>
    </>
  );
};

export default UserDetails;
