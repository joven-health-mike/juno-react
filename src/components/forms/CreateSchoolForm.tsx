// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { emptySchool, School } from '../../data/schools';
import {
  buttonStyles,
  formStyles,
  inputStyles,
  labelStyles,
} from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

const Form = styled.form`
  ${formStyles}
`;

const Input = styled.input`
  ${inputStyles}
`;

const Label = styled.label`
  ${labelStyles}
`;

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
      <Form onSubmit={onFormSubmit}>
        <Label>
          Name:{' '}
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={school.name}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, name: e.target.value })
            }
          />
        </Label>
        <Label>
          Address:{' '}
          <Input
            type="text"
            placeholder="Address"
            name="address"
            value={school.address}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, address: e.target.value })
            }
          />
        </Label>
        <Label>
          City:{' '}
          <Input
            type="text"
            placeholder="City"
            name="city"
            value={school.city}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, city: e.target.value })
            }
          />
        </Label>
        <Label>
          State:{' '}
          <Input
            type="text"
            placeholder="State"
            name="state"
            value={school.state}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, state: e.target.value })
            }
          />
        </Label>
        <Label>
          Zip Code:{' '}
          <Input
            type="text"
            placeholder="Zip Code"
            name="zip"
            value={school.zip}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, zip: e.target.value })
            }
          />
        </Label>
        <Label>
          Email:{' '}
          <Input
            type="email"
            placeholder="Email"
            name="primaryEmail"
            value={school.primaryEmail}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, primaryEmail: e.target.value })
            }
          />
        </Label>
        <Label>
          Phone Number:{' '}
          <Input
            type="text"
            placeholder="Phone Number"
            name="primaryPhone"
            value={school.primaryPhone}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSchool({ ...school, primaryPhone: e.target.value })
            }
          />
        </Label>
        <Label>
          Docs URL:{' '}
          <Input
            type="URL"
            placeholder="Docs URL"
            name="docsUrl"
            value={school.docsUrl}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSchool({ ...school, docsUrl: e.target.value });
            }}
          />
        </Label>

        <Button type="submit">Submit</Button>
        <Button type="button" onClick={onFormCancel}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default CreateSchoolForm;
