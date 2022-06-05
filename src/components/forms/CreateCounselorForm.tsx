// Copyright 2022 Social Fabric, LLC

import React, { SyntheticEvent, useContext, useState } from 'react';
import {
  Counselor,
  CounselorsContext,
  emptyCounselor,
} from '../../data/counselors';

type CreateCounselorFormProps = {
  defaultCounselor?: Counselor;
  onSubmit: (counselor: Counselor) => void;
  onCancel: () => void;
};

const CreateCounselorForm: React.FC<CreateCounselorFormProps> = ({
  defaultCounselor,
  onSubmit,
  onCancel,
}) => {
  const [counselor, setCounselor] = useState(
    defaultCounselor ?? emptyCounselor
  );
  const { counselors } = useContext(CounselorsContext);

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ ...counselor, _id: counselors.length });
  };

  const onFormCancel = (e: SyntheticEvent) => {
    e.preventDefault();
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

        <button type="submit">Submit</button>
        <button type="button" onClick={onFormCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default CreateCounselorForm;
