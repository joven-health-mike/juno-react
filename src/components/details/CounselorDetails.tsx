// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Counselor } from '../../data/counselors';
import { User } from '../../data/users';
import UserDetails from './UserDetails';

type CounselorDetailsProps = {
  counselor: Counselor;
};

const CounselorDetails: React.FC<CounselorDetailsProps> = ({ counselor }) => {
  return (
    <>
      <UserDetails user={counselor as User} />
      <p data-testid={'roomLink'}>
        Room Link: {counselor.counselorRef.roomLink}
      </p>
    </>
  );
};

export default CounselorDetails;
