// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback, useContext } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { Counselor, CounselorsContext } from '../../data/counselors';
import XButton from '../buttons/XButton';
import CounselorDetails from '../details/CounselorDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type CounselorsTableProps = {
  onDeleteClicked: (counselor: Counselor) => void;
  onEditClicked: (counselor: Counselor) => void;
  onEmailClicked: (counselor: Counselor) => void;
  onRoomLinkClicked: (counselor: Counselor) => void;
  onOpenFileClicked: (counselor: Counselor) => void;
};

const CounselorsTable: React.FC<CounselorsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onEmailClicked,
  onRoomLinkClicked,
  onOpenFileClicked,
}) => {
  const { data: counselors } = useContext(CounselorsContext);

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
        Cell: ({ cell, row }: CellProps<object>) => {
          const counselor = cell.row.original as Counselor;
          return (
            <>
              <XButton
                text="❌"
                title={`Delete ${counselor.firstName}`}
                value={counselor.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onDeleteClicked(counselor);
                }}
              />
              <XButton
                text="✏️"
                title={`Edit ${counselor.firstName}`}
                value={counselor.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onEditClicked(counselor);
                }}
              />
              <XButton
                text="📧"
                title={`Email ${counselor.firstName}`}
                value={counselor.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onEmailClicked(counselor);
                }}
              />
              <XButton
                text="🖥️"
                title={`Join ${counselor.firstName}'s Waiting Room`}
                value={counselor.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onRoomLinkClicked(counselor);
                }}
              />
              <XButton
                text="📁"
                title={`Open ${counselor.firstName}'s File`}
                value={counselor.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onOpenFileClicked(counselor);
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
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
    ],
    [
      onDeleteClicked,
      onEditClicked,
      onEmailClicked,
      onRoomLinkClicked,
      onOpenFileClicked,
    ]
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
      hiddenColumns={['id']}
    />
  );
};

export default CounselorsTable;
