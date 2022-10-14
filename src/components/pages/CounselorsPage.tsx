// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Counselor, CounselorsContext } from '../../data/counselors';
import CreateCounselorForm from '../forms/CreateCounselorForm';
import Navbar from '../navbar/Navbar';
import CounselorsTable from '../tables/CounselorsTable';

const CounselorsPage: React.FC = () => {
  const {
    add: addCounselor,
    delete: deleteCounselor,
    update: updateCounselor,
  } = useContext(CounselorsContext);

  const onFormSubmit = (counselor: Counselor) => {
    addCounselor(counselor);
  };

  const onCounselorDeleteClicked = (counselorToDelete: Counselor) => {
    if (window.confirm('Delete this counselor?')) {
      deleteCounselor(counselorToDelete);
    }
  };

  const onCounselorEditClicked = (counselorToEdit: Counselor) => {
    updateCounselor(counselorToEdit);
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
        <CreateCounselorForm onSubmit={onFormSubmit} onCancel={() => {}} />
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
