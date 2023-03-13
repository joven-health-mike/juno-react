// Copyright 2022 Social Fabric, LLC

import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { LoggedInUserContext } from '../../data/users';
import UserDetails from '../details/UserDetails';
import Navbar from '../navbar/Navbar';

type AccountDetailPageProps = {};

const AccountDetailPage: React.FC<AccountDetailPageProps> = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const envMessage = process.env.REACT_APP_HELLO_WORLD;

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Typography variant="h3">Account Details</Typography>
      <UserDetails user={loggedInUser} />
      <Typography variant="h4">{envMessage}</Typography>
    </>
  );
};

export default AccountDetailPage;
