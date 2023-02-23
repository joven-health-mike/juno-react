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
import { Appointment, AppointmentsContext } from '../../data/appointments';
import { CounselorsContext } from '../../data/counselors';
import { LoggedInUserContext } from '../../data/users';
import { formatDate, formatTime } from '../../utils/DateUtils';
import XButton from '../buttons/XButton';
import AppointmentDetails from '../details/AppointmentDetails';
import { buttonStyles } from '../styles/mixins';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

const Button = styled.button`
  ${buttonStyles}
`;

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
  const { data: counselors } = useContext(CounselorsContext);
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
          {typeof counselor !== 'undefined' && (
            <XButton
              text="🖥️"
              title={`Join ${counselor.firstName}'s Waiting Room`}
              value={appointment.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onRoomLinkClicked(appointment);
              }}
            />
          )}
          <Button {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </Button>
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
