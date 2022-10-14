// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { Counselor, CounselorsContext } from '../../data/counselors';
import CreateCounselorModal from '../modals/CreateCounselorModal';
import Navbar from '../navbar/Navbar';
import CounselorsTable from '../tables/CounselorsTable';

const CounselorsPage: React.FC = () => {
  const {
    data: counselors,
    add: addCounselor,
    delete: deleteCounselor,
  } = useContext(CounselorsContext);
  const [isCreateCounselorModalOpen, setIsCreateCounselorModalOpen] =
    useState<boolean>(false);

  const onFormSubmit = (counselor: Counselor) => {
    addCounselor(counselor);
  };

  const onCounselorDeleteClicked = (counselorName: string) => {
    if (window.confirm('Delete this counselor?')) {
      let counselorToDelete = counselors.find(
        counselor =>
          `${counselor.firstName} ${counselor.lastName}` === counselorName
      );
      if (counselorToDelete) {
        deleteCounselor(counselorToDelete);
      }
    }
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
        <CounselorsTable onDeleteClicked={onCounselorDeleteClicked} />
      </>
    </div>
  );
};

export default CounselorsPage;
