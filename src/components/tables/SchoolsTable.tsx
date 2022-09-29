// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback, useContext, useEffect } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { School, SchoolsContext } from '../../data/schools';
import XButton from '../buttons/XButton';
import SchoolDetails from '../details/SchoolDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type SchoolsTableProps = {
  onDeleteClicked: (schoolName: string) => void;
};

const SchoolsTable: React.FC<SchoolsTableProps> = ({ onDeleteClicked }) => {
  const { data: schools, getAll: getSchools } = useContext(SchoolsContext);

  useEffect(() => {
    getSchools();
    // TODO: heads up here. still figuring this out. i feel like this is a warning that this isn't
    // the correct architecture. getUsers isn't changing - users is, however, passing this in as a
    // dependency causes it to loop infinitely. on methods that use ids those strings can be added
    // here.
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
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    [onDeleteClicked]
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
      hiddenColumns={['_id']}
    />
  );
};

export default SchoolsTable;
