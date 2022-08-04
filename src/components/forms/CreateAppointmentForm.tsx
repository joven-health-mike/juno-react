// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
  IAppointmentsContext,
} from '../../data/appointments';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { emptyStudent, Student } from '../../data/students';
import {
  SelectCounselorList,
  SelectStudentList,
  SelectTypeList,
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
  const [appointment, setAppointment] = useState<Appointment>(
    defaultAppointment ?? emptyAppointment
  );
  const [studentSelection, setStudentSelection] =
    useState<Student>(emptyStudent);
  const [counselorSelection, setCounselorSelection] =
    useState<Counselor>(emptyCounselor);
  const [typeSelection, setTypeSelection] = useState<string>('');
  const { appointments } =
    useContext<IAppointmentsContext>(AppointmentsContext);

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelection(counselor);
  };

  const onStudentChanged = (student: Student) => {
    setStudentSelection(student);
  };

  const onTypeChanged = (type: string) => {
    setTypeSelection(type);
  };

  // update the appointment whenever counselor or student selection is changed
  useEffect(() => {
    setAppointment(prevAppointment => {
      return {
        ...prevAppointment,
        studentId: studentSelection._id,
        counselorId: counselorSelection._id,
        type: typeSelection,
      };
    });
  }, [studentSelection, counselorSelection, typeSelection]);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...appointment, _id: appointments.length });
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setStudentSelection(emptyStudent);
    setCounselorSelection(emptyCounselor);
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
      <label>
        Type{' '}
        <SelectTypeList value={typeSelection} onTypeChanged={onTypeChanged} />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CreateAppointmentForm;
