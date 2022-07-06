// Copyright 2022 Social Fabric, LLC

import React from 'react';

type XButtonProps = {
  value: string;
  text?: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const XButton: React.FC<XButtonProps> = ({
  text = 'X',
  value,
  className = 'button-x',
  type = undefined,
  onClick,
}) => {
  return (
    <>
      <button className={className} value={value} onClick={onClick} type={type}>
        {text}
      </button>
    </>
  );
};

export default XButton;
