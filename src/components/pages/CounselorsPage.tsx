// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import {
  Counselor,
  CounselorsContext,
  emptyCounselor,
} from '../../data/counselors';
import CreateCounselorModal from '../modals/CreateCounselorModal';
import EditCounselorModal from '../modals/EditCounselorModal';
import Navbar from '../navbar/Navbar';
import CounselorsTable from '../tables/CounselorsTable';

const CounselorsPage: React.FC = () => {
  const {
    add: addCounselor,
    delete: deleteCounselor,
    update: updateCounselor,
    // update: updateCounselor,
  } = useContext(CounselorsContext);
  const [isCreateCounselorModalOpen, setIsCreateCounselorModalOpen] =
    useState<boolean>(false);
  const [isEditCounselorModalOpen, setIsEditCounselorModalOpen] =
    useState<boolean>(false);
  const [modalCounselor, setModalCounselor] =
    useState<Counselor>(emptyCounselor);

  const handleCounselorAdded = (counselor: Counselor) => {
    addCounselor(counselor);
  };

  const handleCounselorEdited = (counselor: Counselor) => {
    updateCounselor(counselor);
  };

  const onCounselorDeleteClicked = (counselorToDelete: Counselor) => {
    if (window.confirm('Delete this counselor?')) {
      deleteCounselor(counselorToDelete);
    }
  };

  const onCounselorEditClicked = (counselorToEdit: Counselor) => {
    setModalCounselor(counselorToEdit);
    setIsEditCounselorModalOpen(true);
  };

  const onCounselorEmailClicked = (counselorToEmail: Counselor) => {
    window.open(`mailto:${counselorToEmail.email}`);
  };

  const onCounselorRoomLinkClicked = (counselorToOpenRoomLink: Counselor) => {
    window.open(counselorToOpenRoomLink.counselorRef.roomLink);
  };

  const onCounselorFileOpenClicked = (counselorToOpenFile: Counselor) => {
    window.open(counselorToOpenFile.docsUrl);
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Counselors</h1>
      <>
        <button
          type="button"
          onClick={() => setIsCreateCounselorModalOpen(true)}
        >
          Add Counselor
        </button>
        <CreateCounselorModal
          isOpen={isCreateCounselorModalOpen}
          onCounselorAdded={handleCounselorAdded}
          onClose={() => setIsCreateCounselorModalOpen(false)}
        />
        <EditCounselorModal
          isOpen={isEditCounselorModalOpen}
          onCounselorEdited={handleCounselorEdited}
          onClose={() => setIsEditCounselorModalOpen(false)}
          initialCounselor={modalCounselor}
        />
        <CounselorsTable
          onDeleteClicked={onCounselorDeleteClicked}
          onEditClicked={onCounselorEditClicked}
          onEmailClicked={onCounselorEmailClicked}
          onRoomLinkClicked={onCounselorRoomLinkClicked}
          onOpenFileClicked={onCounselorFileOpenClicked}
        />
      </>
    </div>
  );
};

export default CounselorsPage;
