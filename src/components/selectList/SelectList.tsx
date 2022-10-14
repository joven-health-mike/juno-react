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
import { emptyUser, User, UsersContext } from '../../data/users';

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

type SelectMultipleListProps = {
  labelText: string;
  items: string[];
  onItemsSelected: (items: string[]) => void;
};

export const SelectMultipleList = ({
  labelText,
  items,
  onItemsSelected,
}: SelectMultipleListProps) => {
  const itemsChanged = (e: any) => {
    const selectedItems: string[] = [...e.target.options]
      .filter(o => o.selected)
      .map(o => o.value);
    onItemsSelected(selectedItems);
  };

  return (
    <select multiple onChange={itemsChanged}>
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

type SelectCounselorListProps = {
  selectedIndex: number;
  onCounselorChanged: (counselor: Counselor) => void;
};

export function SelectCounselorList({
  selectedIndex,
  onCounselorChanged,
}: SelectCounselorListProps) {
  const { data: counselors } = useContext(CounselorsContext);
  const counselorNames = counselors.map(
    counselor => `${counselor.firstName} ${counselor.lastName}`
  );

  const handleCounselorChange = (counselorIndex: string) => {
    const counselor = counselors[parseInt(counselorIndex)];
    onCounselorChanged(counselor ?? emptyCounselor);
  };

  return (
    <>
      <SelectList
        labelText={'Select a Counselor'}
        items={counselorNames}
        value={selectedIndex}
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
  const { data: students } = useContext(StudentsContext);
  const studentNames = students.map(
    student => `${student.firstName} ${student.lastName}`
  );

  const handleStudentChange = (studentId: string) => {
    const student = students.find(student => student.id === studentId);
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

type SelectUserListProps = {
  onUsersChanged: (users: User[]) => void;
};

export function SelectUserList({ onUsersChanged }: SelectUserListProps) {
  const { data: users } = useContext(UsersContext);
  const userNameFormat = (user: User) =>
    `${user.firstName} ${user.lastName} (${user.role})`;
  const userNames = users.map(user => userNameFormat(user));

  const onItemsSelected = (selectedItems: string[]) => {
    const selectedUsers = selectedItems.map(indexStr => {
      const userName = userNames[parseInt(indexStr)];
      const foundUser = users.find(user => userNameFormat(user) === userName);
      return foundUser || emptyUser;
    });
    onUsersChanged(selectedUsers);
  };

  return (
    <SelectMultipleList
      labelText={'Select Users'}
      items={userNames}
      onItemsSelected={onItemsSelected}
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
