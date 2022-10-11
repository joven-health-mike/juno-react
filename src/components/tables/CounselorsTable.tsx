// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback, useContext, useEffect } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { Counselor, CounselorsContext } from '../../data/counselors';
import XButton from '../buttons/XButton';
import CounselorDetails from '../details/CounselorDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type CounselorsTableProps = {
  onDeleteClicked: (counselorName: string) => void;
};

const CounselorsTable: React.FC<CounselorsTableProps> = ({
  onDeleteClicked,
}) => {
  const { data: counselors, getAll: getCounselors } =
    useContext(CounselorsContext);

  useEffect(() => {
    getCounselors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              value={cell.row.values.name}
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
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Room Link',
        accessor: 'counselorRef.roomLink',
      },
    ],
    [onDeleteClicked]
  );

  const renderRowSubComponent = useCallback((row: Row) => {
    const rowObject = row.original as Counselor;
    return <CounselorDetails counselor={rowObject} />;
  }, []);

  return (
    <DataTable
      data={counselors}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
      hiddenColumns={['_id']}
    />
  );
};

export default CounselorsTable;
