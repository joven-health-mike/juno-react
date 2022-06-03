import React from 'react';

type XButtonProps = {
  value: any;
  onClick: (e: any) => void;
};

const XButton: React.FC<XButtonProps> = ({ value, onClick }) => {
  return (
    <>
      <button className={'button-x'} value={value} onClick={onClick}>
        X
      </button>
    </>
  );
};

export default XButton;
