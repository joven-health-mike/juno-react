// Copyright 2022 Social Fabric, LLC

import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { emptyStudent, Student } from '../../data/students';
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
  const [studentSelection, setStudentSelection] = useState(emptyStudent);
  const [counselorSelection, setCounselorSelection] = useState(emptyCounselor);
  const { appointments } = useContext(AppointmentsContext);

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelection(counselor);
  };

  const onStudentChanged = (student: Student) => {
    setStudentSelection(student);
  };

  useEffect(() => {
    setAppointment(prevAppointment => {
      return {
        ...prevAppointment,
        studentId: studentSelection._id,
        counselorId: counselorSelection._id,
      };
    });
  }, [studentSelection, counselorSelection]);

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
          value={counselorSelection.name}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        Student:{' '}
        <SelectStudentList
          value={studentSelection.first_name + ' ' + studentSelection.last_name}
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
