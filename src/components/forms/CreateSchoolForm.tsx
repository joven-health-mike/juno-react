// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { emptySchool, School } from '../../data/schools';

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
  const [school, setSchool] = useState<School>(defaultSchool ?? emptySchool);

  useEffect(() => {
    if (defaultSchool) {
      setSchool(defaultSchool);
    }
  }, [defaultSchool]);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedSchool = defaultSchool ? school : { ...school, id: '-1' };
    onSubmit(submittedSchool);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setSchool(emptySchool);
    onCancel();
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>
          Name:
          <input
            data-testid={'input-name'}
            type="text"
            placeholder="Name"
            name="name"
            value={school.name}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, name: e.target.value })
            }
          />
        </label>
        <label>
          Address:
          <input
            data-testid={'input-address'}
            type="text"
            placeholder="Address"
            name="address"
            value={school.address}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, address: e.target.value })
            }
          />
        </label>
        <label>
          City:
          <input
            data-testid={'input-city'}
            type="text"
            placeholder="City"
            name="city"
            value={school.city}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, city: e.target.value })
            }
          />
        </label>
        <label>
          State:
          <input
            data-testid={'input-state'}
            type="text"
            placeholder="State"
            name="state"
            value={school.state}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, state: e.target.value })
            }
          />
        </label>
        <label>
          Zip Code:
          <input
            data-testid={'input-zip'}
            type="text"
            placeholder="Zip Code"
            name="zip"
            value={school.zip}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, zip: e.target.value })
            }
          />
        </label>
        <label>
          Email:
          <input
            data-testid={'input-email'}
            type="email"
            placeholder="Email"
            name="primaryEmail"
            value={school.primaryEmail}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, primaryEmail: e.target.value })
            }
          />
        </label>
        <label>
          Phone Number
          <input
            data-testid={'input-phone'}
            type="text"
            placeholder="Phone Number"
            name="primaryPhone"
            value={school.primaryPhone}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, primaryPhone: e.target.value })
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

export default CreateSchoolForm;
