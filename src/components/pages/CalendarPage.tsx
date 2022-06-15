// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useState } from 'react';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { emptySchool, School } from '../../data/schools';
import Calendar from '../calendar/Calendar';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';
import {
  SelectCounselorList,
  SelectSchoolList,
} from '../selectList/SelectList';
import { apiCalendar } from '../calendar/calendarConfig';

const CalendarPage: React.FC = () => {
  const role = 'admin';

  const [schoolSelection, setSchoolSelection] = useState<School>(emptySchool);
  const [counselorSelection, setCounselorSelection] =
    useState<Counselor>(emptyCounselor);

  const handleSchoolChange = (selectedSchool: School) => {
    setSchoolSelection(selectedSchool);
  };

  const handleCounselorChange = (selectedCounselor: Counselor) => {
    setCounselorSelection(selectedCounselor);
  };

  const handleSignInOutClick = (e: MouseEvent, name: string) => {
    if (name === 'sign-in') {
      apiCalendar.handleAuthClick();
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick();
    }
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Calendar</h1>
      <button onClick={e => handleSignInOutClick(e, 'sign-in')}>Sign In</button>
      <button onClick={e => handleSignInOutClick(e, 'sign-out')}>
        Sign Out
      </button>
      <label>
        Counselor:{' '}
        <SelectCounselorList
          value={counselorSelection.name}
          onCounselorChanged={handleCounselorChange}
        />
      </label>
      <label>
        School:{' '}
        <SelectSchoolList
          value={schoolSelection.name}
          onSchoolChanged={handleSchoolChange}
        />
      </label>
      <Calendar />
    </div>
  );
};

export default CalendarPage;
