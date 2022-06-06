// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Counselor } from '../../data/counselors';

type CounselorDetailsProps = {
  counselor: Counselor;
};

const CounselorDetails: React.FC<CounselorDetailsProps> = ({ counselor }) => {
  return (
    <>
      <h2>{counselor.name}</h2>
      <p>{counselor._id}</p>
      <p>{counselor.email}</p>
      <p>{counselor.roomLink}</p>
    </>
  );
};

export default CounselorDetails;
