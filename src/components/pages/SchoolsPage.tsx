// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { School, SchoolsContext } from '../../data/schools';
import CreateSchoolForm from '../forms/CreateSchoolForm';
import Navbar from '../navbar/Navbar';
import SchoolsTable from '../tables/SchoolsTable';

const SchoolsPage = () => {
  const {
    data: schools,
    add: addSchool,
    delete: deleteSchool,
  } = useContext(SchoolsContext);

  const onFormSubmit = (school: School) => {
    addSchool(school);
  };

  const onSchoolDeleteClicked = (schoolName: string) => {
    if (window.confirm('Delete this user?')) {
      let schoolToDelete = schools.find(school => school.name === schoolName);
      if (schoolToDelete) {
        deleteSchool(schoolToDelete);
      }
    }
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Schools</h1>
      <>
        <CreateSchoolForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <SchoolsTable onDeleteClicked={onSchoolDeleteClicked} />
      </>
    </div>
  );
};

export default SchoolsPage;
