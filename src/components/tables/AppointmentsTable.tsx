// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CellProps, Column, Row, Cell } from 'react-table';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { Appointment, AppointmentsContext } from '../../data/appointments';
import { CounselorRef } from '../../data/counselors';
import { LoggedInUserContext, User } from '../../data/users';
import { formatDate, formatTime } from '../../utils/DateUtils';
import XButton from '../buttons/XButton';
import AppointmentDetails from '../details/AppointmentDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type AppointmentsTableProps = {
  onDeleteClicked: (appointment: Appointment) => void;
  onEditClicked: (appointment: Appointment) => void;
  onEmailClicked: (appointment: Appointment) => void;
};

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onEmailClicked,
}) => {
  const { data: appointments } = useContext(AppointmentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [isDeleteAppointmentAllowed, setIsDeleteAppointmentAllowed] =
    useState<boolean>(false);
  const [isUpdateAppointmentAllowed, setIsUpdateAppointmentAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    const hiddenColumns = ['id'];
    if (loggedInUser.role === 'COUNSELOR') {
      hiddenColumns.push('counselor');
    }
    setHiddenColumns(hiddenColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsDeleteAppointmentAllowed(
      deletePermission(loggedInUser.role, 'appointment')
    );
    setIsUpdateAppointmentAllowed(
      updatePermission(loggedInUser.role, 'appointment')
    );
  }, [loggedInUser.role]);

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
    const participants = cell.row.original.participants as User[];
    if (participants) {
      if (participants.length > 0) {
        result = '';
        participants.forEach(user => {
          result = `${result}${user.firstName} ${user.lastName} (${user.role}), `;
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
        Cell: ({ cell, row }: CellProps<object>) => {
          const appointment = cell.row.original as Appointment;

          return (
            <>
              {isDeleteAppointmentAllowed && (
                <XButton
                  text="❌"
                  title="Delete Appointment"
                  value={appointment.id}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onDeleteClicked(appointment);
                  }}
                />
              )}
              {isUpdateAppointmentAllowed && (
                <XButton
                  text="✏️"
                  title="Edit Appointment"
                  value={appointment.id}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onEditClicked(appointment);
                  }}
                />
              )}
              <XButton
                text="📧"
                title={`Email Participants`}
                value={appointment.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onEmailClicked(appointment);
                }}
              />
              <button {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? '👇' : '👉'}
              </button>
            </>
          );
        },
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
        Header: 'Date',
        Cell: ({ cell }: CellProps<object>) => {
          const appointment = cell.row.original as Appointment;
          return <p>{formatDate(appointment.start)}</p>;
        },
      },
      {
        Header: 'Time',
        Cell: ({ cell }: CellProps<object>) => {
          const appointment = cell.row.original as Appointment;
          return (
            <p>{`${formatTime(appointment.start)} - ${formatTime(
              appointment.end
            )}`}</p>
          );
        },
      },
      {
        Header: 'Counselor',
        accessor: 'counselor',
        Cell: ({ cell }: CellProps<object>) => <p>{getCounselor(cell)}</p>,
      },
      {
        Header: 'Participants',
        accessor: 'participants',
        Cell: ({ cell }: CellProps<object>) => (
          <div>{getParticipants(cell)}</div>
        ),
      },
    ],
    [
      isDeleteAppointmentAllowed,
      isUpdateAppointmentAllowed,
      onDeleteClicked,
      onEditClicked,
      onEmailClicked,
      getCounselor,
      getParticipants,
    ]
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
      hiddenColumns={hiddenColumns}
    />
  );
};

export default AppointmentsTable;
