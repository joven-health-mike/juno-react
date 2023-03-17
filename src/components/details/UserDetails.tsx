// Copyright 2022 Social Fabric, LLC

import { Typography } from '@mui/material';
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
      <Typography variant="h4">{`${user.firstName} ${user.lastName}`}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Username: {user.username}</Typography>
      <Typography>Phone: {user.phone}</Typography>
      <Typography>
        Docs URL: <Link href={user.docsUrl}>{user.docsUrl}</Link>
      </Typography>
      <Typography>Time Zone: {user.timeZoneIanaName}</Typography>
      <Typography>Role: {user.role}</Typography>
    </>
  );
};

export default UserDetails;
