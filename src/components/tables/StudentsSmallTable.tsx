// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { CellProps, Column } from 'react-table';
import { Student } from '../../data/students';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type StudentsSmallTableProps = {
  students: Student[];
};

const StudentsSmallTable: React.FC<StudentsSmallTableProps> = ({
  students,
}) => {
  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns: Column[] = React.useMemo(
    () => [
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
    [students]
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
