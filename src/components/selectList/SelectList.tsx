import React, { ChangeEvent, useContext } from 'react';
import {
  Counselor,
  CounselorsContext,
  emptyCounselor,
} from '../../data/counselors';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import { emptyStudent, Student, StudentsContext } from '../../data/students';

type SelectListProps = {
  labelText: string;
  value: string;
  items: string[];
  selectedIndex?: number;
  onItemChanged: (item: string) => void;
};

const SelectList = ({
  labelText,
  value,
  items,
  selectedIndex = -1,
  onItemChanged,
}: SelectListProps) => {
  const itemChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const item = e.target.value === labelText ? '' : e.target.value;
    onItemChanged(item);
  };

  return (
    <select value={value} onChange={itemChanged}>
      <option key={labelText}>{labelText}</option>
      {items.map((item, index) => {
        return (
          <option key={index} selected={index === selectedIndex}>
            {' '}
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default SelectList;

type SelectCounselorListProps = {
  value: string;
  selectedCounselor?: Counselor;
  onCounselorChanged: (counselor: Counselor) => void;
};

export function SelectCounselorList({
  value,
  selectedCounselor,
  onCounselorChanged,
}: SelectCounselorListProps) {
  const { counselors } = useContext(CounselorsContext);
  const counselorNames = counselors.map(counselor => counselor.name);

  const handleCounselorChange = (counselorName: string) => {
    const counselor = counselors.find(
      counselor => counselor.name === counselorName
    );
    onCounselorChanged(counselor ?? emptyCounselor);
  };

  const getSelectedIndex = () => {
    if (selectedCounselor) {
      return counselors.findIndex(counselor => {
        return counselor === selectedCounselor;
      });
    }
    return -1;
  };

  return (
    <>
      <SelectList
        labelText={'Select a Counselor'}
        items={counselorNames}
        value={value}
        selectedIndex={getSelectedIndex()}
        onItemChanged={handleCounselorChange}
      />
    </>
  );
}

type SelectSchoolListProps = {
  value: string;
  onSchoolChanged: (school: School) => void;
};

export function SelectSchoolList({
  value,
  onSchoolChanged,
}: SelectSchoolListProps) {
  const { schools } = useContext(SchoolsContext);
  const schoolNames = schools.map(school => school.name);

  const handleSchoolChange = (schoolName: string) => {
    const school = schools.find(school => school.name === schoolName);
    onSchoolChanged(school ?? emptySchool);
  };

  return (
    <>
      <SelectList
        labelText={'Select a School'}
        items={schoolNames}
        value={value}
        onItemChanged={handleSchoolChange}
      />
    </>
  );
}

type SelectStudentListProps = {
  value: string;
  onStudentChanged: (student: Student) => void;
};

export function SelectStudentList({
  value,
  onStudentChanged,
}: SelectStudentListProps) {
  const { students } = useContext(StudentsContext);
  const studentNames = students.map(
    student => student.first_name + ' ' + student.last_name
  );

  const handleStudentChange = (studentName: string) => {
    const student = students.find(
      student => student.first_name + ' ' + student.last_name === studentName
    );
    onStudentChanged(student ?? emptyStudent);
  };

  return (
    <SelectList
      labelText={'Select a Student'}
      items={studentNames}
      value={value}
      onItemChanged={handleStudentChange}
    />
  );
}
