// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import CreateSchoolModal from '../modals/CreateSchoolModal';
import EditSchoolModal from '../modals/EditSchoolModal';
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
  const [isEditSchoolModalOpen, setIsEditSchoolModalOpen] =
    useState<boolean>(false);
  const [modalSchool, setModalSchool] = useState<School>(emptySchool);

  const handleSchoolAdded = (schoolToAdd: School) => {
    addSchool(schoolToAdd);
  };

  const handleSchoolEdited = (schoolToAdd: School) => {
    updateSchool(schoolToAdd);
  };

  const onSchoolDeleteClicked = (schoolToDelete: School) => {
    if (window.confirm('Delete this user?')) {
      deleteSchool(schoolToDelete);
    }
  };

  const onSchoolEditClicked = (schoolToEdit: School) => {
    setModalSchool(schoolToEdit);
    setIsEditSchoolModalOpen(true);
  };

  const onSchoolEmailClicked = (schoolToEmail: School) => {
    window.open(`mailto:${schoolToEmail.primaryEmail}`);
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
          onSchoolAdded={handleSchoolAdded}
          onClose={() => setIsCreateSchoolModalOpen(false)}
        />
        <EditSchoolModal
          isOpen={isEditSchoolModalOpen}
          onSchoolEdited={handleSchoolEdited}
          onClose={() => setIsEditSchoolModalOpen(false)}
          initialSchool={modalSchool}
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
