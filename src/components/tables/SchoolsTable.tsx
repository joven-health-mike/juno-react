// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { School, SchoolsContext } from '../../data/schools';
import { LoggedInUserContext } from '../../data/users';
import SchoolDetails from '../details/SchoolDetails';
import MaterialTable from './MaterialTable';

type SchoolsTableProps = {
  onDeleteClicked: (school: School) => void;
  onEditClicked: (school: School) => void;
  onEmailClicked: (school: School) => void;
  onOpenFileClicked: (school: School) => void;
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
  onOpenFileClicked,
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

  const createTableData = (schools: TableSchool[]) => {
    const tableData: string[][] = [];

    schools.forEach(school => {
      tableData.push([school.id, school.name, school.state]);
    });

    return tableData;
  };

  const onDeleteRow = isDeleteSchoolAllowed
    ? (id: string) => {
        const school = schools.find(school => school.id === id);
        onDeleteClicked(school!);
      }
    : undefined;

  const onEditRow = isUpdateSchoolAllowed
    ? (id: string) => {
        const school = schools.find(school => school.id === id);
        onEditClicked(school!);
      }
    : undefined;

  const onEmailRow = (id: string) => {
    const school = schools.find(school => school.id === id);
    onEmailClicked(school!);
  };

  const onFolderRow = (id: string) => {
    const school = schools.find(school => school.id === id);
    onOpenFileClicked(school!);
  };

  const getExpandComponent = (id: string) => {
    const school = schools.find(school => school.id === id);
    return <SchoolDetails school={school!} />;
  };

  return (
    <MaterialTable
      rows={createTableData(tableSchools)}
      columnHeaders={['id', 'Name', 'State']}
      hideColumnIndexes={[0]}
      tableButtonInfo={{
        onDeleteRow,
        onEditRow,
        onEmailRow,
        onFolderRow,
      }}
      getExpandComponent={getExpandComponent}
    />
  );
};

export default SchoolsTable;
