import React, { useContext } from 'react';
import { CounselorsContext, emptyCounselor } from '../../data/counselors';
import { emptySchool, SchoolsContext } from '../../data/schools';
import { emptyStudent, StudentsContext } from '../../data/students';

type SelectListProps = {
  labelText: string;
  value: any;
  items: any[];
  onItemChanged: any;
};

const SelectList = ({
  labelText,
  value,
  items,
  onItemChanged,
}: SelectListProps) => {
  const itemChanged = (e: any) => {
    e.preventDefault();
    const item = e.target.value === labelText ? '' : e.target.value;
    onItemChanged(item);
  };

  return (
    <select value={value} onChange={itemChanged}>
      <option key={labelText}>{labelText}</option>
      {items.map((item, index) => {
        return <option key={index}>{item}</option>;
      })}
    </select>
  );
};

export default SelectList;

type SelectCounselorListProps = {
  value: any;
  onCounselorChanged: any;
};

export function SelectCounselorList({
  value,
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
  value: any;
  onSchoolChanged: any;
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
  value: any;
  onStudentChanged: any;
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
