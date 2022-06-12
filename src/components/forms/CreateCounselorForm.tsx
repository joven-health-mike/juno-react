// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import {
  Counselor,
  CounselorsContext,
  emptyCounselor,
  ICounselorsContext,
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
  const [counselor, setCounselor] = useState<Counselor>(
    defaultCounselor ?? emptyCounselor
  );
  const { counselors } = useContext<ICounselorsContext>(CounselorsContext);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedCounselor = defaultCounselor
      ? counselor
      : { ...counselor, _id: counselors.length };
    onSubmit(submittedCounselor);
  };

  const onFormCancel = (e: MouseEvent) => {
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
            data-testid={'input-name'}
            type="text"
            placeholder="Name"
            name="name"
            value={counselor.name}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCounselor({ ...counselor, name: e.target.value })
            }
          />
        </label>
        <label>
          Email
          <input
            data-testid={'input-email'}
            type="email"
            placeholder="Email"
            name="email"
            value={counselor.email}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCounselor({ ...counselor, email: e.target.value })
            }
          />
        </label>
        <label>
          Room Link
          <input
            data-testid={'input-roomLink'}
            type="text"
            placeholder="Room Link"
            name="roomLink"
            value={counselor.roomLink}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCounselor({ ...counselor, roomLink: e.target.value })
            }
          />
        </label>

        <button type="submit" data-testid={'button-submit'}>
          Submit
        </button>
        <button
          type="button"
          data-testid={'button-cancel'}
          onClick={onFormCancel}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default CreateCounselorForm;
