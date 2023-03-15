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
  initialAppointment: Appointment;
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

  const onFormSubmit = () => {
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
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };
  return (
    <MaterialDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <InputLabel id="startTime">Start Time</InputLabel>
        <DateSelector
          selected={new Date(appointment.start)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, start: date })
          }
          label={'Start Time'}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="duration">Duration</InputLabel>
          <Select
            labelId="duration"
            id="duration"
            defaultValue={0}
            value={duration}
            label="Duration"
            onChange={e => setDuration(e.target.value as number)}
          >
            {DURATIONS.map((duration, index) => (
              <MenuItem value={duration} key={index}>
                {duration} minutes
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {shouldShowCounselorField && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="counselor">Counselor</InputLabel>
            <Select
              labelId="counselor"
              id="counselor"
              defaultValue=""
              value={appointment.counselorUserId}
              label="Counselor"
              onChange={e => {
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            defaultValue=""
            value={appointment.type}
            label="Type"
            onChange={e =>
              setAppointment({
                ...appointment,
                type: e.target.value,
              })
            }
          >
            {APPOINTMENT_TYPES.map((type, index) => (
              <MenuItem value={type} key={index}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            defaultValue=""
            value={appointment.status}
            label="Status"
            onChange={e =>
              setAppointment({
                ...appointment,
                status: e.target.value,
              })
            }
          >
            {APPOINTMENT_STATUSES.map((status, index) => (
              <MenuItem value={status} key={index}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="school">School</InputLabel>
          <Select
            labelId="school"
            id="school"
            defaultValue=""
            value={appointment.schoolId}
            label="School"
            onChange={e => {
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="participants">Participants</InputLabel>
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
