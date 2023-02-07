// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import {
  Counselor,
  CounselorsContext,
  emptyCounselor,
} from '../../data/counselors';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import Calendar from '../calendar/Calendar';
import Navbar from '../navbar/Navbar';
import {
  SelectCounselorList,
  SelectSchoolList,
} from '../selectList/SelectList';
import CreateAppointmentModal from '../modals/CreateAppointmentModal';
import AppointmentDetailsModal from '../modals/AppointmentDetailsModal';
import { h1Styles, labelStyles } from '../styles/mixins';
import { LoggedInUserContext } from '../../data/users';
import { createPermission, deletePermission } from '../../auth/permissions';

const Header = styled.h1`
  ${h1Styles}
`;

const Label = styled.label`
  ${labelStyles}
`;

const CalendarPage: React.FC = () => {
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState<boolean>(false);
  const [isAppointmentDetailsModalOpen, setIsAppointmentDetailsModalOpen] =
    useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(true);
  const [filteredEvents, setFilteredEvents] = useState<Appointment[]>([]);
  const [schoolSelection, setSchoolSelection] = useState<School>(emptySchool);
  const [selectedSchoolIndex, setSelectedSchoolIndex] = useState(-1);
  const [counselorSelection, setCounselorSelection] =
    useState<Counselor>(emptyCounselor);
  const [selectedCounselorIndex, setSelectedCounselorIndex] = useState(-1);
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
  const { data: counselors } = useContext(CounselorsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { data: schools } = useContext(SchoolsContext);

  const handleAppointmentClick = (appointment: Appointment) => {
    setClickedAppointment(appointment);
    setIsAppointmentDetailsModalOpen(true);
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
      setIsCreateAppointmentModalOpen(true);
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
      !isCreateAppointmentModalOpen && !isAppointmentDetailsModalOpen
    );
  }, [isCreateAppointmentModalOpen, isAppointmentDetailsModalOpen]);

  const handleAppointmentAdded = (appointment: Appointment) => {
    if (isCreateAppointmentAllowed) {
      addAppointment(appointment);
    }
    setIsCreateAppointmentModalOpen(false);
  };

  const handleSchoolChange = (selectedSchool: School) => {
    setSelectedSchoolIndex(schools.indexOf(selectedSchool));
    setSchoolSelection(selectedSchool);
  };

  const handleCounselorChange = (selectedCounselor: Counselor) => {
    setSelectedCounselorIndex(counselors.indexOf(selectedCounselor));
    setCounselorSelection(selectedCounselor);
  };

  const onAppointmentDeleteClicked = (appointmentToDelete: Appointment) => {
    if (
      isDeleteAppointmentAllowed &&
      window.confirm('Delete this appointment?')
    ) {
      deleteAppointment(appointmentToDelete);
    }
    setIsAppointmentDetailsModalOpen(false);
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
        counselorSelection.id === '-1' ||
        counselorSelection.id === appointment.counselorUserId ||
        counselorSelection.id === appointment.counselor?.id;
      const schoolMatch =
        schoolSelection.id === '-1' ||
        schoolSelection.id === appointment.schoolId;
      return counselorMatch && schoolMatch;
    });
    setFilteredEvents(filteredEvents);
  }, [appointments, counselorSelection, schoolSelection]);

  useEffect(() => {
    setFilteredEvents(appointments);
  }, [appointments]);

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <Header>Calendar</Header>
      {loggedInUser.role !== 'COUNSELOR' && counselors.length > 1 && (
        <Label>
          Counselor:{' '}
          <SelectCounselorList
            selectedIndex={selectedCounselorIndex}
            onCounselorChanged={handleCounselorChange}
          />
        </Label>
      )}
      {loggedInUser.role !== 'SCHOOL_ADMIN' &&
        loggedInUser.role !== 'SCHOOL_STAFF' &&
        schools.length > 1 && (
          <Label>
            School:{' '}
            <SelectSchoolList
              selectedIndex={selectedSchoolIndex}
              onSchoolChanged={handleSchoolChange}
            />
          </Label>
        )}
      {showCalendar && (
        <Calendar
          view="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin, momentTimezonePlugin]}
          appointments={filteredEvents}
          onEventClick={handleAppointmentClick}
          onDateClick={handleDateClick}
        />
      )}
      <CreateAppointmentModal
        isOpen={isCreateAppointmentModalOpen}
        onClose={() => setIsCreateAppointmentModalOpen(false)}
        onAppointmentAdded={handleAppointmentAdded}
        initialAppointment={initialAppointment}
      />
      <AppointmentDetailsModal
        isOpen={isAppointmentDetailsModalOpen}
        onClose={() => setIsAppointmentDetailsModalOpen(false)}
        appointment={clickedAppointment}
        onRoomLinkClicked={onAppointmentRoomLinkClicked}
        onDeleteClicked={onAppointmentDeleteClicked}
        onEmailClicked={onAppointmentEmailClicked}
      />
    </div>
  );
};

export default CalendarPage;
