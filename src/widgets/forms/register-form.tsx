import { useLocation, useNavigate } from 'react-router-dom';
import React, {
  ChangeEventHandler, FC, FormEventHandler, useEffect,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  changeUsernameRegister,
  changeEmailRegister,
  changePasswordRegister,
  changeConfirmPasswordRegister,
  resetFormRegister,
  changeNicknameRegister,
  changeInviteRegister,
} from '../../store';
import { registerThunk } from '../../thunks';
import {
  ButtonContainer, Form, FormContainer, FormLoginLink, FormTitle, InputFieldset,
} from './forms-styles';
import {
  FieldEmail, FieldLogin, FieldNick, FieldPassword, RegisterButton, FieldRegistrationCode,
  FieldConfirmPasswordRegister,
} from '../../ui-lib';

const RegisterForm: FC = () => {
  const {
    username, email, password, confirmPassword, nickname, invite,
  } = useSelector((state) => state.forms.register);
  const { isUserRegistering } = useSelector((state) => state.api);
  const { isLoggedIn } = useSelector((state) => state.system);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeEmailRegister(evt.target.value));
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changePasswordRegister(evt.target.value));
  };

  const onChangeConfirmPassword: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeConfirmPasswordRegister(evt.target.value));
  };

  const onChangeUsername: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeUsernameRegister(evt.target.value));
  };

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeNicknameRegister(evt.target.value));
  };
  const onChangeInviteCode: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(changeInviteRegister(evt.target.value));
  };
  const submitForm: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    dispatch(registerThunk());
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
    dispatch(resetFormRegister());
  }, [dispatch, isLoggedIn, navigate]);

  useEffect(() => {
    if (search) {
      const code = search.substring(2);
      dispatch(changeInviteRegister(code));
    }
  }, [search, dispatch]);

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id='register' />
      </FormTitle>
      <FormLoginLink to='/login'>
        <FormattedMessage id='userLogin' />
      </FormLoginLink>
      <Form onSubmit={submitForm}>
        <InputFieldset rowGap={16}>
          <FieldLogin value={username ?? ''} onChange={onChangeUsername} />
          <FieldNick value={nickname ?? ''} onChange={onChangeNickname} />
          <FieldEmail value={email ?? ''} onChange={onChangeEmail} />
          <FieldPassword value={password ?? ''} onChange={onChangePassword} />
          <FieldConfirmPasswordRegister value={confirmPassword ?? ''} onChange={onChangeConfirmPassword} />
          <FieldRegistrationCode value={invite ?? ''} onChange={onChangeInviteCode} />
        </InputFieldset>
        <ButtonContainer>
          <RegisterButton disabled={isUserRegistering} />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
