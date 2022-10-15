// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { Counselor, CounselorsContext } from '../../data/counselors';
import CreateCounselorModal from '../modals/CreateCounselorModal';
import Navbar from '../navbar/Navbar';
import CounselorsTable from '../tables/CounselorsTable';

const CounselorsPage: React.FC = () => {
  const {
    add: addCounselor,
    delete: deleteCounselor,
    // update: updateCounselor,
  } = useContext(CounselorsContext);
  const [isCreateCounselorModalOpen, setIsCreateCounselorModalOpen] =
    useState<boolean>(false);

  const onFormSubmit = (counselor: Counselor) => {
    addCounselor(counselor);
  };

  const onCounselorDeleteClicked = (counselorToDelete: Counselor) => {
    if (window.confirm('Delete this counselor?')) {
      deleteCounselor(counselorToDelete);
    }
  };

  const onCounselorEditClicked = (counselorToEdit: Counselor) => {
    // TODO: only do this once the edit modal is hooked up
    // updateCounselor(counselorToEdit);
  };

  const onCounselorRoomLinkClicked = (counselorToOpenRoomLink: Counselor) => {
    window.location.href = counselorToOpenRoomLink.counselorRef.roomLink;
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
          onCounselorAdded={onFormSubmit}
          onClose={() => setIsCreateCounselorModalOpen(false)}
        />
        <CounselorsTable
          onDeleteClicked={onCounselorDeleteClicked}
          onEditClicked={onCounselorEditClicked}
          onRoomLinkClicked={onCounselorRoomLinkClicked}
        />
      </>
    </div>
  );
};

export default CounselorsPage;
