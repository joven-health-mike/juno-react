import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import Modal from 'react-modal';
import {
  emptyCounselor,
  Counselor,
  CounselorsContext,
} from '../../data/counselors';
import { Role } from '../../services/user.service';

type CreateCounselorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCounselorAdded: (Counselor: Counselor) => void;
  initialCounselor: Counselor;
};

const CreateCounselorModal: React.FC<CreateCounselorModalProps> = ({
  isOpen,
  onClose,
  onCounselorAdded,
  initialCounselor,
}) => {
  const [counselor, setCounselor] = useState<Counselor>(emptyCounselor);
  const [roomLink, setRoomLink] = useState<string>('');
  const onFormSubmit = () => {};
  const onFormCancel = () => {};
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <h1>Create Counselor</h1>
      <form onSubmit={onFormSubmit}>
        <label>
          First Name
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
          Last Name
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
          Email
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
          Username
          <input
            data-testid={'input-username'}
            type="text"
            placeholder="Userame"
            name="username"
            value={counselor.username}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({ ...counselor, username: e.target.value });
            }}
          />
        </label>
        <label>
          Phone
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
          Docs URL
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
          Time Zone Offset
          <input
            data-testid={'input-timeZoneOffset'}
            type="number"
            min="-12"
            max="14"
            placeholder="Time Zone Offset"
            name="timeZoneOffset"
            value={counselor.timeZoneOffset}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCounselor({
                ...counselor,
                timeZoneOffset: parseInt(e.target.value),
              });
            }}
          />
        </label>
        <label>
          Room Link
          <input
            data-testid={'input-roomLink'}
            type="URL"
            placeholder="Room Link"
            name="roomLink"
            value={roomLink}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setRoomLink(e.target.value);
            }}
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
    </Modal>
  );
};

export default CreateCounselorModal;
