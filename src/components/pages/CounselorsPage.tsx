// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  createPermission,
  deletePermission,
  updatePermission,
} from '../../auth/permissions';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import CreateCounselorModal from '../modals/CreateCounselorModal';
import EditCounselorModal from '../modals/EditCounselorModal';
import Navbar from '../navbar/Navbar';
import CounselorsTable from '../tables/CounselorsTable';
import { buttonStyles, h1Styles } from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

const Header = styled.h1`
  ${h1Styles}
`;

const CounselorsPage: React.FC = () => {
  const {
    add: addCounselor,
    delete: deleteCounselor,
    update: updateCounselor,
  } = useContext(UsersContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateCounselorModalOpen, setIsCreateCounselorModalOpen] =
    useState<boolean>(false);
  const [isEditCounselorModalOpen, setIsEditCounselorModalOpen] =
    useState<boolean>(false);
  const [modalCounselor, setModalCounselor] =
    useState<Counselor>(emptyCounselor);
  const [isCreateCounselorAllowed, setIsCreateCounselorAllowed] =
    useState<boolean>(false);
  const [isDeleteCounselorAllowed, setIsDeleteCounselorAllowed] =
    useState<boolean>(false);
  const [isUpdateCounselorAllowed, setIsUpdateCounselorAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCreateCounselorAllowed(
      createPermission(loggedInUser.role, 'counselor')
    );
    setIsDeleteCounselorAllowed(
      deletePermission(loggedInUser.role, 'counselor')
    );
    setIsUpdateCounselorAllowed(
      updatePermission(loggedInUser.role, 'counselor')
    );
  }, [loggedInUser.role]);

  const handleCounselorAdded = (counselor: Counselor) => {
    if (isCreateCounselorAllowed) {
      addCounselor(counselor);
    }
  };

  const handleCounselorEdited = (counselor: Counselor) => {
    if (isUpdateCounselorAllowed) {
      updateCounselor(counselor);
    }
  };

  const onCounselorDeleteClicked = (counselorToDelete: Counselor) => {
    console.log('CounselorsPage.onCounselorDeleteClicked');
    if (isDeleteCounselorAllowed && window.confirm('Delete this counselor?')) {
      deleteCounselor(counselorToDelete);
    }
  };

  const onCounselorEditClicked = (counselorToEdit: Counselor) => {
    if (isUpdateCounselorAllowed) {
      setModalCounselor(counselorToEdit);
      setIsEditCounselorModalOpen(true);
    }
  };

  const onCounselorEmailClicked = (counselorToEmail: Counselor) => {
    window.open(`mailto:${counselorToEmail.email}`);
  };

  const onCounselorRoomLinkClicked = (counselorToOpenRoomLink: Counselor) => {
    window.open(counselorToOpenRoomLink.counselorRoomLink);
  };

  const onCounselorFileOpenClicked = (counselorToOpenFile: Counselor) => {
    window.open(counselorToOpenFile.docsUrl);
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Header>Counselors</Header>
      <>
        {isCreateCounselorAllowed && (
          <>
            <Button
              type="button"
              onClick={() => setIsCreateCounselorModalOpen(true)}
            >
              Add Counselor
            </Button>
            <CreateCounselorModal
              isOpen={isCreateCounselorModalOpen}
              onCounselorAdded={handleCounselorAdded}
              onClose={() => setIsCreateCounselorModalOpen(false)}
            />
          </>
        )}
        {isUpdateCounselorAllowed && (
          <EditCounselorModal
            isOpen={isEditCounselorModalOpen}
            onCounselorEdited={handleCounselorEdited}
            onClose={() => setIsEditCounselorModalOpen(false)}
            initialCounselor={modalCounselor}
          />
        )}
        <CounselorsTable
          onDeleteClicked={onCounselorDeleteClicked}
          onEditClicked={onCounselorEditClicked}
          onEmailClicked={onCounselorEmailClicked}
          onRoomLinkClicked={onCounselorRoomLinkClicked}
          onOpenFileClicked={onCounselorFileOpenClicked}
        />
      </>
    </>
  );
};

export default CounselorsPage;
