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
      <p>ID: {counselor._id}</p>
      <p>Email: {counselor.email}</p>
      <p>Room Link: {counselor.roomLink}</p>
    </>
  );
};

export default CounselorDetails;
