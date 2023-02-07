// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { Counselor } from '../../data/counselors';
import { User } from '../../data/users';
import { linkStyles } from '../styles/mixins';
import UserDetails from './UserDetails';

const Link = styled.a`
  ${linkStyles}
`;

type CounselorDetailsProps = {
  counselor: Counselor;
};

const CounselorDetails: React.FC<CounselorDetailsProps> = ({ counselor }) => {
  return (
    <>
      <UserDetails user={counselor as User} />
      <p data-testid={'roomLink'}>
        Room Link:{' '}
        <Link href={counselor.counselorRoomLink}>
          {counselor.counselorRoomLink}
        </Link>
      </p>
    </>
  );
};

export default CounselorDetails;
