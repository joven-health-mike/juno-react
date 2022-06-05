// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointment, AppointmentsContext } from '../../data/appointments';
import {
  Counselor,
  CounselorsContext,
  emptyCounselor,
} from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import Calendar from '../calendar/Calendar';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';
import {
  SelectCounselorList,
  SelectSchoolList,
} from '../selectList/SelectList';

const CalendarPage: React.FC = () => {
  const role = 'admin';

  const [filteredEvents, setFilteredEvents] = useState<Appointment[]>([]);
  const [schoolSelection, setSchoolSelection] = useState<string>('');
  const [counselorSelection, setCounselorSelection] =
    useState<Counselor>(emptyCounselor);
  const { appointments } = useContext(AppointmentsContext);
  const { schools } = useContext(SchoolsContext);

  const onEventClick = (event: Appointment) => {
    // display AppointmentDetailPage with this event
    console.log('eventClicked:', event);
  };

  const onDateClick = (date: string) => {
    // display new appointment form
    console.log('dateClicked:', date);
  };

  const handleSchoolChange = (selectedSchoolName: string) => {
    const selectedSchool = schools.filter(
      school => school.name === selectedSchoolName
    )[0];
    const schoolName = selectedSchool === undefined ? '' : selectedSchool.name;
    console.log('Selected school changed', schoolName);
    setSchoolSelection(schoolName);
  };

  const handleCounselorChange = (selectedCounselor: Counselor) => {
    console.log(
      'Selected counselor changed. old value:',
      counselorSelection,
      'new value:',
      selectedCounselor
    );
    setCounselorSelection(selectedCounselor);
  };

  useEffect(() => {
    console.log('filterEvents:', counselorSelection.name, schoolSelection);
    const filteredEvents = appointments.filter(appointment => {
      // TODO: Need to refactor the inputs here to be School objects or schoolId values.
      let counselorMatch =
        counselorSelection._id === -1 ||
        counselorSelection._id === appointment.counselorId;
      let schoolMatch =
        schoolSelection === '' ||
        /*schoolName === appointment.facilitatorId;*/ true;
      return counselorMatch && schoolMatch;
    });
    setFilteredEvents(filteredEvents);
  }, [counselorSelection, schoolSelection, appointments]);

  useEffect(() => {
    setFilteredEvents(appointments);
  }, [appointments]);

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Calendar</h1>
      <>
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
            value={schoolSelection}
            onSchoolChanged={handleSchoolChange}
          />
        </label>
        <Calendar
          view="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          appointments={filteredEvents}
          onEventClick={onEventClick}
          onDateClick={onDateClick}
        />
      </>
    </div>
  );
};

export default CalendarPage;
