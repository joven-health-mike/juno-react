// Copyright 2022 Social Fabric, LLC

import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {
  createPermission,
  deletePermission,
  updatePermission,
} from '../../auth/permissions';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import CounselorDialog from '../modals/CounselorDialog';
import Navbar from '../navbar/Navbar';
import CounselorsTable from '../tables/CounselorsTable';

const CounselorsPage: React.FC = () => {
  const {
    add: addCounselor,
    delete: deleteCounselor,
    update: updateCounselor,
  } = useContext(UsersContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateCounselorDialogOpen, setIsCreateCounselorDialogOpen] =
    useState<boolean>(false);
  const [isEditCounselorDialogOpen, setIsEditCounselorDialogOpen] =
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
    if (isDeleteCounselorAllowed && window.confirm('Delete this counselor?')) {
      deleteCounselor(counselorToDelete);
    }
  };

  const onCounselorEditClicked = (counselorToEdit: Counselor) => {
    if (isUpdateCounselorAllowed) {
      setModalCounselor(counselorToEdit);
      setIsEditCounselorDialogOpen(true);
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
      <Typography variant="h3">Counselors</Typography>
      <>
        {isCreateCounselorAllowed && (
          <>
            <Box sx={{ mb: 2, mt: 2 }} justifyContent="center" display="flex">
              <Button
                variant="contained"
                endIcon={<Add />}
                onClick={() => {
                  setIsCreateCounselorDialogOpen(true);
                }}
              >
                Add Counselor
              </Button>
            </Box>
            <CounselorDialog
              title={'Create Counselor'}
              isOpen={isCreateCounselorDialogOpen}
              onCounselorAdded={handleCounselorAdded}
              onClose={() => setIsCreateCounselorDialogOpen(false)}
              initialCounselor={emptyCounselor}
            />
          </>
        )}
        {isUpdateCounselorAllowed && (
          <CounselorDialog
            title={'Edit Counselor'}
            isOpen={isEditCounselorDialogOpen}
            onCounselorAdded={handleCounselorEdited}
            onClose={() => setIsEditCounselorDialogOpen(false)}
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
