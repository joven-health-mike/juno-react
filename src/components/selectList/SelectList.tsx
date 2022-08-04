import React, { ChangeEvent, useContext } from 'react';
import {
  Counselor,
  CounselorsContext,
  emptyCounselor,
} from '../../data/counselors';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import { emptyStudent, Student, StudentsContext } from '../../data/students';
import { appointmentColors } from '../calendar/appointmentTypes';

type SelectListProps = {
  labelText: string;
  value: number;
  items: string[];
  onItemChanged: (item: string) => void;
};

const SelectList = ({
  labelText,
  value,
  items,
  onItemChanged,
}: SelectListProps) => {
  const itemChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const item = e.target.value === labelText ? '' : e.target.value;
    onItemChanged(item);
  };

  return (
    <select value={value} onChange={itemChanged}>
      <option value={-1} key={labelText}>
        {labelText}
      </option>
      {items.map((item, index) => {
        return (
          <option value={index} key={index}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default SelectList;

type SelectCounselorListProps = {
  value: number;
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

  return (
    <>
      <SelectList
        labelText={'Select a Counselor'}
        items={counselorNames}
        value={value}
        onItemChanged={handleCounselorChange}
      />
    </>
  );
}

type SelectSchoolListProps = {
  value: number;
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
  value: number;
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

type SelectTypeListProps = {
  value: string;
  onTypeChanged: (type: string) => void;
};

export function SelectTypeList({ value, onTypeChanged }: SelectTypeListProps) {
  const typeNames = Object.keys(appointmentColors);

  const handleTypeChange = (typeName: string) => {
    onTypeChanged(typeName);
  };

  return (
    <SelectList
      labelText={'Select Appointment Type'}
      items={typeNames}
      value={value}
      onItemChanged={handleTypeChange}
    />
  );
}
