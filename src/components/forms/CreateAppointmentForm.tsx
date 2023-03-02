// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
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
} from '../../data/appointments';
import { Counselor, getCounselors } from '../../data/counselors';
import { School, SchoolsContext, emptySchool } from '../../data/schools';
import { getStudents, Student } from '../../data/students';
import { User, UsersContext, LoggedInUserContext } from '../../data/users';
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
  const [counselorSelectionIndex, setCounselorSelectionIndex] =
    useState<number>(-1);
  const [typeSelectionIndex, setTypeSelectionIndex] = useState<number>(-1);

  const [shouldShowCounselor, setShouldShowCounselor] = useState<boolean>(true);

  const { data: users } = useContext(UsersContext);
  const students = useMemo(() => getStudents(users), [users]);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const { data: schools } = useContext(SchoolsContext);
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
          counselorUserId: loggedInUser.id,
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

  const getAssociatedSchoolFromGuardian = (guardian: User) => {
    let schoolId = '-1';
    if (guardian.guardianStudents && guardian.guardianStudents.length > 0) {
      schoolId = guardian.guardianStudents[0].studentAssignedSchoolId || '-1';
    }
    return schools.find(school => {
      return school.id === schoolId;
    });
  };

  // TODO: Refactor this using strategy pattern for each role
  const generateAppointmentTitleLocal = (
    submittedAppointment: Appointment,
    schoolName: string
  ) => {
    const names: string[] = [];
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
    const participantIds = participants.map(user => user.id);
    const studentSelection = students.find(student =>
      participantIds.includes(student.id)
    );
    const schoolAdminSelection = users.find(
      user => user.role === 'SCHOOL_ADMIN' && participantIds.includes(user.id)
    );
    const schoolStaffSelection = users.find(
      user => user.role === 'SCHOOL_STAFF' && participantIds.includes(user.id)
    );
    const guardianSelection = users.find(
      user => user.role === 'GUARDIAN' && participantIds.includes(user.id)
    );
    let schoolSelection: School | undefined;
    if (studentSelection) {
      console.log('found a student');
      schoolSelection = getAssociatedSchoolFromStudent(studentSelection);
    } else if (schoolAdminSelection) {
      console.log('found a school admin');
      schoolSelection =
        getAssociatedSchoolFromSchoolAdmin(schoolAdminSelection);
    } else if (schoolStaffSelection) {
      console.log('found a school staff');
      schoolSelection =
        getAssociatedSchoolFromSchoolStaff(schoolStaffSelection);
    } else if (guardianSelection) {
      console.log('found a guardian');
      schoolSelection = getAssociatedSchoolFromGuardian(guardianSelection);
    }

    schoolSelection = schoolSelection || emptySchool;

    let submittedAppointment = { ...appointment };
    if (!defaultAppointment) {
      submittedAppointment.id = '-1';
    }

    submittedAppointment.schoolId = schoolSelection.id;
    submittedAppointment.title = generateAppointmentTitleLocal(
      submittedAppointment,
      schoolSelection?.name
    );
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
        End Time:
        <DateSelector
          selected={new Date(appointment.end)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, end: date })
          }
          label={'End Time'}
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
        Participants:{' '}
        <SelectParticipants
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
        <>
          <Label>
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
          </Label>
          <Label>
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
          </Label>
          <Label>
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
          </Label>
        </>
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
