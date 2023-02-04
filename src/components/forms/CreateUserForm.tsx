// Copyright 2022 Social Fabric, LLC

import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Counselor, CounselorsContext } from '../../data/counselors';
import { School, SchoolsContext } from '../../data/schools';
import { emptyUser, User } from '../../data/users';
import { Role, ROLES } from '../../services/user.service';
import { AvailableTimeZone, TIME_ZONES } from '../../utils/DateUtils';
import SelectList, {
  SelectCounselorList,
  SelectSchoolList,
} from '../selectList/SelectList';

type CreateUserFormProps = {
  defaultUser?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
};

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  defaultUser,
  onSubmit,
  onCancel,
}) => {
  const [isCounselor, setIsCounselor] = useState<boolean>(false);
  const [roomLink, setRoomLink] = useState<string>('');
  const [isSchoolAdmin, setIsSchoolAdmin] = useState<boolean>(false);
  const [isSchoolStaff, setIsSchoolStaff] = useState<boolean>(false);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [counselorSelectionIndex, setCounselorSelectionIndex] =
    useState<number>(-1);
  const [schoolSelectionIndex, setSchoolSelectionIndex] = useState<number>(-1);
  const [user, setUser] = useState<User>(defaultUser ?? emptyUser);

  const { data: counselors } = useContext(CounselorsContext);
  const { data: schools } = useContext(SchoolsContext);

  useEffect(() => {
    if (defaultUser) {
      setUser(defaultUser);

      let initialSchoolSelectionIndex: number,
        initialCounselorSelectionIndex: number;

      switch (defaultUser.role) {
        case 'COUNSELOR':
          setIsCounselor(true);
          const roomLink = (defaultUser as Counselor).counselorRoomLink ?? '';
          setRoomLink(roomLink);
          break;
        case 'SCHOOL_ADMIN':
          setIsSchoolAdmin(true);
          initialSchoolSelectionIndex = schools
            .map(school => school.id)
            .indexOf(defaultUser.schoolAdminAssignedSchoolId ?? '');
          setSchoolSelectionIndex(initialSchoolSelectionIndex);
          break;
        case 'SCHOOL_STAFF':
          setIsSchoolStaff(true);
          initialSchoolSelectionIndex = schools
            .map(school => school.id)
            .indexOf(defaultUser.schoolStaffAssignedSchoolId ?? '');
          setSchoolSelectionIndex(initialSchoolSelectionIndex);
          break;
        case 'STUDENT':
          setIsStudent(true);
          initialCounselorSelectionIndex = counselors
            .map(counselor => counselor.id)
            .indexOf(defaultUser.studentAssignedCounselorId ?? '');
          setCounselorSelectionIndex(initialCounselorSelectionIndex);
          initialSchoolSelectionIndex = schools
            .map(school => school.id)
            .indexOf(defaultUser.studentAssignedSchoolId ?? '');
          setSchoolSelectionIndex(initialSchoolSelectionIndex);
          break;
        default:
          break;
      }
    }
  }, [counselors, defaultUser, schools]);

  const onRoleChanged = (role: Role) => {
    setUser({ ...user, role: role });
  };

  const onCounselorChanged = (counselor: Counselor) => {
    const newCounselorSelectionIndex = counselors
      .map(c => c.id)
      .indexOf(counselor.id);
    setCounselorSelectionIndex(newCounselorSelectionIndex);
  };

  const onSchoolChanged = (school: School) => {
    const newSchoolSelectionIndex = schools.map(s => s.id).indexOf(school.id);
    setSchoolSelectionIndex(newSchoolSelectionIndex);
  };

  const onTimeZoneChanged = (timeZone: string) => {
    setUser({ ...user, timeZoneIanaName: timeZone });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedUser = defaultUser ? user : { ...user, id: `-1` };
    onSubmit(submittedUser);
  };

  const onFormCancel = (e: MouseEvent) => {
    e.preventDefault();
    setUser(defaultUser ?? emptyUser);
    onCancel();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        First Name:
        <input
          data-testid={'input-first-name'}
          type="text"
          placeholder="First Name"
          name="firstName"
          value={user.firstName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, firstName: e.target.value });
          }}
        />
      </label>
      <label>
        Last Name:
        <input
          data-testid={'input-last-name'}
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={user.lastName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, lastName: e.target.value });
          }}
        />
      </label>
      <label>
        Email:
        <input
          data-testid={'input-email'}
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, email: e.target.value })
          }
        />
      </label>
      <label>
        Username:
        <input
          data-testid={'input-username'}
          type="text"
          placeholder="Username"
          name="username"
          value={user.username}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
      </label>
      <label>
        Phone:
        <input
          data-testid={'input-phone'}
          type="phone"
          placeholder="Phone"
          name="phone"
          value={user.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, phone: e.target.value });
          }}
        />
      </label>
      <label>
        Docs URL:
        <input
          data-testid={'input-docsUrl'}
          type="URL"
          placeholder="Docs URL"
          name="docsUrl"
          value={user.docsUrl}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, docsUrl: e.target.value });
          }}
        />
      </label>
      <label>
        Time Zone:{' '}
        <SelectList
          labelText="Select a Time Zone"
          items={TIME_ZONES}
          value={TIME_ZONES.indexOf(user.timeZoneIanaName || '')}
          onItemChanged={item => {
            return onTimeZoneChanged(
              TIME_ZONES[parseInt(item)] as AvailableTimeZone
            );
          }}
        />
      </label>
      <label>
        Role:{' '}
        <SelectList
          labelText="Select a Role"
          items={ROLES}
          value={ROLES.indexOf(user.role)}
          onItemChanged={item => {
            return onRoleChanged(ROLES[parseInt(item)] as Role);
          }}
        />
      </label>
      {isCounselor && (
        <label>
          Room Link:
          <input
            data-testid={'input-counselor-roomLink'}
            type="URL"
            placeholder="Room Link"
            name="counselorRoomLink"
            value={roomLink}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setRoomLink(e.target.value);
            }}
          />
        </label>
      )}
      {isSchoolAdmin && (
        <label>
          School:{' '}
          <SelectSchoolList
            selectedIndex={schoolSelectionIndex}
            onSchoolChanged={onSchoolChanged}
          />
        </label>
      )}
      {isSchoolStaff && (
        <label>
          School:{' '}
          <SelectSchoolList
            selectedIndex={schoolSelectionIndex}
            onSchoolChanged={onSchoolChanged}
          />
        </label>
      )}
      {isStudent && (
        <>
          <label>
            Counselor:{' '}
            <SelectCounselorList
              selectedIndex={counselorSelectionIndex}
              onCounselorChanged={onCounselorChanged}
            />
          </label>
          <label>
            School:{' '}
            <SelectSchoolList
              selectedIndex={schoolSelectionIndex}
              onSchoolChanged={onSchoolChanged}
            />
          </label>
        </>
      )}

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

export default CreateUserForm;
