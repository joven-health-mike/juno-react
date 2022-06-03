import React from 'react';

type XButtonProps = {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const XButton: React.FC<XButtonProps> = ({ value, onClick }: XButtonProps) => {
  return (
    <>
      <button className={'button-x'} value={value} onClick={onClick}>
        X
      </button>
    </>
  );
};

export default XButton;
