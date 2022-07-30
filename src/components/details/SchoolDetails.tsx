// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { School } from '../../data/schools';

type SchoolDetailsProps = {
  school: School;
};

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ school }) => {
  return (
    <>
      <h2 data-testid={'name'}>{school.name}</h2>
      <p data-testid={'id'}>ID: {school._id}</p>
      <p data-testid={'email'}>Email: {school.email}</p>
    </>
  );
};

export default SchoolDetails;
