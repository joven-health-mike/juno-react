// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { linkStyles } from '../styles/mixins';
import { School } from '../../data/schools';

const Link = styled.a`
  ${linkStyles}
`;

type SchoolDetailsProps = {
  school: School;
};

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ school }) => {
  return (
    <>
      <h2>{school.name}</h2>
      <p>Email: {school.primaryEmail}</p>
      <p data-testid={'phone'}>Phone: {school.primaryPhone}</p>
      <p data-testid={'fullAddress'}>
        Address:{' '}
        {`${school.address}\n${school.city}, ${school.state} ${school.zip}`}
      </p>
      <p data-testid={'docsUrl'}>
        Docs URL: <Link href={school.docsUrl}>{school.docsUrl}</Link>
      </p>
    </>
  );
};

export default SchoolDetails;
