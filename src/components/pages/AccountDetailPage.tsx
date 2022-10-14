// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { LoggedInUserContext } from '../../data/users';
import UserDetails from '../details/UserDetails';
import Navbar from '../navbar/Navbar';

type AccountDetailPageProps = {};

const AccountDetailPage: React.FC<AccountDetailPageProps> = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Account Details</h1>
      <UserDetails user={loggedInUser} />
    </div>
  );
};

export default AccountDetailPage;
