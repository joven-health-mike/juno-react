import { css } from 'styled-components';

const azure = '#385aa8';
const celestialBlue = '#4891ce';

const buttonStyles = css`
  margin-left: 25px;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${azure} !important;
  color: whitesmoke;

  &:hover {
    background-color: ${celestialBlue} !important;
  }
`;

export { buttonStyles };
