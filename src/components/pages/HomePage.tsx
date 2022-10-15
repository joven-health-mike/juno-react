// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import Navbar from '../navbar/Navbar';
import Calendar from '../calendar/Calendar';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import StudentsSmallTable from '../tables/StudentsSmallTable';
import { Student, StudentsContext } from '../../data/students';
import CounselorDetails from '../details/CounselorDetails';
import { CounselorsContext } from '../../data/counselors';
import { LoggedInUserContext } from '../../data/users';
import { Role } from '../../services/user.service';
import CreateAppointmentModal from '../modals/CreateAppointmentModal';

const HomePage: React.FC = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      {loggedInUser.role === ('SYSADMIN' as Role) && <AdminView />}
      {loggedInUser.role === ('JOVEN_ADMIN' as Role) && <AdminView />}
      {loggedInUser.role === ('JOVEN_STAFF' as Role) && <AdminView />}
      {loggedInUser.role === ('SCHOOL_ADMIN' as Role) && <SchoolAdminView />}
      {loggedInUser.role === ('SCHOOL_STAFF' as Role) && <SchoolStaffView />}
      {loggedInUser.role === ('COUNSELOR' as Role) && <CounselorView />}
      {loggedInUser.role === ('STUDENT' as Role) && <StudentView />}
      {loggedInUser.role === ('GUARDIAN' as Role) && <GuardianView />}
    </div>
  );
};

const AppointmentView: React.FC = () => {
  const { data: appointments } = useContext(AppointmentsContext);

  const onEventClick = (event: Appointment) => {
    // TODO: display AppointmentDetailPage with this event
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

const StudentsTableView: React.FC = () => {
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState<boolean>(false);
  const [initialAppointment, setInitialAppointment] =
    useState<Appointment>(emptyAppointment);
  const { add: addAppointment } = useContext(AppointmentsContext);
  const { delete: deleteStudent } = useContext(StudentsContext);

  const handleAppointmentClick = (studentToSchedule: Student) => {
    const appointment = { ...initialAppointment };
    appointment.participants = [studentToSchedule];
    appointment.counselorId = studentToSchedule.studentRef.assignedCounselorId;
    setInitialAppointment(appointment);
    setIsCreateAppointmentModalOpen(true);
  };

  const handleDeleteClick = (studentToDelete: Student) => {
    deleteStudent(studentToDelete);
  };

  const handleAppointmentAdded = (appointmentToAdd: Appointment) => {
    addAppointment(appointmentToAdd);
    setIsCreateAppointmentModalOpen(false);
  };

  return (
    <>
      <StudentsSmallTable
        onAppointmentClicked={handleAppointmentClick}
        onDeleteClicked={handleDeleteClick}
      />
      <CreateAppointmentModal
        isOpen={isCreateAppointmentModalOpen}
        onClose={() => setIsCreateAppointmentModalOpen(false)}
        initialAppointment={initialAppointment}
        onAppointmentAdded={handleAppointmentAdded}
      />
    </>
  );
};

const AdminView: React.FC = () => {
  return (
    <>
      <div className="leftSide">
        <h1>All Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>All Students</h1>
        <StudentsTableView />
      </div>
    </>
  );
};

const CounselorView: React.FC = () => {
  return (
    <>
      <div className="leftSide">
        <h1>My Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>My Caseload</h1>
        <StudentsTableView />
      </div>
    </>
  );
};

const SchoolStaffView: React.FC = () => {
  return (
    <>
      <div className="leftSide">
        <h1>My Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>My Students</h1>
        <StudentsTableView />
      </div>
    </>
  );
};

const SchoolAdminView: React.FC = () => {
  return (
    <>
      <div className="leftSide">
        <h1>My Appointments</h1>
        <AppointmentView />
      </div>
      <div className="rightSide">
        <h1>My Students</h1>
        <StudentsTableView />
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
