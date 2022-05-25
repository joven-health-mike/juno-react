// Copyright 2022 Social Fabric, LLC

import React from "react";

const SchoolDetails = ({ school }) => {
  return (
    <>
      <label>
        Name:
        <h1>{school.name}</h1>
      </label>
      <label>
        Email:
        <p>{school.email}</p>
      </label>
      <label>
        Facilitators:
        {school.facilitators.map((facilitatorName) => (
          <p>{facilitatorName}</p>
        ))}
      </label>
    </>
  );
};

export default SchoolDetails;
