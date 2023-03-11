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
import { School } from '../../data/schools';
import { Role } from '../../services/user.service';
import { AvailableTimeZone, TIME_ZONES } from '../../utils/DateUtils';
import SelectList, { SelectMultipleSchoolList } from '../selectList/SelectList';
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
  const [roomLink2, setRoomLink2] = useState<string>('');
  const [assignedSchools, setAssignedSchools] = useState<School[]>([]);

  useEffect(() => {
    if (defaultCounselor && defaultCounselor.counselorRoomLink) {
      setCounselor(defaultCounselor);
      setRoomLink(defaultCounselor.counselorRoomLink);
    }
    if (defaultCounselor && defaultCounselor.counselorRoomLink2) {
      setCounselor(defaultCounselor);
      setRoomLink2(defaultCounselor.counselorRoomLink2);
    }
    if (defaultCounselor?.counselorAssignedSchools) {
      setAssignedSchools(defaultCounselor.counselorAssignedSchools);
    }
  }, [defaultCounselor]);

  const onTimeZoneChanged = (timeZone: string) => {
    setCounselor({ ...counselor, timeZoneIanaName: timeZone });
  };

  const handleAssignedSchoolsChanged = (schools: School[]) => {
    setAssignedSchools(schools);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedCounselor = defaultCounselor ? counselor : { ...counselor };
    submittedCounselor.role = 'COUNSELOR' as Role;
    submittedCounselor.counselorRoomLink = roomLink;
    submittedCounselor.counselorRoomLink2 = roomLink2;
    submittedCounselor.counselorAssignedSchools = assignedSchools;
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
        <Label>
          First Name:{' '}
          <Input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={counselor.firstName}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, firstName: e.target.value });
            }}
          />
        </Label>
        <Label>
          Last Name:{' '}
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={counselor.lastName}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, lastName: e.target.value });
            }}
          />
        </Label>
        <Label>
          Email:{' '}
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={counselor.email}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCounselor({ ...counselor, email: e.target.value })
            }
          />
        </Label>
        <Label>
          Username:{' '}
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={counselor.username}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, username: e.target.value });
            }}
          />
        </Label>
        <Label>
          Phone:{' '}
          <Input
            type="phone"
            placeholder="Phone"
            name="phone"
            value={counselor.phone}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, phone: e.target.value });
            }}
          />
        </Label>
        <Label>
          Docs URL:{' '}
          <Input
            type="URL"
            placeholder="Docs URL"
            name="docsUrl"
            value={counselor.docsUrl}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, docsUrl: e.target.value });
            }}
          />
        </Label>
        <Label>
          Room Link:{' '}
          <Input
            type="URL"
            placeholder="Room Link"
            name="counselorRoomLink"
            value={roomLink}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setRoomLink(e.target.value);
            }}
          />
        </Label>
        <Label>
          Room Link 2:{' '}
          <Input
            type="URL"
            placeholder="Room Link 2"
            name="counselorRoomLink2"
            value={roomLink2}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setRoomLink2(e.target.value);
            }}
          />
        </Label>
        <Label>
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
        </Label>
        <Label>
          Schools:{' '}
          <SelectMultipleSchoolList
            selectedSchools={assignedSchools}
            onSchoolsChanged={handleAssignedSchoolsChanged}
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

export default CreateCounselorForm;
