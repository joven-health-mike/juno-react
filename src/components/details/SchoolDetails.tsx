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
      <p data-testid={'email'}>Email: {school.primaryEmail}</p>
      <p data-testid={'phone'}>Phone: {school.primaryPhone}</p>
      <p data-testid={'fullAddress'}>
        Address:{' '}
        {`${school.address}\n${school.city}, ${school.state} ${school.zip}`}
      </p>
    </>
  );
};

export default SchoolDetails;
