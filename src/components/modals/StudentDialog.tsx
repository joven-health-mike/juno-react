import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getCounselors } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student, StudentStatus, STUDENT_STATUSES } from '../../data/students';
import { UsersContext } from '../../data/users';
import { TIME_ZONES } from '../../utils/DateUtils';
import MaterialDialog from './MaterialDialog';

type StudentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onStudentAdded: (student: Student) => void;
  initialStudent: Student;
  title: string;
  isTeacher?: boolean;
};

const StudentDialog: React.FC<StudentDialogProps> = ({
  isOpen,
  onClose,
  onStudentAdded,
  initialStudent,
  title,
  isTeacher = false,
}) => {
  const [student, setStudent] = useState<Student>(initialStudent);
  const { data: users } = useContext(UsersContext);
  const { data: schools } = useContext(SchoolsContext);
  const counselors = useMemo(() => getCounselors(users), [users]);

  useEffect(() => {
    setStudent({ ...initialStudent });
  }, [initialStudent]);

  const onFormSubmit = () => {
    const submittedStudent = { ...student };
    submittedStudent.role = isTeacher ? 'TEACHER' : 'STUDENT';
    onStudentAdded(submittedStudent);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <div>
      <MaterialDialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="firstName">First Name</InputLabel>
            <Input
              id="firstName"
              value={student.firstName}
              onChange={e => {
                setStudent({ ...student, firstName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="lastName">Last Name</InputLabel>
            <Input
              id="lastName"
              value={student.lastName}
              onChange={e => {
                setStudent({ ...student, lastName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              value={student.email}
              onChange={e => {
                setStudent({ ...student, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="username">Username</InputLabel>
            <Input
              id="username"
              value={student.username}
              onChange={e => {
                setStudent({ ...student, username: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="phone">Phone number</InputLabel>
            <Input
              id="phone"
              value={student.phone}
              onChange={e => {
                setStudent({ ...student, phone: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="docsUrl">Docs URL</InputLabel>
            <Input
              id="docsUrl"
              value={student.docsUrl}
              onChange={e => {
                setStudent({ ...student, docsUrl: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="counselor">Counselor</InputLabel>
            <Select
              labelId="counselor"
              id="counselor"
              defaultValue=""
              value={student.studentAssignedCounselorId}
              label="Counselor"
              onChange={e => {
                setStudent({
                  ...student,
                  studentAssignedCounselorId: e.target.value,
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
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="school">School</InputLabel>
            <Select
              labelId="school"
              id="school"
              defaultValue=""
              value={student.studentAssignedSchoolId}
              label="School"
              onChange={e => {
                setStudent({
                  ...student,
                  studentAssignedSchoolId: e.target.value,
                });
              }}
            >
              {schools.map((school, index) => {
                return (
                  <MenuItem value={school.id} key={index}>
                    {school.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="timeZone">Time Zone</InputLabel>
            <Select
              labelId="timeZone"
              id="timeZone"
              defaultValue={TIME_ZONES[0]}
              value={student.timeZoneIanaName}
              label="Time Zone"
              onChange={e =>
                setStudent({
                  ...student,
                  timeZoneIanaName: e.target.value,
                })
              }
            >
              {TIME_ZONES.map((timeZone, index) => (
                <MenuItem value={timeZone} key={index}>
                  {timeZone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              defaultValue={STUDENT_STATUSES[0]}
              value={student.studentStatus}
              label="Status"
              onChange={e =>
                setStudent({
                  ...student,
                  studentStatus: e.target.value as StudentStatus,
                })
              }
            >
              {STUDENT_STATUSES.map((status, index) => (
                <MenuItem value={status} key={index}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onFormSubmit}>Submit</Button>
          <Button onClick={onFormCancel}>Cancel</Button>
        </DialogActions>
      </MaterialDialog>
    </div>
  );
};

export default StudentDialog;
