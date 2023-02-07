// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  Appointment,
  emptyAppointment,
  AppointmentType,
  AppointmentTypes,
} from '../../data/appointments';
import { Counselor, CounselorsContext } from '../../data/counselors';
import { School, SchoolsContext, emptySchool } from '../../data/schools';
import { Student, StudentsContext } from '../../data/students';
import {
  User,
  UsersContext,
  emptyUser,
  LoggedInUserContext,
} from '../../data/users';
import {
  RepeatForFrequency,
  REPEAT_FOR_FREQUENCIES,
} from '../../services/appointment.service';
import DateSelector from '../dateSelector/DateSelector';
import SelectList, {
  SelectCounselorList,
  SelectTypeList,
  SelectUserList,
} from '../selectList/SelectList';
import { buttonStyles, formStyles, inputStyles } from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

const Form = styled.form`
  ${formStyles}
`;

const Input = styled.input`
  ${inputStyles}
`;

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

  const [shouldShowCounselor, setShouldShowCounselor] = useState<boolean>(true);

  const { data: counselors } = useContext(CounselorsContext);
  const { data: schools } = useContext(SchoolsContext);
  const { data: students } = useContext(StudentsContext);
  const { data: users } = useContext(UsersContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    // if the logged-in user is a counselor, they can only schedule appointments for themselves.
    if (loggedInUser.role === 'COUNSELOR') {
      // Hide the counselor select list
      setShouldShowCounselor(false);
      // Set the appointment counselorID to the logged-in user's counselor id
      setAppointment(oldAppointment => {
        return {
          ...oldAppointment,
          counselorId: loggedInUser.id,
        };
      });
    }
  }, [loggedInUser.id, loggedInUser.role]);

  useEffect(() => {
    // If a default appointment is passed in, set up some UI values
    if (defaultAppointment) {
      // If a counselor is selected, set the Counselor selection index
      if (defaultAppointment.counselorUserId || defaultAppointment.counselor) {
        const counselorIds = counselors.map(counselor => counselor.id);
        const targetCounselorId =
          defaultAppointment.counselorUserId ||
          defaultAppointment.counselor?.id ||
          "APPOINTMENT DIDN'T HAVE COUNSELORID OR COUNSELOR.ID";
        const initialCounselorSelectionIndex =
          counselorIds.indexOf(targetCounselorId);
        setCounselorSelectionIndex(initialCounselorSelectionIndex);
      }

      // If a type is selected, set the type selection index
      if (defaultAppointment.type) {
        setTypeSelectionIndexFromName(defaultAppointment.type);
      }

      // If participants are selected, set participants selection
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
    setAppointment({ ...appointment, counselorUserId: counselor.id });
  };

  const onTypeChanged = (type: AppointmentType) => {
    setTypeSelectionIndexFromName(type.name);
    setAppointment({
      ...appointment,
      type: type.name,
    });
  };

  const onRepeatForFrequencyChanged = (
    repeatForFrequency: RepeatForFrequency
  ) => {
    setAppointment({ ...appointment, frequency: repeatForFrequency });
  };

  const onParticipantsSelected = (participants: User[]) => {
    setParticipants(participants);
  };

  const handleIsRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment({ ...appointment, isRecurring: e.target.checked });
  };

  const getAssociatedSchoolFromStudent = (student: Student) => {
    return schools.find(school => {
      return school.id === student.studentAssignedSchoolId;
    });
  };

  const getAssociatedSchoolFromSchoolAdmin = (schoolAdmin: User) => {
    return schools.find(school => {
      return school.id === schoolAdmin.schoolAdminAssignedSchoolId;
    });
  };

  const getAssociatedSchoolFromSchoolStaff = (schoolStaff: User) => {
    return schools.find(school => {
      return school.id === schoolStaff.schoolStaffAssignedSchoolId;
    });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mappedParticipants = participants.map(user => user.id);
    const studentSelection = students.find(student =>
      mappedParticipants.includes(student.id)
    );
    const schoolAdminSelection = users.find(
      user =>
        user.role === 'SCHOOL_ADMIN' && mappedParticipants.includes(user.id)
    );
    const schoolStaffSelection = users.find(
      user =>
        user.role === 'SCHOOL_STAFF' && mappedParticipants.includes(user.id)
    );
    let schoolSelection: School | undefined;
    if (studentSelection) {
      schoolSelection = getAssociatedSchoolFromStudent(studentSelection);
    } else if (schoolAdminSelection) {
      schoolSelection =
        getAssociatedSchoolFromSchoolAdmin(schoolAdminSelection);
    } else if (schoolStaffSelection) {
      schoolSelection =
        getAssociatedSchoolFromSchoolStaff(schoolStaffSelection);
    }

    schoolSelection = schoolSelection || emptySchool;

    const user =
      studentSelection ||
      schoolAdminSelection ||
      schoolStaffSelection ||
      emptyUser;

    const apptTitle = `${user.firstName} ${user.lastName.substring(0, 1)} (${
      schoolSelection?.name
    }) - ${appointment.type}`;

    let submittedAppointment = { ...appointment };
    if (!defaultAppointment) {
      submittedAppointment.id = '-1';
    }
    submittedAppointment.title = apptTitle;
    submittedAppointment.participants = participants;
    submittedAppointment.status = 'SCHEDULED';
    submittedAppointment.schoolId = schoolSelection.id;
    onSubmit(submittedAppointment);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setCounselorSelectionIndex(-1);
    setAppointment(emptyAppointment);
    onCancel();
  };

  return (
    <Form onSubmit={onFormSubmit}>
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
      {shouldShowCounselor && (
        <label>
          Counselor:{' '}
          <SelectCounselorList
            selectedIndex={counselorSelectionIndex}
            onCounselorChanged={onCounselorChanged}
          />
        </label>
      )}
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
        <Input
          type="checkbox"
          checked={appointment.isRecurring}
          onChange={handleIsRecurringChange}
        />
      </label>
      {appointment.isRecurring && (
        <>
          <label>
            Num Occurrences:{' '}
            <Input
              data-testid={'input-numOccurrences'}
              type="number"
              min={2}
              max={99}
              placeholder="Num Occurrences"
              name="numOccurrences"
              value={appointment.numOccurrences}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setAppointment({
                  ...appointment,
                  numOccurrences: parseInt(e.target.value),
                });
              }}
            />
          </label>
          <label>
            Repeat For Num:{' '}
            <Input
              data-testid={'input-repeatForNum'}
              type="number"
              min={1}
              max={99}
              placeholder="Repeat For Num"
              name="repeatForNum"
              value={appointment.numRepeats}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setAppointment({
                  ...appointment,
                  numRepeats: parseInt(e.target.value),
                });
              }}
            />
          </label>
          <label>
            Repeat For Frequency:{' '}
            <SelectList
              labelText="Select a Frequency"
              items={REPEAT_FOR_FREQUENCIES}
              value={REPEAT_FOR_FREQUENCIES.indexOf(
                appointment.frequency || ''
              )}
              onItemChanged={item => {
                return onRepeatForFrequencyChanged(
                  REPEAT_FOR_FREQUENCIES[parseInt(item)] as RepeatForFrequency
                );
              }}
            />
          </label>
        </>
      )}

      <Button type="submit" data-testid={'button-submit'}>
        Submit
      </Button>
      <Button
        type="button"
        data-testid={'button-cancel'}
        onClick={onFormCancel}
      >
        Cancel
      </Button>
    </Form>
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
