// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import Navbar from '../navbar/Navbar';
import Calendar from '../calendar/Calendar';
import { Appointment, AppointmentsContext } from '../../data/appointments';
import StudentsSmallTable from '../tables/StudentsSmallTable';
import { StudentsContext } from '../../data/students';
import CounselorDetails from '../details/CounselorDetails';
import { CounselorsContext } from '../../data/counselors';
import { LoggedInUserContext } from '../../data/users';
import { Role } from '../../services/user.service';

const HomePage: React.FC = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      {loggedInUser.role === ('SYSADMIN' as Role) && <AdminView />}
      {loggedInUser.role === ('COUNSELOR' as Role) && <CounselorView />}
      {loggedInUser.role === ('SCHOOL_STAFF' as Role) && <SchoolStaffView />}
      {loggedInUser.role === ('SCHOOL_ADMIN' as Role) && <SchoolAdminView />}
      {loggedInUser.role === ('STUDENT' as Role) && <StudentView />}
      {loggedInUser.role === ('GUARDIAN' as Role) && <GuardianView />}
    </div>
  );
};

const AppointmentView: React.FC = () => {
  const { data: appointments } = useContext(AppointmentsContext);

  const onEventClick = (event: Appointment) => {
    // display AppointmentDetailPage with this event
    console.log('eventClicked:', event);
  };

  return (
    <>
      <Calendar
        view="listDay"
        plugins={[listPlugin]}
        appointments={appointments}
        onEventClick={onEventClick}
        onDateClick={() => {}}
      />
    </>
  );
};

const AdminView: React.FC = () => {
  const { students } = useContext(StudentsContext);

  return (
    <>
      <div className="leftSide">
        <h1>All Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>All Students</h1>
        <StudentsSmallTable students={students} />
      </div>
    </>
  );
};

const CounselorView: React.FC = () => {
  const { students } = useContext(StudentsContext);

  return (
    <>
      <div className="leftSide">
        <h1>My Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>My Caseload</h1>
        <StudentsSmallTable students={students} />
      </div>
    </>
  );
};

const SchoolStaffView: React.FC = () => {
  const { students } = useContext(StudentsContext);

  return (
    <>
      <div className="leftSide">
        <h1>My Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>My Students</h1>
        <StudentsSmallTable students={students} />
      </div>
    </>
  );
};

const SchoolAdminView: React.FC = () => {
  const { students } = useContext(StudentsContext);

  return (
    <>
      <div className="leftSide">
        <h1>My Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>My Students</h1>
        <StudentsSmallTable students={students} />
      </div>
    </>
  );
};

const StudentView: React.FC = () => {
  const { data: counselors } = useContext(CounselorsContext);

  return (
    <>
      <div className="leftSide">
        <h1>My Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>My Counselor</h1>
        <CounselorDetails counselor={counselors[0]} />
      </div>
    </>
  );
};

const GuardianView: React.FC = () => {
  const { data: counselors } = useContext(CounselorsContext);

  return (
    <>
      <div className="leftSide">
        <h1>My Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>My Counselor</h1>
        <CounselorDetails counselor={counselors[0]} />
      </div>
    </>
  );
};

export default HomePage;
