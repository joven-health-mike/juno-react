// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { User } from '../../data/users';
import { linkStyles } from '../styles/mixins';

const Link = styled.a`
  ${linkStyles}
`;

type UserDetailsProps = {
  user: User;
};

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <>
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p>Email: {user.email}</p>
      <p data-testid={'username'}>Username: {user.username}</p>
      <p data-testid={'phone'}>Phone: {user.phone}</p>
      <p data-testid={'docsUrl'}>
        Docs URL: <Link href={user.docsUrl}>{user.docsUrl}</Link>
      </p>
      <p data-testid={'timeZoneIanaName'}>Time Zone: {user.timeZoneIanaName}</p>
      <p>Role: {user.role}</p>
    </>
  );
};

export default UserDetails;
