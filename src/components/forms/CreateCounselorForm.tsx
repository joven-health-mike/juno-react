// Copyright 2022 Social Fabric, LLC

import React, { useState } from 'react';
import { Counselor } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';

type CreateCounselorFormProps = {
  defaultCounselor?: Counselor;
  onSubmit: (counselor: Counselor) => void;
  onCancel: () => void;
};

const CreateCounselorForm: React.FC<CreateCounselorFormProps> = ({
  defaultCounselor,
  onSubmit,
  onCancel,
}: CreateCounselorFormProps) => {
  const emptyCounselor = {
    name: '',
    email: '',
    roomLink: '',
    assignedSchools: [],
  };

  const [counselor, setCounselor] = useState(
    defaultCounselor ?? emptyCounselor
  );

  const onSchoolChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const schoolName = event.target.value;
    event.target.checked = toggleSchoolName(schoolName);
  };

  const isSchoolChecked = (schoolName: string) => {
    return counselor.assignedSchools.includes(schoolName);
  };

  const toggleSchoolName = (schoolName: string) => {
    const exists = isSchoolChecked(schoolName);

    if (exists) {
      removeSchool(schoolName);
    } else {
      addSchool(schoolName);
    }
    return !exists;
  };

  const addSchool = (schoolName: string) => {
    let newAssignedSchools = [...counselor.assignedSchools];
    newAssignedSchools.push(schoolName);
    setCounselor({ ...counselor, assignedSchools: newAssignedSchools });
  };

  const removeSchool = (schoolName: string) => {
    let newAssignedSchools = counselor.assignedSchools.filter(
      school => school !== schoolName
    );
    setCounselor({ ...counselor, assignedSchools: newAssignedSchools });
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(counselor);
  };

  const onFormCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setCounselor(emptyCounselor);
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
            value={counselor.name}
            required
            onChange={e => setCounselor({ ...counselor, name: e.target.value })}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={counselor.email}
            required
            onChange={e =>
              setCounselor({ ...counselor, email: e.target.value })
            }
          />
        </label>
        <label>
          Room Link
          <input
            type="text"
            placeholder="Room Link"
            name="roomLink"
            value={counselor.roomLink}
            required
            onChange={e =>
              setCounselor({ ...counselor, roomLink: e.target.value })
            }
          />
        </label>
        <label>
          Associated Schools:{' '}
          <div>
            <SchoolsContext.Consumer>
              {value =>
                value.schools.map((school, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={isSchoolChecked(school.name)}
                      value={school.name}
                      onChange={onSchoolChecked}
                    />
                    {school.name}
                  </label>
                ))
              }
            </SchoolsContext.Consumer>
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

export default CreateCounselorForm;
