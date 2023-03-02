// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { buttonStyles } from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

type XButtonProps = {
  value: string;
  text?: string;
  title?: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const XButton: React.FC<XButtonProps> = ({
  text = 'X',
  title = 'X',
  value,
  className = 'button-x',
  type = undefined,
  onClick,
}) => {
  return (
    <>
      <Button
        title={title}
        className={className}
        value={value}
        onClick={onClick}
        type={type}
      >
        {text}
      </Button>
    </>
  );
};

export default XButton;
