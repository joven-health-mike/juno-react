// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { Counselor, getCounselors } from '../../data/counselors';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import CounselorDetails from '../details/CounselorDetails';
import MaterialTable from './MaterialTable';

type CounselorsTableProps = {
  onDeleteClicked: (counselor: Counselor) => void;
  onEditClicked: (counselor: Counselor) => void;
  onEmailClicked: (counselor: Counselor) => void;
  onRoomLinkClicked: (counselor: Counselor) => void;
  onOpenFileClicked: (counselor: Counselor) => void;
};

export type TableCounselor = {
  id: string;
  name: string;
};

const CounselorsTable: React.FC<CounselorsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onEmailClicked,
  onRoomLinkClicked,
  onOpenFileClicked,
}) => {
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isDeleteCounselorAllowed, setIsDeleteCounselorAllowed] =
    useState<boolean>(false);
  const [isUpdateCounselorAllowed, setIsUpdateCounselorAllowed] =
    useState<boolean>(false);
  const [tableCounselors, setTableCounselors] = useState<TableCounselor[]>([]);

  useEffect(() => {
    setIsDeleteCounselorAllowed(
      deletePermission(loggedInUser.role, 'counselor')
    );
    setIsUpdateCounselorAllowed(
      updatePermission(loggedInUser.role, 'counselor')
    );
  }, [loggedInUser.role]);

  useEffect(() => {
    const mappedCounselors = counselors.map(counselor => {
      return {
        id: counselor.id,
        name: `${counselor.firstName} ${counselor.lastName}`,
      } as TableCounselor;
    });

    setTableCounselors(mappedCounselors);
  }, [counselors]);

  const createTableData = (counselors: TableCounselor[]) => {
    const tableData: string[][] = [];

    counselors.forEach(counselor => {
      tableData.push([counselor.id, counselor.name]);
    });

    return tableData;
  };

  const onDeleteRow = isDeleteCounselorAllowed
    ? (id: string) => {
        const counselor = counselors.find(counselor => counselor.id === id);
        onDeleteClicked(counselor!);
      }
    : undefined;

  const onEditRow = isUpdateCounselorAllowed
    ? (id: string) => {
        const counselor = counselors.find(counselor => counselor.id === id);
        onEditClicked(counselor!);
      }
    : undefined;

  const onEmailRow = (id: string) => {
    const counselor = counselors.find(counselor => counselor.id === id);
    onEmailClicked(counselor!);
  };

  const onRoomLinkRow = (id: string) => {
    const counselor = counselors.find(counselor => counselor.id === id);
    onRoomLinkClicked(counselor!);
  };

  const onFolderRow = (id: string) => {
    const counselor = counselors.find(counselor => counselor.id === id);
    onOpenFileClicked(counselor!);
  };

  const getExpandComponent = (id: string) => {
    const counselor = counselors.find(counselor => counselor.id === id);
    return <CounselorDetails counselor={counselor!} />;
  };

  return (
    <MaterialTable
      rows={createTableData(tableCounselors)}
      columnHeaders={['id', 'Name']}
      hideColumnIndexes={[0]}
      tableButtonInfo={{
        onDeleteRow,
        onEditRow,
        onEmailRow,
        onRoomLinkRow,
        onFolderRow,
      }}
      getExpandComponent={getExpandComponent}
    />
  );
};

export default CounselorsTable;
