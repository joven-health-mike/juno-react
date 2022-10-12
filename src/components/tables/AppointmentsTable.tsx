// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback, useContext, useMemo } from 'react';
import { CellProps, Column, Row, Cell } from 'react-table';
import { Appointment, AppointmentsContext } from '../../data/appointments';
import { CounselorRef } from '../../data/counselors';
import { User } from '../../data/users';
import { formatDateTime } from '../../utils/DateUtils';
import XButton from '../buttons/XButton';
import AppointmentDetails from '../details/AppointmentDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type AppointmentsTableProps = {
  onDeleteClicked: (item: string) => void;
  onEditClicked: (item: string) => void;
};

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
}) => {
  const { data: appointments } = useContext(AppointmentsContext);

  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const getCounselor = useCallback((cell: Cell<any, object>) => {
    const counselorRef = cell.row.values.counselor as CounselorRef;
    if (counselorRef && counselorRef.user) {
      return `${counselorRef.user?.firstName} ${counselorRef.user?.lastName}`;
    }
    return 'NOT FOUND';
  }, []);

  const getParticipants = useCallback((cell: Cell<any, object>) => {
    let result = 'NOT FOUND';
    const participants = cell.row.values.participants as User[];
    if (participants) {
      if (participants.length > 0) {
        result = '';
        participants.forEach(user => {
          result =
            result +
            user.firstName +
            ' ' +
            user.lastName +
            ' (' +
            user.role +
            ') , ';
        });
        result = result.substring(0, result.length - 2);
      }
    }

    return result;
  }, []);

  const columns: Column[] = useMemo(
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
              text="❌"
              value={cell.row.values.title}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onDeleteClicked((e.target as HTMLInputElement).value);
              }}
            />
            <XButton
              text="✏️"
              value={cell.row.values.title}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onEditClicked((e.target as HTMLInputElement).value);
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
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Start',
        accessor: 'start',
        Cell: ({ cell }: CellProps<object>) => (
          <p>{formatDateTime(new Date(cell.row.values.start), -6)}</p>
        ),
      },
      {
        Header: 'End',
        accessor: 'end',
        Cell: ({ cell }: CellProps<object>) => (
          <p>{formatDateTime(new Date(cell.row.values.end), -6)}</p>
        ),
      },
      {
        Header: 'Counselor',
        accessor: 'counselor',
        Cell: ({ cell }: CellProps<object>) => <p>{getCounselor(cell)}</p>,
      },
      {
        Header: 'Participants',
        accessor: 'participants',
        Cell: ({ cell }: CellProps<object>) => <p>{getParticipants(cell)}</p>,
      },
    ],
    [onEditClicked, onDeleteClicked, getCounselor, getParticipants]
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
      hiddenColumns={['id']}
    />
  );
};

export default AppointmentsTable;
