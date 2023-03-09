// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import { Student } from '../../data/students';
import CounselorDetails from '../details/CounselorDetails';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import { Role } from '../../services/user.service';
import CreateAppointmentModal from '../modals/CreateAppointmentModal';
import { createPermission, deletePermission } from '../../auth/permissions';
import { h1Styles } from '../styles/mixins';
import { getCounselors } from '../../data/counselors';

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
    <>
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
    </>
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
  const { update: updateStudent } = useContext(UsersContext);
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
      appointment.counselorUserId =
        studentToSchedule.studentAssignedCounselorId;
      setInitialAppointment(appointment);
      setIsCreateAppointmentModalOpen(true);
    }
  };

  const handleDeleteClick = (studentToDelete: Student) => {
    if (isDeleteStudentAllowed && window.confirm('Delete this student?')) {
      studentToDelete.studentStatus = 'DISCHARGED';
      updateStudent(studentToDelete);
    }
  };

  const handleOpenFileClick = (studentToOpenFile: Student) => {
    window.open(studentToOpenFile.docsUrl);
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
        onOpenFileClicked={handleOpenFileClick}
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
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
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
