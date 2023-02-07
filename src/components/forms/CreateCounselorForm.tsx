// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Counselor, emptyCounselor } from '../../data/counselors';
import { Role } from '../../services/user.service';
import { AvailableTimeZone, TIME_ZONES } from '../../utils/DateUtils';
import SelectList from '../selectList/SelectList';
import { buttonStyles, formStyles } from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

const Form = styled.form`
  ${formStyles}
`;

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
  const [roomLink, setRoomLink] = useState<string>('');

  useEffect(() => {
    if (defaultCounselor && defaultCounselor.counselorRoomLink) {
      setCounselor(defaultCounselor);
      setRoomLink(defaultCounselor.counselorRoomLink);
    }
  }, [defaultCounselor]);

  const onTimeZoneChanged = (timeZone: string) => {
    setCounselor({ ...counselor, timeZoneIanaName: timeZone });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedCounselor = defaultCounselor ? counselor : { ...counselor };
    submittedCounselor.role = 'COUNSELOR' as Role;
    submittedCounselor.counselorRoomLink = roomLink;
    onSubmit(submittedCounselor);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setCounselor(emptyCounselor);
    onCancel();
  };

  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <label>
          First Name:{' '}
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
          Last Name:{' '}
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
          Email:{' '}
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
          Username:{' '}
          <input
            data-testid={'input-username'}
            type="text"
            placeholder="Username"
            name="username"
            value={counselor.username}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, username: e.target.value });
            }}
          />
        </label>
        <label>
          Phone:{' '}
          <input
            data-testid={'input-phone'}
            type="phone"
            placeholder="Phone"
            name="phone"
            value={counselor.phone}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, phone: e.target.value });
            }}
          />
        </label>
        <label>
          Docs URL:{' '}
          <input
            data-testid={'input-docsUrl'}
            type="URL"
            placeholder="Docs URL"
            name="docsUrl"
            value={counselor.docsUrl}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, docsUrl: e.target.value });
            }}
          />
        </label>
        <label>
          Room Link:{' '}
          <input
            data-testid={'input-roomLink'}
            type="URL"
            placeholder="Room Link"
            name="counselorRoomLink"
            value={roomLink}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setRoomLink(e.target.value);
            }}
          />
        </label>
        <label>
          Time Zone:{' '}
          <SelectList
            labelText="Select a Time Zone"
            items={TIME_ZONES}
            value={TIME_ZONES.indexOf(counselor.timeZoneIanaName || '')}
            onItemChanged={item => {
              return onTimeZoneChanged(
                TIME_ZONES[parseInt(item)] as AvailableTimeZone
              );
            }}
          />
        </label>

        <Button type="submit" data-testid={'button-submit'}>
          Submit
        </Button>
        <Button
          type="button"
          data-testid={'button-cancel'}
          onClick={onFormCancel}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default CreateCounselorForm;
