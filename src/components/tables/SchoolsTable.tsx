// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback, useContext } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { School, SchoolsContext } from '../../data/schools';
import XButton from '../buttons/XButton';
import SchoolDetails from '../details/SchoolDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type SchoolsTableProps = {
  onDeleteClicked: (school: School) => void;
  onEditClicked: (school: School) => void;
  onEmailClicked: (school: School) => void;
};

const SchoolsTable: React.FC<SchoolsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onEmailClicked,
}) => {
  const { data: schools } = useContext(SchoolsContext);

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
          const school = cell.row.original as School;

          return (
            <>
              <XButton
                text="❌"
                value={school.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onDeleteClicked(school);
                }}
              />
              <XButton
                text="✏️"
                value={school.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onEditClicked(school);
                }}
              />
              <XButton
                text="📧"
                value={school.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onEmailClicked(school);
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
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'primaryEmail',
      },
      {
        Header: 'Phone',
        accessor: 'primaryPhone',
      },
    ],
    [onDeleteClicked, onEditClicked, onEmailClicked]
  );

  const renderRowSubComponent = useCallback((row: Row) => {
    const rowObject = row.original as School;
    return <SchoolDetails school={rowObject} />;
  }, []);

  return (
    <DataTable
      data={schools}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
      hiddenColumns={['id']}
    />
  );
};

export default SchoolsTable;
