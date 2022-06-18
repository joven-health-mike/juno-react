// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { Appointment } from '../../data/appointments';
import XButton from '../buttons/XButton';
import AppointmentDetails from '../details/AppointmentDetails';
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
        id: 'expander',
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <button {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </button>
        ),
        Cell: ({ cell, row }: CellProps<object>) => (
          <>
            <XButton
              value={cell.row.values.title}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onDeleteClicked((e.target as HTMLInputElement).value);
              }}
            />
            <button {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? '👇' : '👉'}
            </button>
          </>
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

  const renderRowSubComponent = useCallback((row: Row) => {
    const rowObject = row.original as Appointment;
    return <AppointmentDetails appointment={rowObject} />;
  }, []);

  return (
    <DataTable
      data={appointments}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
      hiddenColumns={['_id']}
    />
  );
};

export default AppointmentsTable;
