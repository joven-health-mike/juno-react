// Copyright 2022 Social Fabric, LLC

import React, { SyntheticEvent, useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import {
  SelectCounselorList,
  SelectStudentList,
} from '../selectList/SelectList';

type CreateAppointmentFormProps = {
  defaultAppointment?: Appointment;
  onSubmit: (appointment: Appointment) => void;
  onCancel: () => void;
};

const CreateAppointmentForm: React.FC<CreateAppointmentFormProps> = ({
  defaultAppointment,
  onSubmit,
  onCancel,
}) => {
  const [appointment, setAppointment] = useState(
    defaultAppointment ?? emptyAppointment
  );
  const { appointments } = useContext(AppointmentsContext);

  const onCounselorChanged = (counselorId: number) => {
    setAppointment({ ...appointment, counselorId: counselorId });
  };

  const onStudentChanged = (studentId: number) => {
    setAppointment({ ...appointment, studentId: studentId });
  };

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ ...appointment, _id: appointments.length });
  };

  const onFormCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setAppointment(emptyAppointment);
    onCancel();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Title
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={appointment.title}
          required
          onChange={e =>
            setAppointment({ ...appointment, title: e.target.value })
          }
        />
      </label>
      <label>
        Start Time
        <DatePicker
          selected={new Date(appointment.start)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, start: date })
          }
          showTimeSelect
          timeFormat="h:mm"
          timeCaption="Start Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </label>
      <label>
        End Time
        <DatePicker
          selected={new Date(appointment.end)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, end: date })
          }
          showTimeSelect
          timeFormat="h:mm"
          timeCaption="End Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </label>
      <label>
        Counselor:{' '}
        <SelectCounselorList
          value={appointment.counselorId}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        Student:{' '}
        <SelectStudentList
          value={appointment.studentId}
          onStudentChanged={onStudentChanged}
        />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CreateAppointmentForm;
