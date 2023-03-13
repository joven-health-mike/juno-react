// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { Appointment, AppointmentsContext } from '../../data/appointments';
import { getCounselors } from '../../data/counselors';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import { formatDate, formatTime } from '../../utils/DateUtils';
import MaterialTable from './MaterialTable';

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

  const [hiddenColumns, setHiddenColumns] = useState<number[]>([0]);
  const [isDeleteAppointmentAllowed, setIsDeleteAppointmentAllowed] =
    useState<boolean>(false);
  const [isUpdateAppointmentAllowed, setIsUpdateAppointmentAllowed] =
    useState<boolean>(false);
  const [tableAppointments, setTableAppointments] = useState<
    TableAppointment[]
  >([]);

  useEffect(() => {
    const hiddenColumns = [0];
    if (loggedInUser.role === 'COUNSELOR') {
      hiddenColumns.push(4);
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

  const createTableData = (appointments: TableAppointment[]) => {
    const tableData: string[][] = [];

    appointments.forEach(appointment => {
      tableData.push([
        appointment.id,
        appointment.title,
        appointment.date,
        appointment.time,
        appointment.counselorName,
      ]);
    });

    return tableData;
  };

  const onDeleteRow = isDeleteAppointmentAllowed
    ? (id: string) => {
        const appointment = appointments.find(
          appointment => appointment.id === id
        );
        onDeleteClicked(appointment!);
      }
    : undefined;

  const onEditRow = isUpdateAppointmentAllowed
    ? (id: string) => {
        const appointment = appointments.find(
          appointment => appointment.id === id
        );
        onEditClicked(appointment!);
      }
    : undefined;

  const onEmailRow = (id: string) => {
    const appointment = appointments.find(appointment => appointment.id === id);
    onEmailClicked(appointment!);
  };

  const onRoomLinkRow = (id: string) => {
    const appointment = appointments.find(appointment => appointment.id === id);
    onRoomLinkClicked(appointment!);
  };

  return (
    <MaterialTable
      rows={createTableData(tableAppointments)}
      columnHeaders={['id', 'Title', 'Date', 'Time', 'Counselor']}
      hideColumnIndexes={hiddenColumns}
      tableButtonInfo={{ onDeleteRow, onEditRow, onEmailRow, onRoomLinkRow }}
    />
  );
};

export default AppointmentsTable;
