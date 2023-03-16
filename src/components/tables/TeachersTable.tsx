// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { getCounselors } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { getActiveTeachers, Teacher } from '../../data/teachers';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import StudentDetails from '../details/StudentDetails';
import MaterialTable from './MaterialTable';

type TeachersTableProps = {
  onDeleteClicked: (student: Teacher) => void;
  onEditClicked: (student: Teacher) => void;
  onAppointmentClicked: (student: Teacher) => void;
  onOpenFileClicked: (student: Teacher) => void;
};

export type TableTeacher = {
  id: string;
  name: string;
  schoolName: string;
  counselorName: string;
};

const TeachersTable: React.FC<TeachersTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onAppointmentClicked,
  onOpenFileClicked,
}) => {
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const teachers = useMemo(() => getActiveTeachers(users), [users]);
  const { data: schools } = useContext(SchoolsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isDeleteTeacherAllowed, setIsDeleteTeacherAllowed] =
    useState<boolean>(false);
  const [isUpdateTeacherAllowed, setIsUpdateTeacherAllowed] =
    useState<boolean>(false);
  const [tableTeachers, setTableTeachers] = useState<TableTeacher[]>([]);

  useEffect(() => {
    setIsDeleteTeacherAllowed(deletePermission(loggedInUser.role, 'teacher'));
    setIsUpdateTeacherAllowed(updatePermission(loggedInUser.role, 'teacher'));
  }, [loggedInUser.role]);

  useEffect(() => {
    const mappedTeachers = teachers.map(teacher => {
      const schoolName = schools.find(
        school => school.id === teacher.studentAssignedSchoolId
      )?.name;
      const counselor = counselors.find(
        counselor => counselor.id === teacher.studentAssignedCounselorId
      );
      const counselorName = `${counselor?.firstName} ${counselor?.lastName}`;

      return {
        id: teacher.id,
        name: `${teacher.firstName} ${teacher.lastName}`,
        schoolName: schoolName,
        counselorName: counselorName,
      } as TableTeacher;
    });

    setTableTeachers(mappedTeachers);
  }, [counselors, schools, teachers]);

  const createTableData = (students: TableTeacher[]) => {
    const tableData: string[][] = [];

    students.forEach(student => {
      tableData.push([
        student.id,
        student.name,
        student.schoolName,
        student.counselorName,
      ]);
    });

    return tableData;
  };

  const onDeleteRow = isDeleteTeacherAllowed
    ? (id: string) => {
        const teacher = teachers.find(teacher => teacher.id === id);
        onDeleteClicked(teacher!);
      }
    : undefined;

  const onEditRow = isUpdateTeacherAllowed
    ? (id: string) => {
        const teacher = teachers.find(teacher => teacher.id === id);
        onEditClicked(teacher!);
      }
    : undefined;

  const onAppointmentRow = (id: string) => {
    const teacher = teachers.find(teacher => teacher.id === id);
    onAppointmentClicked(teacher!);
  };

  const onFolderRow = (id: string) => {
    const teacher = teachers.find(teacher => teacher.id === id);
    onOpenFileClicked(teacher!);
  };

  const getExpandComponent = (id: string) => {
    const teacher = teachers.find(teacher => teacher.id === id);
    if (typeof teacher === 'undefined') return <></>;
    return <StudentDetails student={teacher!} />;
  };

  return (
    <MaterialTable
      rows={createTableData(tableTeachers)}
      columnHeaders={['id', 'Name', 'School', 'Counselor']}
      hideColumnIndexes={[0]}
      tableButtonInfo={{
        onDeleteRow,
        onEditRow,
        onAppointmentRow,
        onFolderRow,
      }}
      getExpandComponent={getExpandComponent}
    />
  );
};

export default TeachersTable;
