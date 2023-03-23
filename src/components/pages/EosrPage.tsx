// Copyright 2023 Social Fabric, LLC

import React from 'react';
import Navbar from '../navbar/Navbar';

const EosrPage: React.FC = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <iframe
        title="End-of-Session Report"
        src="eosr-jotform.htm"
        style={{
          width: '100%',
          height: '750px',
        }}
      />
    </>
  );
};

export default EosrPage;
