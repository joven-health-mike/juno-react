// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { School, SchoolsContext } from '../../data/schools';
import CreateSchoolModal from '../modals/CreateSchoolModal';
import Navbar from '../navbar/Navbar';
import SchoolsTable from '../tables/SchoolsTable';

const SchoolsPage = () => {
  const {
    add: addSchool,
    delete: deleteSchool,
    update: updateSchool,
  } = useContext(SchoolsContext);
  const [isCreateSchoolModalOpen, setIsCreateSchoolModalOpen] =
    useState<boolean>(false);

  const onFormSubmit = (schoolToAdd: School) => {
    addSchool(schoolToAdd);
  };

  const onSchoolDeleteClicked = (schoolToDelete: School) => {
    if (window.confirm('Delete this user?')) {
      deleteSchool(schoolToDelete);
    }
  };

  const onSchoolEditClicked = (schoolToEdit: School) => {
    updateSchool(schoolToEdit);
  };

  const onSchoolEmailClicked = (schoolToEmail: School) => {
    window.location.href = 'mailto:' + schoolToEmail.primaryEmail;
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Schools</h1>
      <>
        <button type="button" onClick={() => setIsCreateSchoolModalOpen(true)}>
          Add School
        </button>
        <CreateSchoolModal
          isOpen={isCreateSchoolModalOpen}
          onSchoolAdded={onFormSubmit}
          onClose={() => setIsCreateSchoolModalOpen(false)}
        />
        <SchoolsTable
          onDeleteClicked={onSchoolDeleteClicked}
          onEditClicked={onSchoolEditClicked}
          onEmailClicked={onSchoolEmailClicked}
        />
      </>
    </div>
  );
};

export default SchoolsPage;
