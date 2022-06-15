// Copyright 2022 Social Fabric, LLC

import React from 'react';
import '@fullcalendar/react';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';
import Calendar from '../calendar/Calendar';

const HomePage: React.FC = () => {
  const role = 'admin';

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Home</h1>
      <Calendar />
    </div>
  );
};

export default HomePage;
