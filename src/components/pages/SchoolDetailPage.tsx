// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { School } from '../../data/schools';
import SchoolDetails from '../details/SchoolDetails';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';

type SchoolDetailPageProps = {
  school: School;
};

const SchoolDetailPage: React.FC<SchoolDetailPageProps> = ({ school }) => {
  const role = 'admin';

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>School Details</h1>
      <SchoolDetails school={school} />
    </div>
  );
};

export default SchoolDetailPage;
