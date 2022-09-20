import styled from 'styled-components';
import React, {
  FC, ChangeEventHandler, MouseEventHandler, FocusEventHandler,
} from 'react';
import { TextFieldStyle, LabelStyle, ErrorText } from './text-fields-styles';
import { TInputFieldType } from '../../types/styles.types';

const InputStyle = styled.input<{ error: boolean }>`
box-sizing: border-box;
padding-right: 20px;
border-radius: 8px;
 ${TextFieldStyle}
 `;
const InputStyleNone = styled(InputStyle)`
 display: none;
 `;

const ContainerInput = styled.div`
     width: 100%;
     margin: 0;
     padding: 0;
    position: relative;
     display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
     @media screen and (max-width:768px) {
        font-size: 16px;
     }
 `;

const ContainerIcon = styled.div`
     position: absolute;
     top:32px;
     right:16px;
     cursor: pointer;
 `;

interface IInputInterface {
  type: TInputFieldType;
  placeholder: string;
  value: string;
  name: string;
  error: boolean;
  icon?: React.ReactNode;
  errorText: string;
  disabled: boolean;
  labelText: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onIconClick?: MouseEventHandler;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

interface IInputUpload extends IInputInterface {
  onChangeUpload?: ChangeEventHandler<HTMLInputElement>;
  imageRef?: {
    current: any
  }

}

export const InputField: FC<IInputInterface> = ({
  type, placeholder, value, name, error = false, icon = null, errorText = '', onChange, onIconClick, onBlur, onFocus,
  disabled = false, labelText = '',
}: IInputInterface) => (
  <ContainerInput>
    <LabelStyle>
      {labelText}
      <InputStyle
        disabled={disabled}
        error={error}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur} />
    </LabelStyle>
    <ContainerIcon onClick={onIconClick}>
      {icon}
    </ContainerIcon>
    {error && <ErrorText errorText={errorText} />}
  </ContainerInput>
);

export const InputFieldWithUpload: FC<IInputUpload> = ({
  type, placeholder, value, name, error = false, icon = null, errorText = '', onChange, onIconClick, onBlur, onFocus,
  disabled = false, labelText = '', onChangeUpload, imageRef,
}: IInputUpload) => (
  <ContainerInput>
    <LabelStyle>
      {labelText}
      <InputStyle
        disabled={disabled}
        error={error}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur} />
    </LabelStyle>
    <ContainerIcon onClick={onIconClick}>
      <InputStyleNone
        error={error}
        type='file'
        id='file-input'
        onChange={onChangeUpload}
        ref={imageRef} />
      {icon}
    </ContainerIcon>
    {error && <ErrorText errorText={errorText} />}
  </ContainerInput>
);

InputField.defaultProps = {
  icon: undefined,
  onIconClick: undefined,
  onBlur: undefined,
  onFocus: undefined,
};
InputFieldWithUpload.defaultProps = {
  icon: undefined,
  onIconClick: undefined,
  onBlur: undefined,
  onFocus: undefined,
  onChangeUpload: undefined,
  imageRef: undefined,
};
