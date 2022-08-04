// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Counselor } from '../../data/counselors';

type CounselorDetailsProps = {
  counselor: Counselor;
};

const CounselorDetails: React.FC<CounselorDetailsProps> = ({ counselor }) => {
  return (
    <>
      <h2 data-testid={'name'}>{counselor.name}</h2>
      <p data-testid={'id'}>ID: {counselor._id}</p>
      <p data-testid={'email'}>Email: {counselor.email}</p>
      <p data-testid={'roomLink'}>Room Link: {counselor.roomLink}</p>
    </>
  );
};

export default CounselorDetails;
