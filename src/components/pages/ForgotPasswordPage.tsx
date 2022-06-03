// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';

const ForgotPasswordPage = () => {
  const role = 'admin';

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Forgot Password</h1>
    </div>
  );
};

export default ForgotPasswordPage;
