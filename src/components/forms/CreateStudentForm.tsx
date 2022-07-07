// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useEffect,
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
  };

  const onSchoolChanged = (school: School) => {
    setSchoolSelection(school);
  };

  // update the student whenever counselor or school selection is changed
  useEffect(() => {
    setStudent(prevStudent => {
      return {
        ...prevStudent,
        counselorId: counselorSelection._id,
        schoolId: schoolSelection._id,
      };
    });
  }, [counselorSelection, schoolSelection]);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...student, _id: students.length });
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
          value={defaultStudent.counselorId}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        School:{' '}
        <SelectSchoolList
          value={defaultStudent.schoolId}
          onSchoolChanged={onSchoolChanged}
        />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CreateStudentForm;
