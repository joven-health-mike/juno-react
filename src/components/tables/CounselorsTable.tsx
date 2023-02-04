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
import { Counselor, CounselorsContext } from '../../data/counselors';
import { LoggedInUserContext } from '../../data/users';
import XButton from '../buttons/XButton';
import CounselorDetails from '../details/CounselorDetails';
import { buttonStyles } from '../styles/mixins';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

const Button = styled.button`
  ${buttonStyles}
`;

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
  const { data: counselors } = useContext(CounselorsContext);
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

  const getCounselorFromTableCounselor = useCallback(
    (tableCounselor: TableCounselor): Counselor => {
      return counselors.find(
        counselor => counselor.id === tableCounselor.id
      ) as Counselor;
    },
    [counselors]
  );

  const getButtonCell = useCallback(
    (tableCounselor: TableCounselor, row: Row) => {
      const counselor = getCounselorFromTableCounselor(tableCounselor);
      if (!counselor) return <></>;

      return (
        <>
          {isDeleteCounselorAllowed && (
            <XButton
              text="❌"
              title={`Delete ${counselor.firstName}`}
              value={counselor.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onDeleteClicked(counselor);
              }}
            />
          )}
          {isUpdateCounselorAllowed && (
            <XButton
              text="✏️"
              title={`Edit ${counselor.firstName}`}
              value={counselor.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onEditClicked(counselor);
              }}
            />
          )}
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
          <Button {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </Button>
        </>
      );
    },
    [
      getCounselorFromTableCounselor,
      isDeleteCounselorAllowed,
      isUpdateCounselorAllowed,
      onDeleteClicked,
      onEditClicked,
      onEmailClicked,
      onOpenFileClicked,
      onRoomLinkClicked,
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
          const counselor = cell.row.original as TableCounselor;
          return getButtonCell(counselor, row);
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
    ],
    [getButtonCell]
  );

  const renderRowSubComponent = useCallback(
    (row: Row) => {
      const rowObject = row.original as TableCounselor;
      const counselor = getCounselorFromTableCounselor(rowObject);
      return <CounselorDetails counselor={counselor} />;
    },
    [getCounselorFromTableCounselor]
  );

  return (
    <DataTable
      data={tableCounselors}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
      hiddenColumns={['id']}
    />
  );
};

export default CounselorsTable;
