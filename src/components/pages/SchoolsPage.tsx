// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { School, SchoolsContext } from '../../data/schools';
import CreateSchoolForm from '../forms/CreateSchoolForm';
import Navbar from '../navbar/Navbar';
import SchoolsTable from '../tables/SchoolsTable';

const SchoolsPage = () => {
  const {
    add: addSchool,
    delete: deleteSchool,
    update: updateSchool,
  } = useContext(SchoolsContext);

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
        <CreateSchoolForm onSubmit={onFormSubmit} onCancel={() => {}} />
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
