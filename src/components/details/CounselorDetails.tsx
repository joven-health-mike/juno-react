// Copyright 2022 Social Fabric, LLC

import { Typography } from '@mui/material';
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
      <Typography>
        Room Link:{' '}
        <Link href={counselor.counselorRoomLink}>
          {counselor.counselorRoomLink}
        </Link>
      </Typography>
    </>
  );
};

export default CounselorDetails;
