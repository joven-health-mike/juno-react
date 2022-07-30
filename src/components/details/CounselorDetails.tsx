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
      <p data-testid={'id'}>{counselor._id}</p>
      <p data-testid={'email'}>{counselor.email}</p>
      <p data-testid={'roomLink'}>{counselor.roomLink}</p>
    </>
  );
};

export default CounselorDetails;
