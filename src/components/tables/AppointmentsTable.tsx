// Copyright 2022 Social Fabric, LLC

import React, {
  Key,
  MouseEvent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { CellProps, Column, Row, Cell } from 'react-table';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import { CounselorsContext } from '../../data/counselors';
import { StudentsContext } from '../../data/students';
import { formatDateTime } from '../../utils/DateUtils';
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
  const { setAppointments } = useContext(AppointmentsContext);
  const { counselors } = useContext(CounselorsContext);
  const { students } = useContext(StudentsContext);

  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const [isEditingCell, editCell] = useState<Key | null>();

  const getCounselor = useCallback(
    (cell: Cell<any, object>) => {
      const foundCounselor = counselors.filter(
        counselor => counselor._id === cell.row.values.counselorId
      )[0];
      return foundCounselor ? foundCounselor.name : 'Not Found';
    },
    [counselors]
  );

  const saveCounselor = () => {
    console.log('save counselor');
  };

  const getStudent = useCallback(
    (cell: Cell<any, object>) => {
      const foundStudent = students.filter(
        student => student._id === cell.row.values.studentId
      )[0];
      return foundStudent
        ? foundStudent.first_name + ' ' + foundStudent.last_name
        : 'Not Found';
    },
    [students]
  );

  const saveStudent = () => {
    console.log('save student');
  };

  const startEditingCell = (cell: Cell<any, object>) => {
    editCell(cell.getCellProps().key);
  };

  const stopEditingCell = () => {
    editCell(null);
  };

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
          <p>{formatDateTime(cell.row.values.start, -6)}</p>
        ),
      },
      {
        Header: 'End',
        accessor: 'end',
        Cell: ({ cell }: CellProps<object>) => (
          <p>{formatDateTime(cell.row.values.end, -6)}</p>
        ),
      },
      {
        Header: 'Counselor',
        accessor: 'counselorId',
        Cell: ({ cell }: CellProps<object>) => {
          if (isEditingCell === cell.getCellProps().key) {
            return (
              <p>
                <input value={getCounselor(cell)} />
                <XButton
                  text="✅"
                  value="Save Counselor"
                  onClick={() => {
                    saveCounselor();
                    stopEditingCell();
                  }}
                />
                <XButton
                  text="❌"
                  value="Save Counselor"
                  onClick={() => {
                    stopEditingCell();
                  }}
                />
              </p>
            );
          }
          return (
            <p>
              {getCounselor(cell)}
              <XButton
                text="✏️"
                value="Edit Counselor"
                onClick={() => {
                  startEditingCell(cell);
                }}
              />
            </p>
          );
        },
      },
      {
        Header: 'Student',
        accessor: 'studentId',
        Cell: ({ cell }: CellProps<object>) => {
          if (isEditingCell === cell.getCellProps().key) {
            return (
              <p>
                <input value={getStudent(cell)} />
                <XButton
                  text="✅"
                  value="Save Student"
                  onClick={() => {
                    saveStudent();
                    stopEditingCell();
                  }}
                />
                <XButton
                  text="❌"
                  value="Cancel Editing Student"
                  onClick={() => {
                    stopEditingCell();
                  }}
                />
              </p>
            );
          }
          return (
            <p>
              {getStudent(cell)}
              <XButton
                text="✏️"
                value="Edit Student"
                onClick={() => {
                  startEditingCell(cell);
                }}
              />
            </p>
          );
        },
      },
    ],
    [onDeleteClicked, isEditingCell, getCounselor, getStudent]
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
      addNewItem={() => setAppointments([emptyAppointment, ...appointments])}
    />
  );
};

export default AppointmentsTable;
