// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { Counselor } from '../../data/counselors';
import XButton from '../buttons/XButton';
import CounselorDetails from '../details/CounselorDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type CounselorsTableProps = {
  counselors: Counselor[];
  onDeleteClicked: (counselorName: string) => void;
};

const CounselorsTable: React.FC<CounselorsTableProps> = ({
  counselors,
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
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </span>
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
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? '👇' : '👉'}
            </span>
          </>
        ),
      },
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Room Link',
        accessor: 'roomLink',
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
    />
  );
};

export default CounselorsTable;
