// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { emptySchool, School } from '../../data/schools';
import {
  emptyStudent,
  IStudentsContext,
  Student,
  StudentsContext,
} from '../../data/students';
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
  const [counselorSelection, setCounselorSelection] =
    useState<Counselor>(emptyCounselor);
  const [schoolSelection, setSchoolSelection] = useState<School>(emptySchool);
  const { students } = useContext<IStudentsContext>(StudentsContext);

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelection(counselor);
    setStudent({ ...student, counselorId: counselor._id });
  };

  const onSchoolChanged = (school: School) => {
    setSchoolSelection(school);
    setStudent({ ...student, schoolId: school._id });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedStudent = defaultStudent
      ? student
      : { ...student, _id: students.length };
    onSubmit(submittedStudent);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setCounselorSelection(emptyCounselor);
    setSchoolSelection(emptySchool);
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
          value={student.first_name}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStudent({ ...student, first_name: e.target.value })
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
          value={student.last_name}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStudent({ ...student, last_name: e.target.value })
          }
        />
      </label>
      <label>
        Counselor:{' '}
        <SelectCounselorList
          value={counselorSelection._id}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        School:{' '}
        <SelectSchoolList
          value={schoolSelection._id}
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
