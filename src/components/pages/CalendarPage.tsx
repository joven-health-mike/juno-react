// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { DateTime } from 'luxon';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import {
  Counselor,
  emptyCounselor,
  getCounselors,
} from '../../data/counselors';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import Calendar from '../calendar/Calendar';
import Navbar from '../navbar/Navbar';
import AppointmentDialog from '../dialogs/AppointmentDialog';
import AppointmentDetailsDialog from '../dialogs/AppointmentDetailsDialog';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import { createPermission, deletePermission } from '../../auth/permissions';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const CalendarPage: React.FC = () => {
  const [isCreateAppointmentDialogOpen, setIsCreateAppointmentDialogOpen] =
    useState<boolean>(false);
  const [isAppointmentDetailsDialogOpen, setIsAppointmentDetailsDialogOpen] =
    useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(true);
  const [filteredEvents, setFilteredEvents] = useState<Appointment[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School>(emptySchool);
  const [selectedCounselor, setSelectedCounselor] =
    useState<Counselor>(emptyCounselor);
  const [initialAppointment, setInitialAppointment] =
    useState<Appointment>(emptyAppointment);
  const [clickedAppointment, setClickedAppointment] =
    useState<Appointment>(emptyAppointment);
  const [isCreateAppointmentAllowed, setIsCreateAppointmentAllowed] =
    useState<boolean>(false);
  const [isDeleteAppointmentAllowed, setIsDeleteAppointmentAllowed] =
    useState<boolean>(false);

  const {
    data: appointments,
    add: addAppointment,
    delete: deleteAppointment,
  } = useContext(AppointmentsContext);
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { data: schools } = useContext(SchoolsContext);

  const handleAppointmentClick = (appointment: Appointment) => {
    setClickedAppointment(appointment);
    setIsAppointmentDetailsDialogOpen(true);
  };

  const handleDateClick = (utcDateStr: string) => {
    if (isCreateAppointmentAllowed) {
      const startTime = DateTime.fromFormat(utcDateStr, 'yyyy-MM-dd')
        .set({
          hour: 8,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toJSDate();
      const endTime = DateTime.fromJSDate(startTime)
        .set({ minute: 30 })
        .toJSDate();
      setInitialAppointment({
        ...initialAppointment,
        start: startTime,
        end: endTime,
      });
      setIsCreateAppointmentDialogOpen(true);
    }
  };

  useEffect(() => {
    setIsCreateAppointmentAllowed(
      createPermission(loggedInUser.role, 'appointment')
    );
    setIsDeleteAppointmentAllowed(
      deletePermission(loggedInUser.role, 'appointment')
    );
  }, [loggedInUser.role]);

  useEffect(() => {
    setShowCalendar(
      !isCreateAppointmentDialogOpen && !isAppointmentDetailsDialogOpen
    );
  }, [isCreateAppointmentDialogOpen, isAppointmentDetailsDialogOpen]);

  const handleAppointmentAdded = (appointment: Appointment) => {
    if (isCreateAppointmentAllowed) {
      addAppointment(appointment);
    }
    setIsCreateAppointmentDialogOpen(false);
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

  useEffect(() => {
    const filteredEvents = appointments.filter(appointment => {
      const counselorMatch =
        selectedCounselor.id === '-1' ||
        selectedCounselor.id === appointment.counselorUserId ||
        selectedCounselor.id === appointment.counselor?.id;
      const schoolMatch =
        selectedSchool.id === '-1' ||
        selectedSchool.id === appointment.schoolId;
      return counselorMatch && schoolMatch;
    });
    setFilteredEvents(filteredEvents);
  }, [appointments, selectedCounselor, selectedSchool]);

  useEffect(() => {
    setFilteredEvents(appointments);
  }, [appointments]);

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Typography variant="h3">Calendar</Typography>

      <Box justifyContent="center" display="flex" sx={{ mt: 2, mb: 2 }}>
        {loggedInUser.role !== 'COUNSELOR' && counselors.length > 1 && (
          <FormControl fullWidth sx={{ mr: 10 }}>
            <InputLabel id="counselor">Counselor</InputLabel>
            <Select
              labelId="counselor"
              id="counselor"
              defaultValue=""
              value={selectedCounselor.id}
              label="Counselor"
              onChange={e => {
                const counselorId = e.target.value;
                const newCounselor = counselors.find(
                  counselor => counselor.id === counselorId
                ) ?? { ...emptyCounselor };
                setSelectedCounselor(newCounselor);
              }}
            >
              <MenuItem value={'all'}>{'Select All'}</MenuItem>
              {counselors.map((counselor, index) => {
                const counselorStr = `${counselor.firstName} ${counselor.lastName}`;
                return (
                  <MenuItem value={counselor.id} key={index}>
                    {counselorStr}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        {loggedInUser.role !== 'SCHOOL_ADMIN' &&
          loggedInUser.role !== 'SCHOOL_STAFF' &&
          schools.length > 1 && (
            <FormControl fullWidth>
              <InputLabel id="school">School</InputLabel>
              <Select
                labelId="school"
                id="school"
                defaultValue=""
                value={selectedSchool.id}
                label="School"
                onChange={e => {
                  const schoolId = e.target.value;
                  const newSchool =
                    schools.find(school => school.id === schoolId) ??
                    emptySchool;
                  setSelectedSchool(newSchool);
                }}
              >
                <MenuItem value={'all'}>{'Select All'}</MenuItem>
                {schools.map((school, index) => {
                  return (
                    <MenuItem value={school.id} key={index}>
                      {school.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
      </Box>
      {showCalendar && (
        <Calendar
          view="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin, momentTimezonePlugin]}
          appointments={filteredEvents}
          onEventClick={handleAppointmentClick}
          onDateClick={handleDateClick}
        />
      )}
      <AppointmentDialog
        title="Create Appointment"
        isOpen={isCreateAppointmentDialogOpen}
        onClose={() => setIsCreateAppointmentDialogOpen(false)}
        onAppointmentAdded={handleAppointmentAdded}
        initialAppointment={initialAppointment}
      />
      <AppointmentDetailsDialog
        isOpen={isAppointmentDetailsDialogOpen}
        onClose={() => setIsAppointmentDetailsDialogOpen(false)}
        appointment={clickedAppointment}
        onRoomLinkClicked={onAppointmentRoomLinkClicked}
        onDeleteClicked={onAppointmentDeleteClicked}
        onEmailClicked={onAppointmentEmailClicked}
      />
    </>
  );
};

export default CalendarPage;
