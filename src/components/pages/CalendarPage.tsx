// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointment, AppointmentsContext } from '../../data/appointments';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { emptySchool, School } from '../../data/schools';
import Calendar from '../calendar/Calendar';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';
import {
  SelectCounselorList,
  SelectSchoolList,
} from '../selectList/SelectList';
import { StudentsContext } from '../../data/students';

const CalendarPage: React.FC = () => {
  const role = 'admin';

  const [filteredEvents, setFilteredEvents] = useState<Appointment[]>([]);
  const [schoolSelection, setSchoolSelection] = useState<School>(emptySchool);
  const [counselorSelection, setCounselorSelection] =
    useState<Counselor>(emptyCounselor);
  const { appointments } = useContext(AppointmentsContext);
  const { students } = useContext(StudentsContext);

  const onEventClick = (event: Appointment) => {
    // display AppointmentDetailPage with this event
    console.log('eventClicked:', event);
  };

  const onDateClick = (date: string) => {
    // display new appointment form
    console.log('dateClicked:', date);
  };

  const handleSchoolChange = (selectedSchool: School) => {
    setSchoolSelection(selectedSchool);
  };

  const handleCounselorChange = (selectedCounselor: Counselor) => {
    setCounselorSelection(selectedCounselor);
  };

  useEffect(() => {
    const filteredEvents = appointments.filter(appointment => {
      const counselorMatch =
        counselorSelection._id === -1 ||
        counselorSelection._id === appointment.counselorId;
      const student = students.find(
        student => student._id === appointment.studentId
      );
      const schoolMatch = student
        ? schoolSelection._id === -1 || schoolSelection._id === student.schoolId
        : false;
      return counselorMatch && schoolMatch;
    });
    setFilteredEvents(filteredEvents);
  }, [counselorSelection, schoolSelection, appointments, students]);

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
            value={schoolSelection.name}
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
