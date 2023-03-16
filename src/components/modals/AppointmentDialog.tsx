// Copyright 2022 Social Fabric, LLC

import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Appointment,
  APPOINTMENT_STATUSES,
  APPOINTMENT_TYPES,
  emptyAppointment,
} from '../../data/appointments';
import { emptyCounselor, getCounselors } from '../../data/counselors';
import { emptySchool, School, SchoolsContext } from '../../data/schools';
import { LoggedInUserContext, User, UsersContext } from '../../data/users';
import DateSelector from '../dateSelector/DateSelector';
import MaterialDialog from './MaterialDialog';

type AppointmentDialogProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onAppointmentAdded: (appointment: Appointment) => void;
  readonly initialAppointment: Appointment;
};

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  title,
  isOpen,
  onClose,
  onAppointmentAdded,
  initialAppointment,
}) => {
  const [appointment, setAppointment] = useState(initialAppointment);
  const [duration, setDuration] = useState(30);
  const [participantNames, setParticipantNames] = useState<string[]>([]);
  const DURATIONS = ['15', '30', '45', '60', '75', '90'];
  const { data: users } = useContext(UsersContext);
  const { data: schools } = useContext(SchoolsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const [filteredUserNames, setFilteredUserNames] = useState<string[]>([]);
  const [shouldShowCounselorField, setShouldShowCounselorField] =
    useState<boolean>(true);
  const [startTimeError, setStartTimeError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [counselorError, setCounselorError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [schoolError, setSchoolError] = useState(false);
  const [participantsError, setParticipantsError] = useState(false);

  useEffect(() => {
    // hide counselor field for counselors, show for everyone else
    setShouldShowCounselorField(loggedInUser.role !== 'COUNSELOR');

    // if the user is a counselor, set their ID on the appointment
    if (loggedInUser.role === 'COUNSELOR') {
      setAppointment(oldAppointment => {
        return {
          ...oldAppointment,
          counselorUserId: loggedInUser.id,
        };
      });
    }
  }, [loggedInUser]);

  // filter available participants by the selected school
  const determineAvailableParticipants = useCallback(
    (school: School | undefined) => {
      let filteredUsers;
      if (typeof school === 'undefined') {
        filteredUsers = [] as User[];
      } else {
        filteredUsers = users.filter(user => {
          if (
            user.role === 'STUDENT' &&
            user.studentAssignedSchoolId === school.id
          )
            return true;
          else if (
            user.role === 'SCHOOL_ADMIN' &&
            user.schoolAdminAssignedSchoolId === school.id
          )
            return true;
          else if (
            user.role === 'SCHOOL_STAFF' &&
            user.schoolStaffAssignedSchoolId === school.id
          )
            return true;
          else if (
            user.role === 'GUARDIAN' &&
            (user.guardianStudents?.length || 0) > 0 &&
            user.guardianStudents![0].studentAssignedSchoolId === school.id
          )
            return true;

          return false;
        });
      }

      setFilteredUserNames(filteredUsers.map(user => formatUserName(user)));
    },
    [users]
  );

  // set up initial values
  useEffect(() => {
    if (initialAppointment) {
      const school =
        schools.find(school => school.id === initialAppointment.schoolId) ??
        emptySchool;
      const counselor =
        counselors.find(
          counselor => counselor.id === initialAppointment.counselorUserId
        ) ?? emptyCounselor;

      // If a counselor is selected, set the Counselor selection index
      setAppointment(oldAppointment => {
        return {
          ...initialAppointment,
          school: school,
          counselor: counselor,
        };
      });

      setParticipantNames(
        initialAppointment.participants.map(participant =>
          formatUserName(participant)
        )
      );
    }
  }, [counselors, initialAppointment, schools]);

  const formatUserName = (user: User) => {
    return `${user.firstName} ${user.lastName.substring(0, 1)} (${user.role})`;
  };

  const formatAppointmentTitle = (appointment: Appointment) => {
    let result = '';

    const participants = appointment.participants;
    const clients = participants.filter(
      participant =>
        participant.role === 'STUDENT' || participant.role === 'TEACHER'
    );

    // prefer the client's name over other participants
    if (clients) {
      result += formatUserName(clients[0]);
    } else {
      result += formatUserName(participants[0]);
    }

    result += ` (${appointment.school!.name}) - ${appointment.type}`;

    return result;
  };

  useEffect(() => {
    determineAvailableParticipants(appointment.school);
  }, [appointment.school, determineAvailableParticipants]);

  const validateInputs = () => {
    let allInputsValid = true;

    if (!(appointment.start instanceof Date)) {
      setStartTimeError(true);
      allInputsValid = false;
    } else setStartTimeError(false);

    if (DURATIONS.indexOf(`${duration}`) === -1) {
      setDurationError(true);
      allInputsValid = false;
    } else setDurationError(false);

    if (APPOINTMENT_TYPES.indexOf(`${appointment.type}`) === -1) {
      setTypeError(true);
      allInputsValid = false;
    } else setTypeError(false);

    if (APPOINTMENT_STATUSES.indexOf(`${appointment.status}`) === -1) {
      setStatusError(true);
      allInputsValid = false;
    } else setStatusError(false);

    if (
      typeof appointment.counselorUserId === 'undefined' ||
      appointment.counselorUserId.length === 0
    ) {
      setCounselorError(true);
      allInputsValid = false;
    } else setCounselorError(false);

    if (
      typeof appointment.schoolId === 'undefined' ||
      appointment.schoolId.length === 0
    ) {
      setSchoolError(true);
      allInputsValid = false;
    } else setSchoolError(false);

    if (participantNames.length === 0) {
      setParticipantsError(true);
      allInputsValid = false;
    } else setParticipantsError(false);

    return allInputsValid;
  };

  const onFormSubmit = () => {
    const validInputs = validateInputs();
    if (!validInputs) {
      return;
    }

    const submittedAppointment = { ...appointment };
    const startDate = new Date(appointment.start);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    submittedAppointment.end = endDate;
    submittedAppointment.participants = users.filter(user =>
      participantNames.includes(formatUserName(user))
    );
    submittedAppointment.title = formatAppointmentTitle(submittedAppointment);

    // TODO: this should be handled on the server. Right now, it causes the DB update to fail.
    submittedAppointment.school = undefined;
    submittedAppointment.counselor = undefined;

    onAppointmentAdded(submittedAppointment);
    setAppointment(emptyAppointment);
    setDuration(30);
    setParticipantNames([]);
    onClose();
  };
  const onFormCancel = () => {
    setAppointment(emptyAppointment);
    setDuration(30);
    setParticipantNames([]);
    onClose();
  };
  return (
    <MaterialDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="startTime" error={startTimeError}>
            Start Time
          </InputLabel>
          <DateSelector
            selected={new Date(appointment.start)}
            onChange={(date: Date) => {
              setStartTimeError(false);
              setAppointment({ ...appointment, start: date });
            }}
            label={'Start Time'}
          />
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="duration" error={durationError}>
            Duration
          </InputLabel>
          <Select
            labelId="duration"
            id="duration"
            defaultValue={30}
            value={duration}
            label="Duration"
            onChange={e => {
              e.preventDefault();
              setDurationError(false);
              setDuration(e.target.value as number);
            }}
          >
            {DURATIONS.map((duration, index) => (
              <MenuItem value={duration} key={index}>
                {duration} minutes
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {shouldShowCounselorField && (
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="counselor" error={counselorError}>
              Counselor
            </InputLabel>
            <Select
              labelId="counselor"
              id="counselor"
              defaultValue=""
              value={appointment.counselorUserId}
              label="Counselor"
              onChange={e => {
                e.preventDefault();
                setCounselorError(false);
                const counselor = counselors.find(
                  counselor => counselor.id === e.target.value
                );
                setAppointment({
                  ...appointment,
                  counselorUserId: e.target.value,
                  counselor: counselor!,
                });
              }}
            >
              {counselors.map((counselor, index) => {
                const counselorStr = `${counselor.firstName} ${counselor.lastName}`;
                return (
                  <MenuItem value={counselor.id} key={index}>
                    {counselorStr}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="type" error={typeError}>
            Type
          </InputLabel>
          <Select
            labelId="type"
            id="type"
            defaultValue=""
            value={appointment.type}
            label="Type"
            onChange={e => {
              e.preventDefault();
              setTypeError(false);
              setAppointment({
                ...appointment,
                type: e.target.value,
              });
            }}
          >
            {APPOINTMENT_TYPES.map((type, index) => (
              <MenuItem value={type} key={index}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="status" error={statusError}>
            Status
          </InputLabel>
          <Select
            labelId="status"
            id="status"
            defaultValue=""
            value={appointment.status}
            label="Status"
            onChange={e => {
              e.preventDefault();
              setStatusError(false);
              setAppointment({
                ...appointment,
                status: e.target.value,
              });
            }}
          >
            {APPOINTMENT_STATUSES.map((status, index) => (
              <MenuItem value={status} key={index}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="school" error={schoolError}>
            School
          </InputLabel>
          <Select
            labelId="school"
            id="school"
            defaultValue=""
            value={appointment.schoolId}
            label="School"
            onChange={e => {
              e.preventDefault();
              setSchoolError(false);
              const school = schools.find(
                school => school.id === e.target.value
              );
              setAppointment({
                ...appointment,
                schoolId: e.target.value,
                school: school!,
              });
            }}
          >
            {schools.map((school, index) => (
              <MenuItem value={school.id} key={index}>
                {school.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="participants" error={participantsError}>
            Participants
          </InputLabel>
          <Select
            labelId="participants"
            id="participants"
            multiple
            defaultValue={[]}
            value={participantNames}
            label="Participants"
            renderValue={(selected: string[]) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value: string) => {
                  return <Chip key={value} label={value} />;
                })}
              </Box>
            )}
            onChange={(e: SelectChangeEvent<typeof participantNames>) => {
              e.preventDefault();
              setParticipantsError(false);
              const value = e.target.value;
              const newValue =
                typeof value === 'string' ? value.split(',') : value;
              setParticipantNames(newValue);
            }}
          >
            {filteredUserNames.map((name, index) => {
              return (
                <MenuItem value={name} key={index}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onFormSubmit}>Submit</Button>
        <Button onClick={onFormCancel}>Cancel</Button>
      </DialogActions>
    </MaterialDialog>
  );
};

export default AppointmentDialog;
