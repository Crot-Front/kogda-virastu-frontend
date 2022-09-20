import React, { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { InputField, InputFieldWithUpload } from './input-field-config';
import { PaperClipIcon, EyeIcon, EyeNoIcon } from '../icons';
import { TFieldInput } from '../../types/styles.types';
import { useSelector, useDispatch } from '../../services/hooks';
import { setPasswordCorrectRegister, setPasswordInCorrectRegister } from '../../store/registerFormSubSlice';
import { setPasswordCorrectProfile, setPasswordInCorrectProfile } from '../../store/profileFormSubSlice';

export const FieldUrl: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
  onIconClick = undefined,
  onChangeUpload = undefined,
  imageRef,
}) => {
  const intl = useIntl();
  return (
    <InputFieldWithUpload
      placeholder={placeholder}
      name='FieldURL'
      type='url'
      errorText={errorText}
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      labelText={intl.messages.articleImage as string}
      icon={<PaperClipIcon color='grey' />}
      onIconClick={onIconClick}
      disabled={disabled}
      onChangeUpload={onChangeUpload}
      imageRef={imageRef} />
  );
};
export const FieldProfileImage: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
  onIconClick = undefined,
  onChangeUpload = undefined,
}) => {
  const intl = useIntl();
  return (
    <InputFieldWithUpload
      placeholder={placeholder}
      name='FieldProfileImage'
      type='url'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      labelText={intl.messages.urlImage as string}
      icon={<PaperClipIcon color='grey' />}
      onIconClick={onIconClick}
      disabled={disabled}
      onChangeUpload={onChangeUpload} />
  );
};
export const FieldLogin: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <InputField
      placeholder={placeholder}
      name='FieldLogin'
      type='text'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      labelText={intl.messages.userName as string}
      disabled={disabled} />
  );
};
export const FieldNick: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <InputField
      placeholder={placeholder}
      name='FieldNick'
      type='text'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      disabled={disabled}
      labelText={intl.messages.nickname as string} />
  );
};
export const FieldEmail: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <InputField
      placeholder={placeholder}
      name='Email'
      type='email'
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      disabled={disabled}
      labelText={intl.messages.userEmail as string} />
  );
};
export const FieldPassword: FC<TFieldInput & { label?: string, name?: string }> = ({
  name = 'FieldPassword',
  label = undefined,
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
}) => {
  const intl = useIntl();
  const [passwordState,
    setPasswordState] = useState<'password' | 'text'>('password');
  const [passwordIcon, setPasswordIcon] = useState(<EyeNoIcon color='grey' />);
  const onIconClick = () => {
    if (passwordState === 'password') {
      setPasswordState('text');
      setPasswordIcon(<EyeIcon color='grey' />);
    } else {
      setPasswordState('password');
      setPasswordIcon(<EyeNoIcon color='grey' />);
    }
  };
  return (
    <InputField
      placeholder={placeholder}
      name={name}
      type={passwordState}
      errorText={errorText}
      error={error}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      value={value}
      onChange={onChange}
      labelText={label || intl.messages.password as string}
      icon={passwordIcon}
      onIconClick={onIconClick} />
  );
};

FieldPassword.defaultProps = {
  label: undefined,
  name: 'FieldPassword',
};

// Поле для подтверждения пароля
export const FieldConfirmPasswordRegister: FC<TFieldInput & { label?: string, name?: string }> = ({
  name = 'FieldConfirmPassword',
  label = undefined,
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = 'Пароль не совпадает',
  disabled = false,
}) => {
  const {
    password, confirmPassword, isPasswordCorrect,
  } = useSelector((state) => state.forms.register);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [confirmPasswordState,
    setConfirmPassword] = useState<'password' | 'text'>('password');
  const [passwordIcon, setPasswordIcon] = useState(<EyeNoIcon color='grey' />);
  const onIconClick = () => {
    if (confirmPasswordState === 'password') {
      setConfirmPassword('text');
      setPasswordIcon(<EyeIcon color='grey' />);
    } else {
      setConfirmPassword('password');
      setPasswordIcon(<EyeNoIcon color='grey' />);
    }
  };
  useEffect(() => {
    if (password === confirmPassword) {
      dispatch(setPasswordCorrectRegister());
    } else {
      dispatch(setPasswordInCorrectRegister());
    }
  }, [password, confirmPassword, dispatch]);
  return (
    <InputField
      placeholder={placeholder}
      name={name}
      type={confirmPasswordState}
      errorText={errorText}
      error={isPasswordCorrect}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      value={value}
      onChange={onChange}
      labelText={label || intl.messages.confimPassword as string}
      icon={passwordIcon}
      onIconClick={onIconClick} />
  );
};

FieldConfirmPasswordRegister.defaultProps = {
  label: undefined,
  name: 'FieldConfirmPassword',
};

export const FieldConfirmPasswordProfile: FC<TFieldInput & { label?: string, name?: string }> = ({
  name = 'FieldConfirmPassword',
  label = undefined,
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = 'Пароль не совпадает',
  disabled = false,
}) => {
  const {
    password, confirmPassword, isPasswordCorrect,
  } = useSelector((state) => state.forms.profile);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [confirmPasswordState,
    setConfirmPassword] = useState<'password' | 'text'>('password');
  const [passwordIcon, setPasswordIcon] = useState(<EyeNoIcon color='grey' />);
  const onIconClick = () => {
    if (confirmPasswordState === 'password') {
      setConfirmPassword('text');
      setPasswordIcon(<EyeIcon color='grey' />);
    } else {
      setConfirmPassword('password');
      setPasswordIcon(<EyeNoIcon color='grey' />);
    }
  };
  useEffect(() => {
    if (password === confirmPassword) {
      dispatch(setPasswordCorrectProfile());
    } else {
      dispatch(setPasswordInCorrectProfile());
    }
  }, [password, confirmPassword, dispatch]);
  return (
    <InputField
      placeholder={placeholder}
      name={name}
      type={confirmPasswordState}
      errorText={errorText}
      error={isPasswordCorrect}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      value={value}
      onChange={onChange}
      labelText={label || intl.messages.confimPassword as string}
      icon={passwordIcon}
      onIconClick={onIconClick} />
  );
};

FieldConfirmPasswordProfile.defaultProps = {
  label: undefined,
  name: 'FieldConfirmPassword',
};

export const FieldDescriptionArticle: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <InputField
      placeholder={placeholder}
      name='descriptionArticle'
      type='text'
      errorText={errorText}
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      onChange={onChange}
      labelText={intl.messages.articleAbout as string} />
  );
};
export const FieldNameArticle: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <InputField
      placeholder={placeholder}
      name='nameArticle'
      type='text'
      errorText={errorText}
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      disabled={disabled}
      labelText={intl.messages.articleName as string} />
  );
};
export const FieldTags: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <InputField
      placeholder={placeholder}
      name='tags'
      type='text'
      errorText={errorText}
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      disabled={disabled}
      labelText={intl.messages.tags as string} />
  );
};
export const FieldRegistrationCode: FC<TFieldInput> = ({
  value,
  onFocus = undefined,
  onBlur = undefined,
  onChange,
  placeholder = '',
  error = false,
  errorText = '',
  disabled = false,
}) => {
  const intl = useIntl();
  return (
    <InputField
      placeholder={placeholder}
      name='tags'
      type='text'
      errorText={errorText}
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      disabled={disabled}
      labelText={intl.messages.registerCode as string} />
  );
};
