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
import {
  emptyStudent,
  Student,
  StudentStatus,
  STUDENT_STATUSES,
} from '../../data/students';
import { UsersContext } from '../../data/users';
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidURL,
} from '../../services/http-common';
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
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [docsUrlError, setDocsUrlError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [counselorError, setCounselorError] = useState(false);
  const [schoolError, setSchoolError] = useState(false);

  useEffect(() => {
    setStudent({ ...initialStudent });
  }, [initialStudent]);

  const validateInputs = () => {
    let allInputsValid = true;

    if (student.firstName.length === 0) {
      setFirstNameError(true);
      allInputsValid = false;
    } else setFirstNameError(false);

    if (student.lastName.length === 0) {
      setLastNameError(true);
      allInputsValid = false;
    } else setLastNameError(false);

    if (student.email?.length! > 0 && !isValidEmail(student.email!)) {
      setEmailError(true);
      allInputsValid = false;
    } else setEmailError(false);

    if (
      typeof student.docsUrl === 'undefined' ||
      student.docsUrl.length === 0 ||
      !isValidURL(student.docsUrl)
    ) {
      setDocsUrlError(true);
      allInputsValid = false;
    } else setDocsUrlError(false);

    if (student.phone?.length! > 0 && !isValidPhoneNumber(student.phone!)) {
      setPhoneError(true);
      allInputsValid = false;
    } else setPhoneError(false);

    if (
      typeof student.studentAssignedSchoolId === 'undefined' ||
      student.studentAssignedSchoolId.length === 0
    ) {
      setSchoolError(true);
      allInputsValid = false;
    } else setSchoolError(false);

    return allInputsValid;
  };

  const onFormSubmit = () => {
    const validInputs = validateInputs();
    if (!validInputs) return;

    const associatedSchool = schools.find(
      school => school.id === submittedStudent.studentAssignedSchoolId
    );

    const submittedStudent = { ...student };
    submittedStudent.role = isTeacher ? 'TEACHER' : 'STUDENT';
    submittedStudent.timeZoneIanaName = associatedSchool!.timeZoneIanaName;
    onStudentAdded(submittedStudent);

    setStudent(emptyStudent);
    onClose();
  };

  const onFormCancel = () => {
    setStudent(emptyStudent);
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPhoneError(false);
    setDocsUrlError(false);
    setStatusError(false);
    setCounselorError(false);
    setSchoolError(false);
    onClose();
  };

  return (
    <div>
      <MaterialDialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth required sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="firstName" error={firstNameError}>
              First Name
            </InputLabel>
            <Input
              id="firstName"
              value={student.firstName}
              onChange={e => {
                e.preventDefault();
                setFirstNameError(false);
                setStudent({ ...student, firstName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="lastName" error={lastNameError}>
              Last Name
            </InputLabel>
            <Input
              id="lastName"
              value={student.lastName}
              onChange={e => {
                e.preventDefault();
                setLastNameError(false);
                setStudent({ ...student, lastName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="email" error={emailError}>
              Email address
            </InputLabel>
            <Input
              id="email"
              value={student.email}
              onChange={e => {
                e.preventDefault();
                setEmailError(false);
                setStudent({ ...student, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="phone" error={phoneError}>
              Phone number
            </InputLabel>
            <Input
              id="phone"
              value={student.phone}
              onChange={e => {
                e.preventDefault();
                setPhoneError(false);
                setStudent({ ...student, phone: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="docsUrl" error={docsUrlError}>
              Docs URL
            </InputLabel>
            <Input
              id="docsUrl"
              value={student.docsUrl}
              onChange={e => {
                e.preventDefault();
                setDocsUrlError(false);
                setStudent({ ...student, docsUrl: e.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="counselor" error={counselorError}>
              Counselor
            </InputLabel>
            <Select
              labelId="counselor"
              id="counselor"
              defaultValue=""
              value={student.studentAssignedCounselorId}
              label="Counselor"
              onChange={e => {
                e.preventDefault();
                setCounselorError(false);
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
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="school" error={schoolError}>
              School
            </InputLabel>
            <Select
              labelId="school"
              id="school"
              defaultValue=""
              value={student.studentAssignedSchoolId}
              label="School"
              onChange={e => {
                e.preventDefault();
                setSchoolError(false);
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
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel id="status" error={statusError}>
              Status
            </InputLabel>
            <Select
              labelId="status"
              id="status"
              defaultValue={STUDENT_STATUSES[0]}
              value={student.studentStatus}
              label="Status"
              onChange={e => {
                e.preventDefault();
                setStatusError(false);
                setStudent({
                  ...student,
                  studentStatus: e.target.value as StudentStatus,
                });
              }}
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
