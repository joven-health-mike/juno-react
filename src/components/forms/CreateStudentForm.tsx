// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import { ContextData } from '../../data/ContextData';
import { Counselor, CounselorsContext } from '../../data/counselors';
import { School, SchoolsContext } from '../../data/schools';
import { emptyStudent, Student, StudentsContext } from '../../data/students';
import {
  SelectCounselorList,
  SelectSchoolList,
} from '../selectList/SelectList';

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
  const { data: students } = useContext<ContextData<Student>>(StudentsContext);
  const { data: schools } = useContext<ContextData<School>>(SchoolsContext);
  const { data: counselors } =
    useContext<ContextData<Counselor>>(CounselorsContext);

  const getDefaultSchoolSelectionIndex = () => {
    const selectedSchool = schools.find(
      school => school.id === defaultStudent.studentRef.schoolId
    );
    return selectedSchool ? schools.indexOf(selectedSchool) : -1;
  };
  const defaultSchoolSelectionIndex = getDefaultSchoolSelectionIndex();
  const [schoolSelectionIndex, setSchoolSelectionIndex] = useState(
    defaultSchoolSelectionIndex
  );

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelectionIndex(counselors.indexOf(counselor));
    // TODO: use update method on users.
    // setStudent({ ...student.counselorRef, counselorId: counselor.id });
  };

  const onSchoolChanged = (school: School) => {
    setSchoolSelectionIndex(schools.indexOf(school));
    // TODO: use update method on users
    // setStudent({ ...student, schoolId: school.id });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedStudent = defaultStudent
      ? student
      : { ...student, _id: `${students.length}` };
    onSubmit(submittedStudent);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setSchoolSelectionIndex(-1);
    setStudent(emptyStudent);
    onCancel();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        First Name
        <input
          data-testid="firstName"
          type="text"
          placeholder="First Name"
          name="first_name"
          value={student.firstName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStudent({ ...student, firstName: e.target.value })
          }
        />
      </label>
      <label>
        Last Name
        <input
          data-testid="lastName"
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={student.lastName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStudent({ ...student, lastName: e.target.value })
          }
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
        School:{' '}
        <SelectSchoolList
          selectedIndex={schoolSelectionIndex}
          onSchoolChanged={onSchoolChanged}
        />
      </label>

      <button type="submit" data-testid="button-submit">
        Submit
      </button>
      <button type="button" data-testid="button-cancel" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CreateStudentForm;
