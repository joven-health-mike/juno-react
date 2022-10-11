// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { School } from '../../data/schools';
import SchoolDetails from '../details/SchoolDetails';
import Navbar from '../navbar/Navbar';

type SchoolDetailPageProps = {
  school: School;
};

const SchoolDetailPage: React.FC<SchoolDetailPageProps> = ({ school }) => {
  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>School Details</h1>
      <SchoolDetails school={school} />
    </div>
  );
};

export default SchoolDetailPage;
