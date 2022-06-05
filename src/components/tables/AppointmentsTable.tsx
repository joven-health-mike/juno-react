// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Appointment } from '../../data/appointments';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type AppointmentsTableProps = {
  appointments: Appointment[];
  onDeleteClicked: any;
};

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  onDeleteClicked,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        Cell: ({ cell }: any) => (
          <XButton
            value={cell.row.values.title}
            onClick={(e: any) => {
              e.preventDefault();
              onDeleteClicked(e.target.value);
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
        Cell: ({ cell }: any) => <p>{cell.row.values.start.toISOString()}</p>,
      },
      {
        Header: 'End',
        accessor: 'end',
        Cell: ({ cell }: any) => <p>{cell.row.values.end.toISOString()}</p>,
      },
      {
        Header: 'Counselor ID',
        accessor: 'counselorId',
      },
      {
        Header: 'Student ID',
        accessor: 'studentId',
      },
      {
        Header: 'Facilitator ID',
        accessor: 'facilitatorId',
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
