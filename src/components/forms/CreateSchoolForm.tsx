// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { emptySchool, School, SchoolsContext } from '../../data/schools';

type CreateSchoolFormProps = {
  defaultSchool?: School;
  onSubmit: (school: School) => void;
  onCancel: () => void;
};

const CreateSchoolForm: React.FC<CreateSchoolFormProps> = ({
  defaultSchool,
  onSubmit,
  onCancel,
}) => {
  const [school, setSchool] = useState(defaultSchool ?? emptySchool);
  const { schools } = useContext(SchoolsContext);

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ ...school, _id: schools.length });
  };

  const onFormCancel = (e: any) => {
    e.preventDefault();
    setSchool(emptySchool);
    onCancel();
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={school.name}
            required
            onChange={e => setSchool({ ...school, name: e.target.value })}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={school.email}
            required
            onChange={e => setSchool({ ...school, email: e.target.value })}
          />
        </label>

        <button type="submit">Submit</button>
        <button type="button" onClick={onFormCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default CreateSchoolForm;
