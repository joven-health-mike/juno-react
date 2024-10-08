// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { User } from '../../data/users';

type UserDetailsProps = {
  user: User;
};

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <>
      <h2 data-testid={'name'}>{`${user.firstName} ${user.lastName}`}</h2>
      <p data-testid={'email'}>Email: {user.email}</p>
      <p data-testid={'username'}>Username: {user.username}</p>
      <p data-testid={'phone'}>Phone: {user.phone}</p>
      <p data-testid={'docsUrl'}>
        Docs URL: <a href={user.docsUrl}>{user.docsUrl}</a>
      </p>
      <p data-testid={'timeZoneIanaName'}>Time Zone: {user.timeZoneIanaName}</p>
      <p data-testid={'userRole'}>Role: {user.role}</p>
    </>
  );
};

export default UserDetails;
