// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { School } from '../../data/schools';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type SchoolsTableProps = {
  schools: School[];
  onDeleteClicked: (schoolName: string) => void;
};

const SchoolsTable: React.FC<SchoolsTableProps> = ({
  schools,
  onDeleteClicked,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        Cell: ({ cell }: any) => (
          <XButton
            value={cell.row.values.name}
            onClick={(e: any) => {
              e.preventDefault();
              onDeleteClicked(e.target.value);
            }}
          />
        ),
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
        Header: 'Facilitators',
        accessor: 'facilitators',
        Cell: ({ cell }: any) => (
          <>
            {cell.row.values.facilitators.map(
              (facilitatorName: string, index: number) => {
                return <p key={index}>{facilitatorName}</p>;
              }
            )}
          </>
        ),
      },
    ],
    [onDeleteClicked]
  );

  return (
    <DataTable data={schools} defaultColumn={defaultColumn} columns={columns} />
  );
};

export default SchoolsTable;
