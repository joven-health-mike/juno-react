// Copyright 2022 Social Fabric, LLC

import React, {
  FormEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Appointment,
  emptyAppointment,
  AppointmentType,
  AppointmentTypes,
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
  const [typeSelectionIndex, setTypeSelectionIndex] = useState<number>(-1);

  const { data: counselors } = useContext(CounselorsContext);
  const { data: schools } = useContext(SchoolsContext);
  const { data: students } = useContext(StudentsContext);

  useEffect(() => {
    if (defaultAppointment) {
      if (defaultAppointment.counselorId || defaultAppointment.counselor) {
        const counselorIds = counselors.map(
          counselor => counselor.counselorRef.id
        );
        const targetCounselorId =
          defaultAppointment.counselorId ||
          defaultAppointment.counselor?.id ||
          "APPOINTMENT DIDN'T HAVE COUNSELORID OR COUNSELOR.ID";
        const initialCounselorSelectionIndex =
          counselorIds.indexOf(targetCounselorId);
        setCounselorSelectionIndex(initialCounselorSelectionIndex);
      }
      if (defaultAppointment.type) {
        setTypeSelectionIndexFromName(defaultAppointment.type);
      }
      if (defaultAppointment.participants.length > 0) {
        setParticipants(defaultAppointment.participants);
      }
    }
  }, [counselors, defaultAppointment]);

  const setTypeSelectionIndexFromName = (appointmentTypeName: string) => {
    let i = 0;
    for (const [, value] of Object.entries(AppointmentTypes)) {
      if (value.name.toLowerCase() === appointmentTypeName.toLowerCase()) {
        setTypeSelectionIndex(i);
      }
      i++;
    }
  };

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelectionIndex(counselors.indexOf(counselor));
    setAppointment({ ...appointment, counselorId: counselor.counselorRef.id });
  };

  const onTypeChanged = (type: AppointmentType) => {
    setTypeSelectionIndexFromName(type.name);
    setAppointment({
      ...appointment,
      type: type.name,
    });
  };

  const onParticipantsSelected = (participants: User[]) => {
    setParticipants(participants);
  };

  const handleIsRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment({ ...appointment, isRecurring: e.target.checked });
  };

  const getAssociatedSchool = (student: Student) => {
    return schools.find(school => {
      return school.id === student.studentRef.assignedSchoolId;
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
    const schoolId = schoolSelection?.id || '-1';

    let submittedAppointment = { ...appointment };
    if (!defaultAppointment) {
      submittedAppointment.id = '-1';
    }
    submittedAppointment.title = apptTitle;
    submittedAppointment.schoolId = schoolId;
    submittedAppointment.participants = participants;
    submittedAppointment.status = 'SCHEDULED';
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
        Start Time:
        <DateSelector
          selected={new Date(appointment.start)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, start: date })
          }
          label={'Start Time'}
        />
      </label>
      <label>
        End Time:
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
          selectedIndex={counselorSelectionIndex}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        Type:{' '}
        <SelectTypeList
          value={typeSelectionIndex}
          onTypeChanged={onTypeChanged}
        />
      </label>
      <label>
        Participants:{' '}
        <SelectParticipants
          selectedParticipants={participants}
          onParticipantsSelected={onParticipantsSelected}
        />
      </label>
      <label>
        Is Recurring:{' '}
        <input
          type="checkbox"
          checked={appointment.isRecurring}
          onChange={handleIsRecurringChange}
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

export type SelectParticipantsProps = {
  selectedParticipants: User[];
  onParticipantsSelected(users: User[]): void;
};

export const SelectParticipants: React.FC<SelectParticipantsProps> = ({
  selectedParticipants,
  onParticipantsSelected,
}) => {
  return (
    <>
      <SelectUserList
        selectedUsers={selectedParticipants}
        onUsersChanged={onParticipantsSelected}
      />
    </>
  );
};
