// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
  AppointmentType,
} from '../../data/appointments';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { emptyStudent, Student } from '../../data/students';
import DateSelector from '../dateSelector/DateSelector';
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
  defaultAppointment = emptyAppointment,
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
  const [typeSelection, setTypeSelection] = useState<AppointmentType>({
    _id: -1,
    name: 'Unselected',
    color: 'none',
  });

  const { data: appointments } = useContext(AppointmentsContext);
  const { data: schools } = useContext(SchoolsContext);

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelection(counselor);
    const counselorRef = {
      id: '-1',
      userId: counselor.id,
      roomLink: counselor.counselorRef.roomLink,
      user: counselor,
    };
    setAppointment({ ...appointment, counselor: counselorRef });
  };

  const onStudentChanged = (student: Student) => {
    const associatedSchool = schools.filter(
      school => school.id === student.schoolId
    )[0].name;

    setStudentSelection(student);
    setAppointment({
      ...appointment,
      title:
        student.first_name +
        ' ' +
        student.last_name.substring(0, 1) +
        ' (' +
        associatedSchool +
        ')',
      // TODO: set the student as a participant
      // participants: [...appointment.participants, student as User]
    });
  };

  const onTypeChanged = (type: AppointmentType) => {
    setTypeSelection(type);
    setAppointment({
      ...appointment,
      type: type.name,
    });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedAppointment = defaultAppointment
      ? appointment
      : { ...appointment, _id: appointments.length };
    onSubmit(submittedAppointment);
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
          data-testid={'input-title'}
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
        <DateSelector
          selected={new Date(appointment.start)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, start: date })
          }
          label={'Start Time'}
        />
      </label>
      <label>
        End Time
        <DateSelector
          selected={new Date(appointment.end)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, end: date })
          }
          label={'End Time'}
        />
      </label>
      <label>
        Counselor:{' '}
        <SelectCounselorList
          value={+counselorSelection.id}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        Student:{' '}
        <SelectStudentList
          value={+studentSelection._id}
          onStudentChanged={onStudentChanged}
        />
      </label>
      <label>
        Type{' '}
        <SelectTypeList
          value={typeSelection._id}
          onTypeChanged={onTypeChanged}
        />
      </label>

      <button type="submit" data-testid={'button-submit'}>
        Submit
      </button>
      <button
        type="button"
        data-testid={'button-cancel'}
        onClick={onFormCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateAppointmentForm;
