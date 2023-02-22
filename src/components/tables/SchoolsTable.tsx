// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import styled from 'styled-components';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { School, SchoolsContext } from '../../data/schools';
import { LoggedInUserContext } from '../../data/users';
import XButton from '../buttons/XButton';
import SchoolDetails from '../details/SchoolDetails';
import { buttonStyles } from '../styles/mixins';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

const Button = styled.button`
  ${buttonStyles}
`;

type SchoolsTableProps = {
  onDeleteClicked: (school: School) => void;
  onEditClicked: (school: School) => void;
  onEmailClicked: (school: School) => void;
};

export type TableSchool = {
  id: string;
  name: string;
  state: string;
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
  const [tableSchools, setTableSchools] = useState<TableSchool[]>([]);

  useEffect(() => {
    setIsDeleteSchoolAllowed(deletePermission(loggedInUser.role, 'school'));
    setIsUpdateSchoolAllowed(updatePermission(loggedInUser.role, 'school'));
  }, [loggedInUser.role]);

  useEffect(() => {
    const mappedSchools = schools.map(school => {
      return {
        id: school.id,
        name: school.name,
        state: school.state,
      } as TableSchool;
    });

    setTableSchools(mappedSchools);
  }, [schools]);

  const getSchoolFromTableSchool = useCallback(
    (tableSchool: TableSchool): School => {
      return schools.find(school => school.id === tableSchool.id) as School;
    },
    [schools]
  );

  const getButtonCell = useCallback(
    (tableSchool: TableSchool, row: Row) => {
      const school = getSchoolFromTableSchool(tableSchool);
      if (!school) return <></>;

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
          <Button {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </Button>
        </>
      );
    },
    [
      getSchoolFromTableSchool,
      isDeleteSchoolAllowed,
      isUpdateSchoolAllowed,
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

  const columns: Column[] = React.useMemo(
    () => [
      {
        id: 'buttons',
        Cell: ({ cell, row }: CellProps<object>) => {
          const school = cell.row.original as TableSchool;
          return getButtonCell(school, row);
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
        Header: 'State',
        accessor: 'state',
      },
    ],
    [getButtonCell]
  );

  const renderRowSubComponent = useCallback(
    (row: Row) => {
      const rowObject = row.original as TableSchool;
      const school = getSchoolFromTableSchool(rowObject);
      if (typeof school === 'undefined') return <></>;
      return <SchoolDetails school={school} />;
    },
    [getSchoolFromTableSchool]
  );

  return (
    <DataTable
      data={tableSchools}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
      hiddenColumns={['id']}
    />
  );
};

export default SchoolsTable;
