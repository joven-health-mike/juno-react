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
import { ContextData } from '../../data/ContextData';
import { Counselor, CounselorsContext } from '../../data/counselors';
import { School, SchoolsContext } from '../../data/schools';
import { emptyStudent, Student, StudentStatus } from '../../data/students';
import { AvailableTimeZone, TIME_ZONES } from '../../utils/DateUtils';
import SelectList, {
  SelectCounselorList,
  SelectSchoolList,
} from '../selectList/SelectList';
import { buttonStyles, formStyles } from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

const Form = styled.form`
  ${formStyles}
`;

type CreateStudentFormProps = {
  defaultStudent?: Student;
  onSubmit: (student: Student) => void;
  onCancel: () => void;
};

const CreateStudentForm: React.FC<CreateStudentFormProps> = ({
  defaultStudent = emptyStudent,
  onSubmit,
  onCancel,
}) => {
  const [student, setStudent] = useState<Student>(
    defaultStudent ?? emptyStudent
  );
  const [counselorSelectionIndex, setCounselorSelectionIndex] =
    useState<number>(-1);
  const [schoolSelectionIndex, setSchoolSelectionIndex] = useState<number>(-1);
  const { data: schools } = useContext<ContextData<School>>(SchoolsContext);
  const { data: counselors } =
    useContext<ContextData<Counselor>>(CounselorsContext);

  useEffect(() => {
    if (defaultStudent) {
      setStudent(defaultStudent);
      const selectedSchool = schools.find(
        school => school.id === defaultStudent.studentAssignedSchoolId
      );
      const defaultSchoolSelectionIndex = selectedSchool
        ? schools.indexOf(selectedSchool)
        : -1;
      setSchoolSelectionIndex(defaultSchoolSelectionIndex);
      const selectedCounselor = counselors.find(
        counselor => counselor.id === defaultStudent.studentAssignedCounselorId
      );
      const defaultCounselorSelectionIndex = selectedCounselor
        ? counselors
            .map(counselor => counselor.id)
            .indexOf(selectedCounselor.id)
        : -1;
      setCounselorSelectionIndex(defaultCounselorSelectionIndex);
    }
  }, [counselors, defaultStudent, schools]);

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelectionIndex(counselors.indexOf(counselor));
    const newStudent = { ...student };
    newStudent.studentAssignedCounselorId = counselor.id;
    setStudent(newStudent);
  };

  const onSchoolChanged = (school: School) => {
    setSchoolSelectionIndex(schools.indexOf(school));
    const newStudent = { ...student };
    newStudent.studentAssignedSchoolId = school.id;
    setStudent(newStudent);
  };

  const onTimeZoneChanged = (timeZone: string) => {
    setStudent({ ...student, timeZoneIanaName: timeZone });
  };

  const onStatusChanged = (status: string) => {
    setStudent({ ...student, studentStatus: status as StudentStatus });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedStudent = defaultStudent
      ? student
      : { ...student, id: `-1` };
    onSubmit(submittedStudent);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setSchoolSelectionIndex(-1);
    setStudent(emptyStudent);
    onCancel();
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <label>
        First Name:
        <input
          data-testid={'input-first-name'}
          type="text"
          placeholder="First Name"
          name="firstName"
          value={student.firstName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStudent({ ...student, firstName: e.target.value });
          }}
        />
      </label>
      <label>
        Last Name:
        <input
          data-testid={'input-last-name'}
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={student.lastName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStudent({ ...student, lastName: e.target.value });
          }}
        />
      </label>
      <label>
        Email:
        <input
          data-testid={'input-email'}
          type="email"
          placeholder="Email"
          name="email"
          value={student.email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStudent({ ...student, email: e.target.value })
          }
        />
      </label>
      <label>
        Username:
        <input
          data-testid={'input-username'}
          type="text"
          placeholder="Username"
          name="username"
          value={student.username}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStudent({ ...student, username: e.target.value });
          }}
        />
      </label>
      <label>
        Phone:
        <input
          data-testid={'input-phone'}
          type="phone"
          placeholder="Phone"
          name="phone"
          value={student.phone}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStudent({ ...student, phone: e.target.value });
          }}
        />
      </label>
      <label>
        Docs URL:
        <input
          data-testid={'input-docsUrl'}
          type="URL"
          placeholder="Docs URL"
          name="docsUrl"
          value={student.docsUrl}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStudent({ ...student, docsUrl: e.target.value });
          }}
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
        School:{' '}
        <SelectSchoolList
          selectedIndex={schoolSelectionIndex}
          onSchoolChanged={onSchoolChanged}
        />
      </label>
      <label>
        Time Zone:{' '}
        <SelectList
          labelText="Select a Time Zone"
          items={TIME_ZONES}
          value={TIME_ZONES.indexOf(student.timeZoneIanaName || '')}
          onItemChanged={item => {
            return onTimeZoneChanged(
              TIME_ZONES[parseInt(item)] as AvailableTimeZone
            );
          }}
        />
      </label>
      <label>
        Status:{' '}
        <SelectList
          labelText="Select a Status"
          items={['ACTIVE', 'DISCHARGED', 'DELETED']}
          value={['ACTIVE', 'DISCHARGED', 'DELETED'].indexOf(
            student.studentStatus || ''
          )}
          onItemChanged={item => {
            return onStatusChanged(
              ['ACTIVE', 'DISCHARGED', 'DELETED'][parseInt(item)]
            );
          }}
        />
      </label>

      <Button type="submit" data-testid="button-submit">
        Submit
      </Button>
      <Button type="button" data-testid="button-cancel" onClick={onFormCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default CreateStudentForm;
