// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { School } from '../../data/schools';

type SchoolDetailsProps = {
  school: School;
};

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ school }) => {
  return (
    <>
      <h2>{school.name}</h2>
      <p>ID: {school._id}</p>
      <p>Email: {school.email}</p>
    </>
  );
};

export default SchoolDetails;
