// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { getCounselors } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { getActiveStudents, Student } from '../../data/students';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import StudentDetails from '../details/StudentDetails';
import MaterialTable from './MaterialTable';
import { TableStudentSmall } from './StudentsSmallTable';

type StudentsTableProps = {
  onDeleteClicked: (student: Student) => void;
  onEditClicked: (student: Student) => void;
  onAppointmentClicked: (student: Student) => void;
  onOpenFileClicked: (student: Student) => void;
};

export type TableStudent = TableStudentSmall & {
  schoolName: string;
  counselorName: string;
};

const StudentsTable: React.FC<StudentsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onAppointmentClicked,
  onOpenFileClicked,
}) => {
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const students = useMemo(() => getActiveStudents(users), [users]);
  const { data: schools } = useContext(SchoolsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isDeleteStudentAllowed, setIsDeleteStudentAllowed] =
    useState<boolean>(false);
  const [isUpdateStudentAllowed, setIsUpdateStudentAllowed] =
    useState<boolean>(false);
  const [tableStudents, setTableStudents] = useState<TableStudent[]>([]);

  useEffect(() => {
    setIsDeleteStudentAllowed(deletePermission(loggedInUser.role, 'student'));
    setIsUpdateStudentAllowed(updatePermission(loggedInUser.role, 'student'));
  }, [loggedInUser.role]);

  useEffect(() => {
    const mappedStudents = students.map(student => {
      const schoolName = schools.find(
        school => school.id === student.studentAssignedSchoolId
      )?.name;
      const counselor = counselors.find(
        counselor => counselor.id === student.studentAssignedCounselorId
      );
      const counselorName = `${counselor?.firstName} ${counselor?.lastName}`;

      return {
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
        schoolName: schoolName,
        counselorName: counselorName,
      } as TableStudent;
    });

    setTableStudents(mappedStudents);
  }, [counselors, students, schools]);

  const createTableData = (students: TableStudent[]) => {
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

  const onDeleteRow = isDeleteStudentAllowed
    ? (id: string) => {
        const student = students.find(student => student.id === id);
        onDeleteClicked(student!);
      }
    : undefined;

  const onEditRow = isUpdateStudentAllowed
    ? (id: string) => {
        const student = students.find(student => student.id === id);
        onEditClicked(student!);
      }
    : undefined;

  const onAppointmentRow = (id: string) => {
    const student = students.find(student => student.id === id);
    onAppointmentClicked(student!);
  };

  const onFolderRow = (id: string) => {
    const student = students.find(student => student.id === id);
    onOpenFileClicked(student!);
  };

  const getExpandComponent = (id: string) => {
    const student = students.find(student => student.id === id);
    if (typeof student === 'undefined') return <></>;
    return <StudentDetails student={student!} />;
  };

  return (
    <MaterialTable
      rows={createTableData(tableStudents)}
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

export default StudentsTable;
