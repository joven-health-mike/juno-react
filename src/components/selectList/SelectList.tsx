import React, { useContext } from 'react';
import {
  AppointmentType,
  AppointmentTypes,
  getAppointmentTypeById,
} from '../../data/appointments';
import {
  Counselor,
  CounselorsContext,
  emptyCounselor,
} from '../../data/counselors';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import { emptyStudent, Student, StudentsContext } from '../../data/students';

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
  const itemChanged = (value: string) => {
    console.log('item changed: ' + value);
    onItemChanged(value);
  };

  return (
    <select value={value} onChange={e => itemChanged(e.target.value)}>
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

  const handleCounselorChange = (counselorId: string) => {
    const counselor = counselors.find(
      counselor => counselor._id === +counselorId
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
  selectedIndex: number;
  onSchoolChanged: (school: School) => void;
};

export function SelectSchoolList({
  selectedIndex,
  onSchoolChanged,
}: SelectSchoolListProps) {
  const { data: schools } = useContext(SchoolsContext);
  const schoolNames = schools.map(school => school.name);

  const handleSchoolChange = (schoolIndex: string) => {
    const school = schools[parseInt(schoolIndex)];
    onSchoolChanged(school ?? emptySchool);
  };

  return (
    <>
      <SelectList
        labelText={'Select a School'}
        items={schoolNames}
        value={selectedIndex}
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

  const handleStudentChange = (studentId: string) => {
    const student = students.find(student => student._id === +studentId);
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
  value: number;
  onTypeChanged: (type: AppointmentType) => void;
};

export function SelectTypeList({ value, onTypeChanged }: SelectTypeListProps) {
  const typeNames = Object.keys(AppointmentTypes);

  const handleTypeChange = (typeId: string) => {
    onTypeChanged(getAppointmentTypeById(+typeId));
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
