// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoggedInUserContext } from '../../data/users';
import UserDetails from '../details/UserDetails';
import Navbar from '../navbar/Navbar';
import { h1Styles } from '../styles/mixins';

const Header = styled.h1`
  ${h1Styles}
`;

type AccountDetailPageProps = {};

const AccountDetailPage: React.FC<AccountDetailPageProps> = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const envMessage = process.env.REACT_APP_HELLO_WORLD;

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <Header>Account Details</Header>
      <UserDetails user={loggedInUser} />
      <h2>{envMessage}</h2>
    </div>
  );
};

export default AccountDetailPage;
