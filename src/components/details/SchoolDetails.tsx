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
      <p data-testid={'id'}>ID: {school.id}</p>
      <p data-testid={'email'}>Email: {school.primaryEmail}</p>
      <p data-testid={'email'}>Phone: {school.primaryPhone}</p>
      <p data-testid={'address'}>Address: {school.address}</p>
      <p data-testid={'state'}>State: {school.state}</p>
      <p data-testid={'email'}>Zip: {school.zip}</p>
    </>
  );
};

export default SchoolDetails;
