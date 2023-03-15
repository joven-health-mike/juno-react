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
import AppointmentDialog from '../modals/AppointmentDialog';
import { createPermission, deletePermission } from '../../auth/permissions';
import { getCounselors } from '../../data/counselors';
import { Typography } from '@mui/material';

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
  const [isCreateAppointmentDialogOpen, setIsCreateAppointmentDialogOpen] =
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
      setIsCreateAppointmentDialogOpen(true);
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
      setIsCreateAppointmentDialogOpen(false);
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
        <AppointmentDialog
          title="Create Appointment"
          isOpen={isCreateAppointmentDialogOpen}
          onClose={() => setIsCreateAppointmentDialogOpen(false)}
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
        <Typography variant="h4">All Appointments</Typography>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Typography variant="h4">All Students</Typography>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

const CounselorView: React.FC = () => {
  return (
    <>
      <LeftSection>
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Typography variant="h4">My Caseload</Typography>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

const SchoolStaffView: React.FC = () => {
  return (
    <>
      <LeftSection>
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Typography variant="h4">My Students</Typography>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

const SchoolAdminView: React.FC = () => {
  return (
    <>
      <LeftSection>
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Typography variant="h4">My Students</Typography>
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
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        {myCounselor && (
          <>
            <Typography variant="h4">My Counselor</Typography>
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
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </LeftSection>
      <RightSection>
        <Typography variant="h4">My Students</Typography>
        <StudentsTableView />
      </RightSection>
    </>
  );
};

export default HomePage;
