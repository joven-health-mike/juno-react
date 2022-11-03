import React from 'react';
import Modal from 'react-modal';
import { Counselor } from '../../data/counselors';
import CreateCounselorForm from '../forms/CreateCounselorForm';

type CreateCounselorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCounselorAdded: (counselor: Counselor) => void;
};

const CreateCounselorModal: React.FC<CreateCounselorModalProps> = ({
  isOpen,
  onClose,
  onCounselorAdded,
}) => {
  const onFormSubmit = (counselor: Counselor) => {
    onCounselorAdded(counselor);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={'modal'}
        overlayClassName={'overlay'}
      >
        <h1>Create Counselor</h1>
        <CreateCounselorForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateCounselorModal;
