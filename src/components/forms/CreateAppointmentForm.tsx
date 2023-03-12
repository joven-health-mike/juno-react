// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  Appointment,
  emptyAppointment,
  AppointmentType,
  AppointmentTypes,
  generateAppointmentTitle,
  APPOINTMENT_STATUSES,
  AppointmentStatus,
} from '../../data/appointments';
import { Counselor, getCounselors } from '../../data/counselors';
import { School, SchoolsContext, emptySchool } from '../../data/schools';
import { User, UsersContext, LoggedInUserContext } from '../../data/users';
import {
  RepeatForFrequency,
  REPEAT_FOR_FREQUENCIES,
} from '../../services/appointment.service';
import DateSelector from '../dateSelector/DateSelector';
import SelectList, {
  SelectCounselorList,
  SelectSchoolList,
  SelectTypeList,
  SelectUserList,
} from '../selectList/SelectList';
import {
  buttonStyles,
  formStyles,
  inputStyles,
  labelStyles,
} from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

const Form = styled.form`
  ${formStyles}
`;

const Input = styled.input`
  ${inputStyles}
`;

const Label = styled.label`
  ${labelStyles}
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
  const [availableParticipants, setAvailableParticipants] = useState<User[]>(
    []
  );
  const [counselorSelectionIndex, setCounselorSelectionIndex] =
    useState<number>(-1);
  const [schoolSelectionIndex, setSchoolSelectionIndex] = useState<number>(-1);
  const [typeSelectionIndex, setTypeSelectionIndex] = useState<number>(-1);
  const [duration, setDuration] = useState<string>('30');

  const [shouldShowCounselor, setShouldShowCounselor] = useState<boolean>(true);

  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const { data: schools } = useContext(SchoolsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const DURATIONS = ['15', '30', '45', '60', '75', '90'];

  useEffect(() => {
    // if the logged-in user is a counselor, they can only schedule appointments for themselves.
    if (loggedInUser.role === 'COUNSELOR') {
      // Hide the counselor select list
      setShouldShowCounselor(false);
      // Set the appointment counselorID to the logged-in user's counselor id
      setAppointment(oldAppointment => {
        return {
          ...oldAppointment,
          counselorUserId: loggedInUser.id,
        };
      });
    }
  }, [loggedInUser.id, loggedInUser.role]);

  const determineAvailableParticipants = useCallback(
    (school: School) => {
      setAvailableParticipants(
        users.filter(user => {
          if (
            user.role === 'STUDENT' &&
            user.studentAssignedSchoolId === school.id
          )
            return true;
          else if (
            user.role === 'SCHOOL_ADMIN' &&
            user.schoolAdminAssignedSchoolId === school.id
          )
            return true;
          else if (
            user.role === 'SCHOOL_STAFF' &&
            user.schoolStaffAssignedSchoolId === school.id
          )
            return true;
          else if (
            user.role === 'GUARDIAN' &&
            (user.guardianStudents?.length || 0) > 0 &&
            user.guardianStudents![0].studentAssignedSchoolId === school.id
          )
            return true;

          return false;
        })
      );
    },
    [users]
  );

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

      if (defaultAppointment.schoolId || defaultAppointment.school) {
        const schoolIds = schools.map(school => school.id);
        const targetSchoolId =
          defaultAppointment.schoolId ||
          defaultAppointment.school?.id ||
          "APPOINTMENT DIDN'T HAVE SCHOOLID OR SCHOOL.ID";
        const initialSchoolSelectionIndex = schoolIds.indexOf(targetSchoolId);
        setSchoolSelectionIndex(initialSchoolSelectionIndex);
        determineAvailableParticipants(
          schools.find(school => school.id === targetSchoolId) || emptySchool
        );
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
  }, [counselors, schools, defaultAppointment, determineAvailableParticipants]);

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

  const onSchoolChanged = (school: School) => {
    setSchoolSelectionIndex(schools.indexOf(school));
    setAppointment({ ...appointment, schoolId: school.id });
    determineAvailableParticipants(school);
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

  const onStatusChanged = (status: AppointmentStatus) => {
    setAppointment({ ...appointment, status: status });
  };

  // TODO: Refactor this using strategy pattern for each role
  const generateAppointmentTitleLocal = (submittedAppointment: Appointment) => {
    const names: string[] = [];
    const schoolName = (
      schools.find(school => school.id === submittedAppointment.schoolId) ||
      emptySchool
    ).name;
    const appointmentTypeName = submittedAppointment.type;

    const students = participants.filter(
      participant => participant.role === 'STUDENT'
    );

    if (students.length > 0) {
      names.push(
        ...students.map(
          student => `${student.firstName} ${student.lastName.substring(0, 1)}`
        )
      );
    } else {
      const schoolFolks = participants.filter(
        participant =>
          participant.role === 'SCHOOL_ADMIN' ||
          participant.role === 'SCHOOL_STAFF'
      );

      if (schoolFolks.length > 0) {
        names.push(
          ...schoolFolks.map(
            schoolFolk =>
              `${schoolFolk.firstName} ${schoolFolk.lastName.substring(0, 1)}`
          )
        );
      } else {
        const guardians = participants.filter(
          participant => participant.role === 'GUARDIAN'
        );

        if (guardians.length > 0) {
          names.push(
            ...guardians.map(
              guardian =>
                `${guardian.firstName} ${guardian.lastName.substring(0, 1)}`
            )
          );
        } else {
          const counselors = participants.filter(
            participant => participant.role === 'COUNSELOR'
          );

          if (counselors.length > 0) {
            names.push(
              ...counselors.map(
                counselor =>
                  `${counselor.firstName} ${counselor.lastName.substring(0, 1)}`
              )
            );
          } else {
            names.push(
              ...participants.map(
                participant =>
                  `${participant.firstName} ${participant.lastName.substring(
                    0,
                    1
                  )}`
              )
            );
          }
        }
      }
    }

    return generateAppointmentTitle(names, schoolName, appointmentTypeName);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    let submittedAppointment = { ...appointment };
    if (!defaultAppointment) {
      submittedAppointment.id = '-1';
    }

    submittedAppointment.title =
      generateAppointmentTitleLocal(submittedAppointment);
    submittedAppointment.participants = participants;

    const startDate = new Date(appointment.start);
    const endDate = new Date(startDate.getTime() + parseInt(duration) * 60000);
    submittedAppointment.start = startDate;
    submittedAppointment.end = endDate;

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
      <Label>
        Start Time:
        <DateSelector
          selected={new Date(appointment.start)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, start: date })
          }
          label={'Start Time'}
        />
      </Label>
      <Label>
        Duration:
        <SelectList
          labelText={'Select Duration'}
          items={DURATIONS}
          value={DURATIONS.indexOf(duration || '')}
          onItemChanged={item => setDuration(DURATIONS[parseInt(item)])}
        />
      </Label>
      {shouldShowCounselor && (
        <Label>
          Counselor:{' '}
          <SelectCounselorList
            selectedIndex={counselorSelectionIndex}
            onCounselorChanged={onCounselorChanged}
          />
        </Label>
      )}
      <Label>
        Type:{' '}
        <SelectTypeList
          value={typeSelectionIndex}
          onTypeChanged={onTypeChanged}
        />
      </Label>
      <Label>
        Status:{' '}
        <SelectList
          labelText="Select a Status"
          items={APPOINTMENT_STATUSES}
          value={APPOINTMENT_STATUSES.indexOf(appointment.status)}
          onItemChanged={item => {
            return onStatusChanged(
              APPOINTMENT_STATUSES[parseInt(item)] as AppointmentStatus
            );
          }}
        />
      </Label>
      <Label>
        School:{' '}
        <SelectSchoolList
          selectedIndex={schoolSelectionIndex}
          onSchoolChanged={onSchoolChanged}
        />
      </Label>
      <Label>
        Participants:{' '}
        <SelectParticipants
          availableParticipants={availableParticipants}
          selectedParticipants={participants}
          onParticipantsSelected={onParticipantsSelected}
        />
      </Label>
      <Label>
        Is Recurring:{' '}
        <Input
          type="checkbox"
          checked={appointment.isRecurring}
          onChange={handleIsRecurringChange}
        />
      </Label>
      {appointment.isRecurring && (
        <Label>
          <SelectIsRecurring
            initialNumOccurrences={appointment.numOccurrences || 0}
            initialRepeatForNum={appointment.numRepeats || 0}
            initialRepeatForFrequency={
              (appointment.frequency as RepeatForFrequency) || 'WEEKS'
            }
            onRecurringInfoChanged={function (
              numOccurrences: number,
              repeatForNum: number,
              repeatForFrequency: RepeatForFrequency
            ): void {
              setAppointment({
                ...appointment,
                numOccurrences: numOccurrences,
                numRepeats: repeatForNum,
                frequency: repeatForFrequency,
              });
            }}
          />
        </Label>
      )}

      <Button type="submit">Submit</Button>
      <Button type="button" onClick={onFormCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default CreateAppointmentForm;

export type SelectParticipantsProps = {
  availableParticipants: User[];
  selectedParticipants: User[];
  onParticipantsSelected(users: User[]): void;
};

export const SelectParticipants: React.FC<SelectParticipantsProps> = ({
  availableParticipants,
  selectedParticipants,
  onParticipantsSelected,
}) => {
  return (
    <>
      <SelectUserList
        users={availableParticipants}
        selectedUsers={selectedParticipants}
        onUsersChanged={onParticipantsSelected}
      />
    </>
  );
};

export type SelectIsRecurringProps = {
  initialNumOccurrences: number;
  initialRepeatForNum: number;
  initialRepeatForFrequency: RepeatForFrequency;
  onRecurringInfoChanged(
    numOccurrences: number,
    repeatForNum: number,
    repeatForFrequency: RepeatForFrequency
  ): void;
};

export const SelectIsRecurring: React.FC<SelectIsRecurringProps> = ({
  initialNumOccurrences,
  initialRepeatForNum,
  initialRepeatForFrequency,
  onRecurringInfoChanged,
}) => {
  const [numOccurrences, setNumOccurrences] = useState<number>(
    initialNumOccurrences
  );
  const [repeatForNum, setRepeatForNum] = useState<number>(initialRepeatForNum);
  const [repeatForFrequency, setRepeatForFrequency] =
    useState<RepeatForFrequency>(initialRepeatForFrequency);

  return (
    <>
      {`Repeat every`}{' '}
      <Input
        type="number"
        min={1}
        max={10}
        placeholder="Repeat For Num"
        name="repeatForNum"
        data-testid="repeatForNum"
        value={repeatForNum}
        required
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const changedRepeatForNum = parseInt(e.target.value);
          setRepeatForNum(changedRepeatForNum);
          onRecurringInfoChanged(
            numOccurrences,
            changedRepeatForNum,
            repeatForFrequency
          );
        }}
      />
      <SelectList
        labelText="Select a Frequency"
        items={REPEAT_FOR_FREQUENCIES}
        value={REPEAT_FOR_FREQUENCIES.indexOf(repeatForFrequency || '')}
        onItemChanged={item => {
          const changedFrequency = REPEAT_FOR_FREQUENCIES[
            parseInt(item)
          ] as RepeatForFrequency;
          setRepeatForFrequency(changedFrequency);
          onRecurringInfoChanged(
            numOccurrences,
            repeatForNum,
            changedFrequency
          );
        }}
      />
      {`for `}
      <Input
        type="number"
        min={2}
        max={99}
        placeholder="Num Occurrences"
        name="numOccurrences"
        data-testid="numOccurrences"
        value={numOccurrences}
        required
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const changedNumOccurrences = parseInt(e.target.value);
          setNumOccurrences(changedNumOccurrences);
          onRecurringInfoChanged(
            changedNumOccurrences,
            repeatForNum,
            repeatForFrequency
          );
        }}
      />
      {' ' + repeatForFrequency}
    </>
  );
};
