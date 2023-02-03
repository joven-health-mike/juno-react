// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import styled from 'styled-components';
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
import { createPermission, deletePermission } from '../../auth/permissions';
import { h1Styles } from '../styles/mixins';

const LeftSection = styled.section`
  margin-left: 25px;
  float: left;
  width: 47%;
`;

const RightSection = styled.section`
  margin-left: 25px;
  float: right;
  width: 47%;
`;

const Header = styled.h1`
  ${h1Styles}
`;

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
        plugins={[listPlugin, momentTimezonePlugin]}
        appointments={appointments}
        onEventClick={onEventClick}
      />
    </>
  );
};

const StudentsTableView: React.FC = () => {
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState<boolean>(false);
  const [initialAppointment, setInitialAppointment] =
    useState<Appointment>(emptyAppointment);
  const [isCreateAppointmentAllowed, setIsCreateAppointmentAllowed] =
    useState<boolean>(false);
  const [isDeleteStudentAllowed, setIsDeleteStudentAllowed] =
    useState<boolean>(false);

  const { add: addAppointment } = useContext(AppointmentsContext);
  const { delete: deleteStudent } = useContext(StudentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    setIsCreateAppointmentAllowed(
      createPermission(loggedInUser.role, 'appointment')
    );
    setIsDeleteStudentAllowed(deletePermission(loggedInUser.role, 'student'));
  }, [loggedInUser.role]);

  const handleAppointmentClick = (studentToSchedule: Student) => {
    if (isCreateAppointmentAllowed) {
      const appointment = { ...initialAppointment };
      appointment.participants = [studentToSchedule];
      appointment.counselorId = studentToSchedule.studentAssignedCounselorId;
      setInitialAppointment(appointment);
      setIsCreateAppointmentModalOpen(true);
    }
  };

  const handleDeleteClick = (studentToDelete: Student) => {
    if (isDeleteStudentAllowed) {
      deleteStudent(studentToDelete);
    }
  };

  const handleAppointmentAdded = (appointmentToAdd: Appointment) => {
    if (isCreateAppointmentAllowed) {
      addAppointment(appointmentToAdd);
      setIsCreateAppointmentModalOpen(false);
    }
  };

  return (
    <>
      <StudentsSmallTable
        onAppointmentClicked={handleAppointmentClick}
        onDeleteClicked={handleDeleteClick}
      />
      {isCreateAppointmentAllowed && (
        <CreateAppointmentModal
          isOpen={isCreateAppointmentModalOpen}
          onClose={() => setIsCreateAppointmentModalOpen(false)}
          initialAppointment={initialAppointment}
          onAppointmentAdded={handleAppointmentAdded}
        />
      )}
    </>
  );
};

const AdminView: React.FC = () => {
  return (
    <>
      <LeftSection>
        <Header>All Appointments</Header>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Header>All Students</Header>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

const CounselorView: React.FC = () => {
  return (
    <>
      <LeftSection>
        <Header>My Appointments</Header>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Header>My Caseload</Header>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

const SchoolStaffView: React.FC = () => {
  return (
    <>
      <LeftSection>
        <Header>My Appointments</Header>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Header>My Students</Header>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

const SchoolAdminView: React.FC = () => {
  return (
    <>
      <LeftSection>
        <Header>My Appointments</Header>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Header>My Students</Header>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

const StudentView: React.FC = () => {
  const { data: counselors } = useContext(CounselorsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const myCounselor = counselors.find(
    counselor => counselor.id === loggedInUser.studentAssignedCounselorId
  );

  return (
    <>
      <LeftSection>
        <Header>My Appointments</Header>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        {myCounselor && (
          <>
            <Header>My Counselor</Header>
            <CounselorDetails counselor={myCounselor} />
          </>
        )}
      </RightSection>
    </>
  );
};

const GuardianView: React.FC = () => {
  return (
    <>
      <LeftSection>
        <Header>My Appointments</Header>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Header>My Students</Header>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

export default HomePage;
