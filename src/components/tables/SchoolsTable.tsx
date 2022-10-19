// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { School, SchoolsContext } from '../../data/schools';
import { LoggedInUserContext } from '../../data/users';
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
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isDeleteSchoolAllowed, setIsDeleteSchoolAllowed] =
    useState<boolean>(false);
  const [isUpdateSchoolAllowed, setIsUpdateSchoolAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsDeleteSchoolAllowed(deletePermission(loggedInUser.role, 'school'));
    setIsUpdateSchoolAllowed(updatePermission(loggedInUser.role, 'school'));
  }, [loggedInUser.role]);

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
              {isDeleteSchoolAllowed && (
                <XButton
                  text="❌"
                  title={`Delete ${school.name}`}
                  value={school.id}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onDeleteClicked(school);
                  }}
                />
              )}
              {isUpdateSchoolAllowed && (
                <XButton
                  text="✏️"
                  title={`Edit ${school.name}`}
                  value={school.id}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onEditClicked(school);
                  }}
                />
              )}
              <XButton
                text="📧"
                title={`Email ${school.name}`}
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
