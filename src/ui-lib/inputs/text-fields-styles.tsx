import { string } from 'prop-types';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { getPropOnCondition } from '../../services/helpers';
import { TTheme } from '../../types/styles.types';

export interface ITextFieldStyleProps {
  error: boolean;
  minHeight?: number;
}

// выдает оишбку типизации, но тут все типизированно и нигде нет any.
// в свойстве color

export const TextFieldStyle = css<ITextFieldStyleProps>`
  box-sizing: border-box;
  width: 100%;
  padding: 8px 38px 8px 16px;
  position: relative;
  font-size: ${({ theme: { text18: { size } } }) => size}px ;
  font-family: ${({ theme: { text18: { family } } }) => family};
  line-height: ${({ theme: { text18: { height } } }) => height}px ;
  font-weight: ${({ theme: { text18: { weight } } }) => weight};
  outline:none;
  color: ${({ error, theme: { inputField: { secondaryText, errorColor } } }) => getPropOnCondition(error, secondaryText, errorColor)}; 
  border: 1px solid ${({ error, theme: { inputField: { defaultBorder, errorColor } } }) => (getPropOnCondition(error, defaultBorder, errorColor))};

  @media screen and (max-width:768px) {
  font-size: 16px;
  }
  :hover {
  border: 1px solid ${({ error, theme: { inputField: { borderHover, errorColor } } }) => getPropOnCondition(error, borderHover, errorColor)};
  }
  :disabled {
  background-color: ${(({ theme: { inputField: { disabledInput } } }) => disabledInput)};
  }
  :active {
  border: 1px solid ${({ error, theme: { inputField: { borderActive, errorColor } } }) => getPropOnCondition(error, borderActive, errorColor)};
  }
`;

export const LabelStyle = styled.label`
  width: 100%;
  margin: 0;
  color:${((props) => props.theme.labelColor)};
  font-size: ${({ theme: { labelInput: { size } } }) => `${size}px`} ;
  font-family: ${({ theme: { labelInput: { family } } }) => family};
  line-height: ${({ theme: { labelInput: { height } } }) => `${height}px`} ;
  font-weight: ${({ theme: { labelInput: { weight } } }) => weight};
`;

const ErrorTextStyle = styled.span`
margin: 0;
color: ${((props) => props.theme.inputField.errorColor)};
font-size: ${({ theme: { labelInput: { size } } }) => `${size}px`} ;
font-family: ${({ theme: { labelInput: { family } } }) => family};
line-height: ${({ theme: { labelInput: { height } } }) => `${height}px`} ;
font-weight: ${({ theme: { labelInput: { weight } } }) => weight};
align-self: flex-start;
`;

type TErrorText = {
  errorText: string
};

export const ErrorText: FC<TErrorText> = ({ errorText }: TErrorText) => (
  <ErrorTextStyle>{errorText}</ErrorTextStyle>
);
