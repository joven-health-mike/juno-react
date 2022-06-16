// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent } from 'react';
import { CellProps, Column } from 'react-table';
import { Appointment } from '../../data/appointments';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type AppointmentsTableProps = {
  appointments: Appointment[];
  onDeleteClicked: (item: string) => void;
};

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  onDeleteClicked,
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
        Header: ' ',
        Cell: ({ cell }: CellProps<object>) => (
          <XButton
            value={cell.row.values.title}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onDeleteClicked((e.target as HTMLInputElement).value);
            }}
          />
        ),
      },
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Start',
        accessor: 'start',
        Cell: ({ cell }: CellProps<object>) => (
          <p>{cell.row.values.start.toISOString()}</p>
        ),
      },
      {
        Header: 'End',
        accessor: 'end',
        Cell: ({ cell }: CellProps<object>) => (
          <p>{cell.row.values.end.toISOString()}</p>
        ),
      },
      {
        Header: 'Counselor ID',
        accessor: 'counselorId',
      },
      {
        Header: 'Student ID',
        accessor: 'studentId',
      },
    ],
    [onDeleteClicked]
  );

  return (
    <DataTable
      data={appointments}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  );
};

export default AppointmentsTable;
