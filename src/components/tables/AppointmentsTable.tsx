// Copyright 2022 Social Fabric, LLC

import {
  Computer,
  Delete,
  Edit,
  Email,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { Appointment, AppointmentsContext } from '../../data/appointments';
import { getCounselors } from '../../data/counselors';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import { formatDate, formatTime } from '../../utils/DateUtils';
import AppointmentDetails from '../details/AppointmentDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type AppointmentsTableProps = {
  onDeleteClicked: (appointment: Appointment) => void;
  onEditClicked: (appointment: Appointment) => void;
  onEmailClicked: (appointment: Appointment) => void;
  onRoomLinkClicked: (appointment: Appointment) => void;
};

export type TableAppointment = {
  id: string;
  title: string;
  date: string;
  time: string;
  counselorName: string;
};

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onEmailClicked,
  onRoomLinkClicked,
}) => {
  const { data: appointments } = useContext(AppointmentsContext);
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [isDeleteAppointmentAllowed, setIsDeleteAppointmentAllowed] =
    useState<boolean>(false);
  const [isUpdateAppointmentAllowed, setIsUpdateAppointmentAllowed] =
    useState<boolean>(false);
  const [tableAppointments, setTableAppointments] = useState<
    TableAppointment[]
  >([]);

  useEffect(() => {
    const hiddenColumns = [];
    if (loggedInUser.role === 'COUNSELOR') {
      hiddenColumns.push('counselorName');
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

  useEffect(() => {
    const mappedAppointments = appointments.map(appointment => {
      const counselor = counselors.find(
        counselor => counselor.id === appointment.counselorUserId
      );
      const counselorName = `${counselor?.firstName} ${counselor?.lastName}`;

      return {
        id: appointment.id,
        title: appointment.title,
        date: formatDate(new Date(appointment.start)),
        time: `${formatTime(new Date(appointment.start))} - ${formatTime(
          new Date(appointment.end)
        )}`,
        counselorName: counselorName,
      } as TableAppointment;
    });

    setTableAppointments(mappedAppointments);
  }, [appointments, counselors, loggedInUser.timeZoneIanaName]);

  const getAppointmentFromTableAppointment = useCallback(
    (tableAppointment: TableAppointment): Appointment => {
      return appointments.find(
        appointment => appointment.id === tableAppointment.id
      ) as Appointment;
    },
    [appointments]
  );

  const getButtonCell = useCallback(
    (tableAppointment: TableAppointment, row: Row) => {
      const appointment = getAppointmentFromTableAppointment(tableAppointment);
      if (!appointment) return <></>;

      const counselor = counselors.find(
        counselor => counselor.id === appointment.counselorUserId
      );

      return (
        <>
          {isDeleteAppointmentAllowed && (
            <IconButton
              aria-label="delete"
              onClick={() => {
                onDeleteClicked(appointment);
              }}
            >
              <Delete />
            </IconButton>
          )}
          {isUpdateAppointmentAllowed && (
            <IconButton
              aria-label="edit"
              onClick={() => {
                onEditClicked(appointment);
              }}
            >
              <Edit />
            </IconButton>
          )}
          <IconButton
            aria-label="email"
            onClick={() => {
              onEmailClicked(appointment);
            }}
          >
            <Email />
          </IconButton>
          {typeof counselor !== 'undefined' && (
            <IconButton
              aria-label="roomLink"
              onClick={() => {
                onRoomLinkClicked(appointment);
              }}
            >
              <Computer />
            </IconButton>
          )}
          <IconButton aria-label="expand" {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </>
      );
    },
    [
      counselors,
      getAppointmentFromTableAppointment,
      isDeleteAppointmentAllowed,
      isUpdateAppointmentAllowed,
      onDeleteClicked,
      onEditClicked,
      onEmailClicked,
      onRoomLinkClicked,
    ]
  );

  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns: Column[] = useMemo(
    () => [
      {
        id: 'buttons',
        Cell: ({ cell, row }: CellProps<object>) => {
          const appointment = cell.row.original as TableAppointment;
          return getButtonCell(appointment, row);
        },
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Time',
        accessor: 'time',
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
      const tableAppointment = row.original as TableAppointment;
      const appointment = getAppointmentFromTableAppointment(tableAppointment);
      if (typeof appointment === 'undefined') return <></>;
      return (
        <AppointmentDetails
          appointment={appointment}
          onEmailParticipantsClicked={onEmailClicked}
          onJoinAppointmentClicked={onRoomLinkClicked}
          onCancelAppointmentClicked={onDeleteClicked}
        />
      );
    },
    [
      getAppointmentFromTableAppointment,
      onDeleteClicked,
      onEmailClicked,
      onRoomLinkClicked,
    ]
  );

  return (
    <DataTable
      data={tableAppointments}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
      hiddenColumns={hiddenColumns}
    />
  );
};

export default AppointmentsTable;
