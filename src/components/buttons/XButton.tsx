import React from 'react';

type XButtonProps = {
  value: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const XButton: React.FC<XButtonProps> = ({
  value,
  className = 'button-x',
  type = undefined,
  onClick,
}) => {
  return (
    <>
      <button className={className} value={value} onClick={onClick} type={type}>
        X
      </button>
    </>
  );
};

export default XButton;
