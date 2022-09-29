// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { User } from '../../data/users';

type UserDetailsProps = {
  user: User;
};

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <>
      <h2 data-testid={'name'}>{user.firstName + ' ' + user.lastName}</h2>
      <p data-testid={'id'}>ID: {user.id}</p>
      <p data-testid={'email'}>Email: {user.email}</p>
      <p data-testid={'username'}>Username: {user.username}</p>
      <p data-testid={'phone'}>Phone: {user.phone}</p>
      <p data-testid={'docsUrl'}>Docs URL: {user.docsUrl}</p>
      <p data-testid={'timeZoneOffset'}>
        Time Zone Offset: {user.timeZoneOffset}
      </p>
      <p data-testid={'userRole'}>Role: {user.role}</p>
    </>
  );
};

export default UserDetails;
