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
import { ContextData } from '../../data/ContextData';
import { Counselor, getCounselors } from '../../data/counselors';
import { School, SchoolsContext } from '../../data/schools';
import { StudentStatus } from '../../data/students';
import { emptyTeacher, Teacher } from '../../data/teachers';
import { UsersContext } from '../../data/users';
import { Role } from '../../services/user.service';
import { AvailableTimeZone, TIME_ZONES } from '../../utils/DateUtils';
import SelectList, {
  SelectCounselorList,
  SelectSchoolList,
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

type CreateTeacherFormProps = {
  defaultTeacher?: Teacher;
  onSubmit: (teacher: Teacher) => void;
  onCancel: () => void;
};

const CreateTeacherForm: React.FC<CreateTeacherFormProps> = ({
  defaultTeacher = emptyTeacher,
  onSubmit,
  onCancel,
}) => {
  const [teacher, setTeacher] = useState<Teacher>(
    defaultTeacher ?? emptyTeacher
  );
  const [counselorSelectionIndex, setCounselorSelectionIndex] =
    useState<number>(-1);
  const [schoolSelectionIndex, setSchoolSelectionIndex] = useState<number>(-1);
  const { data: schools } = useContext<ContextData<School>>(SchoolsContext);
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);

  useEffect(() => {
    if (defaultTeacher) {
      setTeacher(defaultTeacher);
      const selectedSchool = schools.find(
        school => school.id === defaultTeacher.studentAssignedSchoolId
      );
      const defaultSchoolSelectionIndex = selectedSchool
        ? schools.indexOf(selectedSchool)
        : -1;
      setSchoolSelectionIndex(defaultSchoolSelectionIndex);
      const selectedCounselor = counselors.find(
        counselor => counselor.id === defaultTeacher.studentAssignedCounselorId
      );
      const defaultCounselorSelectionIndex = selectedCounselor
        ? counselors
            .map(counselor => counselor.id)
            .indexOf(selectedCounselor.id)
        : -1;
      setCounselorSelectionIndex(defaultCounselorSelectionIndex);
    }
  }, [counselors, defaultTeacher, schools]);

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelectionIndex(counselors.indexOf(counselor));
    const newTeacher = { ...teacher };
    newTeacher.studentAssignedCounselorId = counselor.id;
    setTeacher(newTeacher);
  };

  const onSchoolChanged = (school: School) => {
    setSchoolSelectionIndex(schools.indexOf(school));
    const newTeacher = { ...teacher };
    newTeacher.studentAssignedSchoolId = school.id;
    setTeacher(newTeacher);
  };

  const onTimeZoneChanged = (timeZone: string) => {
    setTeacher({ ...teacher, timeZoneIanaName: timeZone });
  };

  const onStatusChanged = (status: string) => {
    setTeacher({ ...teacher, studentStatus: status as StudentStatus });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedTeacher = defaultTeacher
      ? teacher
      : { ...teacher, id: `-1` };
    submittedTeacher.role = 'TEACHER' as Role;
    onSubmit(submittedTeacher);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setSchoolSelectionIndex(-1);
    setTeacher(emptyTeacher);
    onCancel();
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Label>
        First Name:
        <Input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={teacher.firstName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTeacher({ ...teacher, firstName: e.target.value });
          }}
        />
      </Label>
      <Label>
        Last Name:
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={teacher.lastName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTeacher({ ...teacher, lastName: e.target.value });
          }}
        />
      </Label>
      <Label>
        Email:
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={teacher.email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTeacher({ ...teacher, email: e.target.value })
          }
        />
      </Label>
      <Label>
        Username:
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={teacher.username}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTeacher({ ...teacher, username: e.target.value });
          }}
        />
      </Label>
      <Label>
        Phone:
        <Input
          type="phone"
          placeholder="Phone"
          name="phone"
          value={teacher.phone}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTeacher({ ...teacher, phone: e.target.value });
          }}
        />
      </Label>
      <Label>
        Docs URL:
        <Input
          type="URL"
          placeholder="Docs URL"
          name="docsUrl"
          value={teacher.docsUrl}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTeacher({ ...teacher, docsUrl: e.target.value });
          }}
        />
      </Label>
      <Label>
        Counselor:{' '}
        <SelectCounselorList
          selectedIndex={counselorSelectionIndex}
          onCounselorChanged={onCounselorChanged}
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
        Time Zone:{' '}
        <SelectList
          labelText="Select a Time Zone"
          items={TIME_ZONES}
          value={TIME_ZONES.indexOf(teacher.timeZoneIanaName || '')}
          onItemChanged={item => {
            return onTimeZoneChanged(
              TIME_ZONES[parseInt(item)] as AvailableTimeZone
            );
          }}
        />
      </Label>
      <Label>
        Status:{' '}
        <SelectList
          labelText="Select a Status"
          items={['ACTIVE', 'DISCHARGED', 'DELETED']}
          value={['ACTIVE', 'DISCHARGED', 'DELETED'].indexOf(
            teacher.studentStatus || ''
          )}
          onItemChanged={item => {
            return onStatusChanged(
              ['ACTIVE', 'DISCHARGED', 'DELETED'][parseInt(item)]
            );
          }}
        />
      </Label>

      <Button type="submit">Submit</Button>
      <Button type="button" onClick={onFormCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default CreateTeacherForm;
