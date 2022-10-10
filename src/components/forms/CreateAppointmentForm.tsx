// Copyright 2022 Social Fabric, LLC

import React, { FormEvent, MouseEvent, useContext, useState } from 'react';
import {
  Appointment,
  emptyAppointment,
  AppointmentType,
} from '../../data/appointments';
import { Counselor, CounselorsContext } from '../../data/counselors';
import { UsersContext } from '../../data/users';
import DateSelector from '../dateSelector/DateSelector';
import { SelectCounselorList, SelectTypeList } from '../selectList/SelectList';

type CreateAppointmentFormProps = {
  defaultAppointment?: Appointment;
  onSubmit: (appointment: Appointment) => void;
  onCancel: () => void;
};

const CreateAppointmentForm: React.FC<CreateAppointmentFormProps> = ({
  defaultAppointment,
  onSubmit,
  onCancel,
}) => {
  const [appointment, setAppointment] = useState<Appointment>(
    defaultAppointment ?? emptyAppointment
  );
  const [counselorSelectionIndex, setCounselorSelectionIndex] =
    useState<number>(-1);
  const [typeSelection, setTypeSelection] = useState<AppointmentType>({
    id: -1,
    name: 'Unselected',
    color: 'none',
  });

  const { data: counselors } = useContext(CounselorsContext);
  const { data: users } = useContext(UsersContext);

  const onCounselorChanged = (counselor: Counselor) => {
    setCounselorSelectionIndex(counselors.indexOf(counselor));
    setAppointment({ ...appointment, counselorId: counselor.id });
  };

  const onTypeChanged = (type: AppointmentType) => {
    setTypeSelection(type);
    setAppointment({
      ...appointment,
      type: type.name,
    });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedAppointment = defaultAppointment
      ? appointment
      : {
          ...appointment,
          id: '-1',
          title: 'Appointment',
          schoolId: '0',
          // title:
          //   studentSelection.first_name +
          //   ' ' +
          //   studentSelection.last_name.substring(0, 1) +
          //   ' (' +
          //   getAssociatedSchool(studentSelection).name +
          //   ')',
          participants: [users[0]],
          status: 'SCHEDULED',
        };
    onSubmit(submittedAppointment);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setCounselorSelectionIndex(-1);
    setAppointment(emptyAppointment);
    onCancel();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Start Time
        <DateSelector
          selected={new Date(appointment.start)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, start: date })
          }
          label={'Start Time'}
        />
      </label>
      <label>
        End Time
        <DateSelector
          selected={new Date(appointment.end)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, end: date })
          }
          label={'End Time'}
        />
      </label>
      <label>
        Counselor:{' '}
        <SelectCounselorList
          value={counselorSelectionIndex}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        Type{' '}
        <SelectTypeList
          value={typeSelection.id}
          onTypeChanged={onTypeChanged}
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
  );
};

export default CreateAppointmentForm;
