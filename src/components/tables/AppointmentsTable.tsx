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
import { deletePermission, updatePermission } from '../../auth/permissions';
import { Appointment, AppointmentsContext } from '../../data/appointments';
import { CounselorsContext } from '../../data/counselors';
import { LoggedInUserContext } from '../../data/users';
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

export type TableAppointment = {
  id: string;
  title: string;
  date: string;
  time: string;
  counselorName: string;
  participantNames: string;
};

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onEmailClicked,
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
        counselor => counselor.counselorRef.id === appointment.counselorId
      );
      const counselorName = `${counselor?.firstName} ${counselor?.lastName}`;

      let participantNames = '';
      for (const participant of appointment.participants) {
        participantNames += `${participant.firstName} ${participant.lastName} (${participant.role}), `;
      }

      return {
        id: appointment.id,
        title: appointment.title,
        date: formatDate(
          new Date(appointment.start),
          loggedInUser.timeZoneIanaName
        ),
        time: `${formatTime(
          new Date(appointment.start),
          loggedInUser.timeZoneIanaName
        )} - ${formatTime(
          new Date(appointment.end),
          loggedInUser.timeZoneIanaName
        )}`,
        counselorName: counselorName,
        participantNames: participantNames,
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
    [
      getAppointmentFromTableAppointment,
      isDeleteAppointmentAllowed,
      isUpdateAppointmentAllowed,
      onDeleteClicked,
      onEditClicked,
      onEmailClicked,
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
      {
        Header: 'Participants',
        accessor: 'participantNames',
      },
    ],
    [getButtonCell]
  );

  const renderRowSubComponent = useCallback(
    (row: Row) => {
      const tableAppointment = row.original as TableAppointment;
      const appointment = getAppointmentFromTableAppointment(tableAppointment);
      return <AppointmentDetails appointment={appointment} />;
    },
    [getAppointmentFromTableAppointment]
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
