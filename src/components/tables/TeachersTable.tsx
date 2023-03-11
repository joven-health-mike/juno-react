// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import styled from 'styled-components';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { getCounselors } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { getActiveTeachers, Teacher } from '../../data/teachers';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import XButton from '../buttons/XButton';
import StudentDetails from '../details/StudentDetails';
import { buttonStyles } from '../styles/mixins';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

const Button = styled.button`
  ${buttonStyles}
`;

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

  const getTeacherFromTableTeacher = useCallback(
    (tableTeacher: TableTeacher): Teacher => {
      return teachers.find(
        teacher => teacher.id === tableTeacher.id
      ) as Teacher;
    },
    [teachers]
  );

  const getButtonCell = useCallback(
    (tableTeacher: TableTeacher, row: Row) => {
      const student = getTeacherFromTableTeacher(tableTeacher);
      if (!student) return <></>;

      return (
        <>
          {isDeleteTeacherAllowed && (
            <XButton
              text="❌"
              title="Delete Teacher"
              value={student.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onDeleteClicked(student);
              }}
            />
          )}
          {isUpdateTeacherAllowed && (
            <XButton
              text="✏️"
              title="Edit Teacher"
              value={student.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onEditClicked(student);
              }}
            />
          )}
          <XButton
            text="📅"
            title="Schedule Appointment"
            value={student.id}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onAppointmentClicked(student);
            }}
          />
          <XButton
            text="📁"
            title={`Open ${student.firstName}'s File`}
            value={student.id}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onOpenFileClicked(student);
            }}
          />
          <Button {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </Button>
        </>
      );
    },
    [
      getTeacherFromTableTeacher,
      isDeleteTeacherAllowed,
      isUpdateTeacherAllowed,
      onAppointmentClicked,
      onDeleteClicked,
      onEditClicked,
      onOpenFileClicked,
    ]
  );

  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns: Column[] = React.useMemo(
    () => [
      {
        id: 'buttons',
        Cell: ({ cell, row }: CellProps<object>) => {
          const student = cell.row.original as TableTeacher;
          return getButtonCell(student, row);
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'School',
        accessor: 'schoolName',
      },
      {
        Header: 'Counselor',
        accessor: 'counselorName',
      },
    ],
    [getButtonCell]
  );

  const renderRowSubComponent = useCallback(
    (row: Row) => {
      const tableTeacher = row.original as TableTeacher;
      const teacher = getTeacherFromTableTeacher(tableTeacher);
      if (typeof teacher === 'undefined') return <></>;
      return <StudentDetails student={teacher} />;
    },
    [getTeacherFromTableTeacher]
  );

  return (
    <DataTable
      data={tableTeachers}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

export default TeachersTable;
