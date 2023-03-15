import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { AppointmentType, APPOINTMENT_TYPES } from '../../data/appointments';
import {
  Counselor,
  emptyCounselor,
  getCounselors,
} from '../../data/counselors';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import { emptyStudent, getActiveStudents, Student } from '../../data/students';
import {
  emptyUser,
  LoggedInUserContext,
  User,
  UsersContext,
} from '../../data/users';
import { selectStyles } from '../styles/mixins';

const Select = styled.select`
  ${selectStyles}
`;

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
    <Select value={value} onChange={e => itemChanged(e.target.value)}>
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
    </Select>
  );
};

export default SelectList;

type SelectMultipleListProps = {
  labelText: string;
  items: string[];
  selectedItems: string[];
  onItemsSelected: (items: string[]) => void;
};

export const SelectMultipleList = ({
  labelText,
  items,
  selectedItems,
  onItemsSelected,
}: SelectMultipleListProps) => {
  const itemsChanged = (e: any) => {
    const newItemsSelected: string[] = [...e.target.options]
      .filter(o => o.selected)
      .map(o => o.value);
    onItemsSelected(newItemsSelected);
  };

  return (
    <Select multiple onChange={itemsChanged}>
      <option value={-1} key={labelText}>
        {labelText}
      </option>
      {items.map((item, index) => {
        const selected = selectedItems.includes(item);
        if (selected) {
          return (
            <option value={index} key={index} selected>
              {item}
            </option>
          );
        } else {
          return (
            <option value={index} key={index}>
              {item}
            </option>
          );
        }
      })}
    </Select>
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
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
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

type SelectMultipleSchoolListProps = {
  selectedSchools: School[];
  onSchoolsChanged: (schools: School[]) => void;
};

export function SelectMultipleSchoolList({
  selectedSchools,
  onSchoolsChanged,
}: SelectMultipleSchoolListProps) {
  const { data: schools } = useContext(SchoolsContext);
  const schoolNames = schools.map(school => school.name);
  const selectedSchoolNames = selectedSchools.map(school => school.name);

  const onItemsSelected = (selectedItems: string[]) => {
    const selectedSchools = selectedItems.map(indexStr => {
      const schoolName = schoolNames[parseInt(indexStr)];
      const foundSchool = schools.find(school => school.name === schoolName);
      return foundSchool || emptySchool;
    });
    onSchoolsChanged(selectedSchools);
  };

  return (
    <SelectMultipleList
      selectedItems={selectedSchoolNames}
      labelText={'Select Schools'}
      items={schoolNames}
      onItemsSelected={onItemsSelected}
    />
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
  const { data: users } = useContext(UsersContext);
  const students = useMemo(() => getActiveStudents(users), [users]);
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
  users: User[];
  selectedUsers: User[];
  onUsersChanged: (users: User[]) => void;
};

export function SelectUserList({
  users,
  selectedUsers,
  onUsersChanged,
}: SelectUserListProps) {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const userNameFormat = (user: User) =>
    `${user.firstName} ${user.lastName} (${user.role})`;
  const userListFilter =
    loggedInUser.role !== 'SYSADMIN'
      ? (user: User) => user.id !== loggedInUser.id
      : () => true;
  const userNames = users
    .filter(userListFilter)
    .map(user => userNameFormat(user));
  const selectedUserNames = selectedUsers.map(user => userNameFormat(user));

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
      selectedItems={selectedUserNames}
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
  const handleTypeChange = (type: string) => {
    onTypeChanged(type as AppointmentType);
  };

  return (
    <SelectList
      labelText={'Select Appointment Type'}
      items={APPOINTMENT_TYPES}
      value={value}
      onItemChanged={handleTypeChange}
    />
  );
}
