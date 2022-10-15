// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useContext } from 'react';
import { CellProps, Column } from 'react-table';
import { Student, StudentsContext } from '../../data/students';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type StudentsSmallTableProps = {
  onDeleteClicked: (student: Student) => void;
  onAppointmentClicked: (student: Student) => void;
};

const StudentsSmallTable: React.FC<StudentsSmallTableProps> = ({
  onDeleteClicked,
  onAppointmentClicked,
}) => {
  const { data: students } = useContext(StudentsContext);

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
          const student = cell.row.original as Student;

          return (
            <>
              <XButton
                text="❌"
                title="Delete Student"
                value={student.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onDeleteClicked(student);
                }}
              />
              <XButton
                text="📅"
                title="Schedule Appointment"
                value={student.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onAppointmentClicked(student);
                }}
              />
            </>
          );
        },
      },
      {
        Header: 'Name',
        accessor: 'id',
        Cell: ({ cell }: CellProps<object>) => (
          <p>
            {(() => {
              const foundStudent = students.find(
                student => student.id === (cell.row.original as Student).id
              );
              return (
                <>
                  {foundStudent
                    ? `${foundStudent.firstName} ${foundStudent.lastName}`
                    : 'Not Found'}
                </>
              );
            })()}
          </p>
        ),
      },
    ],
    [onAppointmentClicked, onDeleteClicked, students]
  );

  return (
    <DataTable
      data={students}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  );
};

export default StudentsSmallTable;
