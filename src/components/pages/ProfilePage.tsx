import React from 'react';
import Profile from '../auth0/Profile';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';

const ProfilePage = () => {
  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems('admin')} />
      </nav>
      <h1>My Profile</h1>
      <Profile />
    </div>
  );
};

export default ProfilePage;
