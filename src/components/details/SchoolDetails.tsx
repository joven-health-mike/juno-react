// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { linkStyles } from '../styles/mixins';
import { School } from '../../data/schools';
import { Typography } from '@mui/material';

const Link = styled.a`
  ${linkStyles}
`;

type SchoolDetailsProps = {
  school: School;
};

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ school }) => {
  return (
    <>
      <Typography variant="h4">{school.name}</Typography>
      <Typography>Email: {school.primaryEmail}</Typography>
      <Typography>Phone: {school.primaryPhone}</Typography>
      <Typography>
        Address:{' '}
        {`${school.address}\n${school.city}, ${school.state} ${school.zip}`}
      </Typography>
      <Typography>
        Docs URL: <Link href={school.docsUrl}>{school.docsUrl}</Link>
      </Typography>
    </>
  );
};

export default SchoolDetails;
