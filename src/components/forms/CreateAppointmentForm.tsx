// Copyright 2022 Social Fabric, LLC

import React, { FormEvent, MouseEvent, useContext, useState } from 'react';
import {
  Appointment,
  emptyAppointment,
  AppointmentType,
} from '../../data/appointments';
import { Counselor, CounselorsContext } from '../../data/counselors';
import { emptySchool, SchoolsContext } from '../../data/schools';
import { Student, StudentsContext } from '../../data/students';
import { User } from '../../data/users';
import DateSelector from '../dateSelector/DateSelector';
import {
  SelectCounselorList,
  SelectTypeList,
  SelectUserList,
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
  const [participants, setParticipants] = useState<User[]>([]);
  const [counselorSelectionIndex, setCounselorSelectionIndex] =
    useState<number>(-1);
  const [typeSelection, setTypeSelection] = useState<AppointmentType>({
    id: -1,
    name: 'Unselected',
    color: 'none',
  });

  const { data: counselors } = useContext(CounselorsContext);
  const { data: schools } = useContext(SchoolsContext);
  const { data: students } = useContext(StudentsContext);

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelectionIndex(counselors.indexOf(counselor));
    setAppointment({ ...appointment, counselorId: counselor.counselorRef.id });
  };

  const onTypeChanged = (type: AppointmentType) => {
    setTypeSelection(type);
    setAppointment({
      ...appointment,
      type: type.name,
    });
  };

  const onParticipantsSelected = (participants: User[]) => {
    setParticipants(participants);
  };

  const getAssociatedSchool = (student: Student) => {
    return schools.find(school => {
      return school.id === student.studentRef.schoolId;
    });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const studentSelection = students.find(student => {
      return participants.map(user => user.id).includes(student.id);
    });
    const schoolSelection = studentSelection
      ? getAssociatedSchool(studentSelection)
      : emptySchool;

    const apptTitle = studentSelection
      ? `${studentSelection.firstName} ${studentSelection.lastName.substring(
          0,
          1
        )} (${schoolSelection?.name})`
      : 'Appointment';
    const schoolId = schoolSelection?.id;

    const submittedAppointment = defaultAppointment
      ? appointment
      : {
          ...appointment,
          id: '-1',
          title: apptTitle,
          schoolId: schoolId,
          participants: participants,
          status: 'SCHEDULED',
        };
    onSubmit(submittedAppointment);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setCounselorSelectionIndex(-1);
    setAppointment(emptyAppointment);
    onCancel();
  };

  return (
    <form onSubmit={onFormSubmit}>
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
          value={counselorSelectionIndex}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        Type{' '}
        <SelectTypeList
          value={typeSelection.id}
          onTypeChanged={onTypeChanged}
        />
      </label>
      <label>
        Participants:{' '}
        <SelectParticipants onParticipantsSelected={onParticipantsSelected} />
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

export type SelectParticipantsProps = {
  onParticipantsSelected(users: User[]): void;
};

export const SelectParticipants: React.FC<SelectParticipantsProps> = ({
  onParticipantsSelected,
}) => {
  return (
    <>
      <SelectUserList onUsersChanged={onParticipantsSelected} />
    </>
  );
};
