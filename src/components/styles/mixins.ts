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

const h1Styles = css`
  text-align: center;
  color: ${azure};
`;

const linkStyles = css`
  color: ${azure} !important;
`;

const spanStyles = css`
  align-items: center !important;
  display: flex !important;
  margin-left: 16px;
`;

const formStyles = css`
  text-align: left;
`;

const inputStyles = css`
  display: block;
  padding: 1px;
  width: 15em !important;
  margin: auto;
  margin-bottom: 20px;
`;

const selectStyles = css`
  ${inputStyles}
  align-self: flex-start;
`;

const labelStyles = css`
  display: block;
  margin: auto;
  padding-bottom: 2px;
  margin-top: 1px;
  margin-bottom: 1px;
`;

export {
  buttonStyles,
  h1Styles,
  linkStyles,
  spanStyles,
  formStyles,
  inputStyles,
  selectStyles,
  labelStyles,
};
