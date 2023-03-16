// Copyright 2022 Social Fabric, LLC

import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {
  createPermission,
  deletePermission,
  updatePermission,
} from '../../auth/permissions';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import { LoggedInUserContext } from '../../data/users';
import SchoolDialog from '../modals/SchoolDialog';
import Navbar from '../navbar/Navbar';
import SchoolsTable from '../tables/SchoolsTable';

const SchoolsPage = () => {
  const {
    add: addSchool,
    delete: deleteSchool,
    update: updateSchool,
  } = useContext(SchoolsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateSchoolDialogOpen, setIsCreateSchoolDialogOpen] =
    useState<boolean>(false);
  const [isEditSchoolDialogOpen, setIsEditSchoolDialogOpen] =
    useState<boolean>(false);
  const [modalSchool, setModalSchool] = useState<School>(emptySchool);
  const [isCreateSchoolAllowed, setIsCreateSchoolAllowed] =
    useState<boolean>(false);
  const [isDeleteSchoolAllowed, setIsDeleteSchoolAllowed] =
    useState<boolean>(false);
  const [isUpdateSchoolAllowed, setIsUpdateSchoolAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCreateSchoolAllowed(createPermission(loggedInUser.role, 'school'));
    setIsDeleteSchoolAllowed(deletePermission(loggedInUser.role, 'school'));
    setIsUpdateSchoolAllowed(updatePermission(loggedInUser.role, 'school'));
  }, [loggedInUser.role]);

  const handleSchoolAdded = (schoolToAdd: School) => {
    if (isCreateSchoolAllowed) {
      addSchool(schoolToAdd);
    }
  };

  const handleSchoolEdited = (schoolToAdd: School) => {
    if (isUpdateSchoolAllowed) {
      updateSchool(schoolToAdd);
    }
  };

  const onSchoolDeleteClicked = (schoolToDelete: School) => {
    if (isDeleteSchoolAllowed && window.confirm('Delete this school?')) {
      deleteSchool(schoolToDelete);
    }
  };

  const onSchoolEditClicked = (schoolToEdit: School) => {
    setModalSchool(schoolToEdit);
    setIsEditSchoolDialogOpen(true);
  };

  const onSchoolEmailClicked = (schoolToEmail: School) => {
    window.open(`mailto:${schoolToEmail.primaryEmail}`);
  };

  const onSchoolFileOpenClicked = (schoolToOpenFile: School) => {
    window.open(schoolToOpenFile.docsUrl);
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Typography variant="h3">Schools</Typography>
      <>
        {isCreateSchoolAllowed && (
          <>
            <Button
              variant="contained"
              endIcon={<Add />}
              onClick={() => {
                setIsCreateSchoolDialogOpen(true);
              }}
            >
              Add School
            </Button>
            <SchoolDialog
              isOpen={isCreateSchoolDialogOpen}
              onSchoolAdded={handleSchoolAdded}
              onClose={() => setIsCreateSchoolDialogOpen(false)}
              initialSchool={emptySchool}
              title="Create School"
            />
          </>
        )}
        {isUpdateSchoolAllowed && (
          <SchoolDialog
            isOpen={isEditSchoolDialogOpen}
            onSchoolAdded={handleSchoolEdited}
            onClose={() => setIsEditSchoolDialogOpen(false)}
            initialSchool={modalSchool}
            title="Edit School"
          />
        )}
        <SchoolsTable
          onDeleteClicked={onSchoolDeleteClicked}
          onEditClicked={onSchoolEditClicked}
          onEmailClicked={onSchoolEmailClicked}
          onOpenFileClicked={onSchoolFileOpenClicked}
        />
      </>
    </>
  );
};

export default SchoolsPage;
