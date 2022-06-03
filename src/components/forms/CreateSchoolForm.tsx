// Copyright 2022 Social Fabric, LLC

import React, { FormEvent, useRef, useState } from 'react';
import { School } from '../../data/schools';
import XButton from '../buttons/XButton';

type CreateSchoolFormProps = {
  defaultSchool?: School;
  onSubmit: (school: School) => void;
  onCancel: () => void;
};

const CreateSchoolForm: React.FC<CreateSchoolFormProps> = ({
  defaultSchool,
  onSubmit,
  onCancel,
}: CreateSchoolFormProps) => {
  const emptySchool = {
    name: '',
    email: '',
    facilitators: [],
  };

  const [school, setSchool] = useState(defaultSchool ?? emptySchool);

  const onAddFacilitator = (facilitator: string) => {
    let newFacilitators = school.facilitators;
    newFacilitators.push(facilitator);

    setSchool({ ...school, facilitators: newFacilitators });
  };

  const onDeleteFacilitator = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    let newFacilitators = school.facilitators.filter(
      facilitatorName => facilitatorName !== event.currentTarget.value
    );

    setSchool({ ...school, facilitators: newFacilitators });
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(school);
  };

  const onFormCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
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
        <label>
          Facilitators
          <div>
            {school.facilitators.map((facilitatorName, index) => {
              return (
                <div key={index}>
                  <p>{facilitatorName}</p>
                  <XButton
                    type="button"
                    value={facilitatorName}
                    onClick={onDeleteFacilitator}
                  />
                </div>
              );
            })}
            <FacilitatorInput onAddFacilitator={onAddFacilitator} />
          </div>
        </label>

        <button type="submit">Submit</button>
        <button type="button" onClick={onFormCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};

// a separate component to hold the facilitator input box and + button
type FacilitatorInputProps = {
  onAddFacilitator: (facilitator: string) => void;
};

const FacilitatorInput: React.FC<FacilitatorInputProps> = ({
  onAddFacilitator,
}: FacilitatorInputProps) => {
  const textBox = useRef<HTMLInputElement>(null);

  const onFormSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (textBox && textBox.current) {
      const facilitatorName = textBox.current.value;
      onAddFacilitator(facilitatorName);
      textBox.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={textBox}
        type="text"
        placeholder="Facilitator Name"
        name="facilitatorName"
      />
      // TODO create + button component like XButton
      <button type="button" onClick={onFormSubmit}>
        +
      </button>
    </>
  );
};

export default CreateSchoolForm;
