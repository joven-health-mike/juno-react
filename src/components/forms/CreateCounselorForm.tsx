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
  const { data: counselors } = useContext(CounselorsContext);

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

  const onChangeRoomLink = (e: ChangeEvent<HTMLInputElement>) => {
    counselor.counselorRef.roomLink = e.target.value;
    setCounselor(counselor);
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>
          First Name
          <input
            data-testid={'input-first-name'}
            type="text"
            placeholder="First Name"
            name="firstName"
            value={counselor.firstName}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, firstName: e.target.value });
            }}
          />
        </label>
        <label>
          Last Name
          <input
            data-testid={'input-last-name'}
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={counselor.lastName}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, lastName: e.target.value });
            }}
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
            value={counselor.counselorRef.roomLink}
            required
            onChange={onChangeRoomLink}
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
