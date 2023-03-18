// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
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
import AppointmentDialog from '../dialogs/AppointmentDialog';
import { createPermission, deletePermission } from '../../auth/permissions';
import { emptyCounselor, getCounselors } from '../../data/counselors';
import { Grid, Typography } from '@mui/material';
import AppointmentDetailsDialog from '../dialogs/AppointmentDetailsDialog';

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
  const [isAppointmentDetailsDialogOpen, setIsAppointmentDetailsDialogOpen] =
    useState<boolean>(false);
  const [dialogAppointment, setDialogAppointment] =
    useState<Appointment>(emptyAppointment);
  const [isDeleteAppointmentAllowed, setIsDeleteAppointmentAllowed] =
    useState<boolean>(false);
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);

  const {
    data: appointments,
    delete: deleteAppointment,
    update: updateAppointment,
  } = useContext(AppointmentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    setIsDeleteAppointmentAllowed(
      deletePermission(loggedInUser.role, 'appointment')
    );
  }, [loggedInUser.role]);

  const onEventClick = (event: Appointment) => {
    setDialogAppointment(event);
    setIsAppointmentDetailsDialogOpen(true);
  };
  const onAppointmentDeleteClicked = (appointmentToDelete: Appointment) => {
    if (
      isDeleteAppointmentAllowed &&
      window.confirm('Delete this appointment?')
    ) {
      deleteAppointment(appointmentToDelete);
    }
    setIsAppointmentDetailsDialogOpen(false);
  };

  const onAppointmentEmailClicked = (appointmentToEmail: Appointment) => {
    const appointmentCounselor =
      counselors.find(
        counselor => counselor.id === appointmentToEmail.counselorUserId
      ) || emptyCounselor;
    let mailToUrl = `mailto:${appointmentCounselor.email}`;

    for (const participant of appointmentToEmail.participants) {
      mailToUrl += `,${participant.email}`;
    }

    mailToUrl += `?subject=${encodeURIComponent(appointmentToEmail.title)}`;

    window.open(mailToUrl);
  };

  const onAppointmentRoomLinkClicked = (
    appointmentToOpenRoomLink: Appointment
  ) => {
    const counselor = counselors.find(
      counselor => counselor.id === appointmentToOpenRoomLink.counselorUserId
    );
    if (counselor?.counselorRoomLink) {
      window.open(counselor.counselorRoomLink);
    }
  };

  const onAppointmentEdited = (appointment: Appointment) => {
    setDialogAppointment({ ...appointment });
    updateAppointment(appointment);
  };

  return (
    <>
      <Calendar
        view="listDay"
        plugins={[listPlugin, momentTimezonePlugin]}
        appointments={appointments}
        onEventClick={onEventClick}
      />
      <AppointmentDetailsDialog
        isOpen={isAppointmentDetailsDialogOpen}
        onClose={() => setIsAppointmentDetailsDialogOpen(false)}
        appointment={dialogAppointment}
        onRoomLinkClicked={onAppointmentRoomLinkClicked}
        onDeleteClicked={onAppointmentDeleteClicked}
        onEmailClicked={onAppointmentEmailClicked}
        onAppointmentEdited={onAppointmentEdited}
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
      appointment.schoolId = studentToSchedule.studentAssignedSchoolId;
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
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">All Appointments</Typography>
        <AppointmentView />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">All Students</Typography>
        <StudentsTableView />
      </Grid>
    </Grid>
  );
};

const CounselorView: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Caseload</Typography>
        <StudentsTableView />
      </Grid>
    </Grid>
  );
};

const SchoolStaffView: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Students</Typography>
        <StudentsTableView />
      </Grid>
    </Grid>
  );
};

const SchoolAdminView: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Students</Typography>
        <StudentsTableView />
      </Grid>
    </Grid>
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
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        {myCounselor && (
          <>
            <Typography variant="h4">My Counselor</Typography>
            <CounselorDetails counselor={myCounselor} />
          </>
        )}
      </Grid>
    </Grid>
  );
};

const GuardianView: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Appointments</Typography>
        <AppointmentView />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ p: 1 }}>
        <Typography variant="h4">My Students</Typography>
        <StudentsTableView />
      </Grid>
    </Grid>
  );
};

export default HomePage;
