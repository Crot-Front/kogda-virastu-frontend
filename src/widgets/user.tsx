import React, { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled, { useTheme } from 'styled-components';
import { useDispatch } from '../services/hooks';
import { Divider, RegularText } from '../ui-lib';
import CheckboxPic from '../assets/images/icons/checkbox-icon.svg';
import { TUser } from '../types/types';
import { patchUserRolesThunk } from '../thunks';

interface IUserProps {
  user: TUser,
  index: number,
}

interface ICheckBoxProps {
  checked: boolean,
  handleClick: () => void,
}

const UserContainer = styled.li`
  margin: 2px 0;
  list-style: none outside;
`;

const UserWrapper = styled.article`
  display: grid;
  grid-template-columns: 40px 276px 196px 184px;
  gap: 8px;
  justify-items: start;
  align-items: center;

  @media screen and (max-width:760px) {
    grid-template-columns: 40px 232px 120px 160px;
  }
  @media screen and (max-width:620px) {
    grid-template-columns: 40px 232px;
    grid-template-rows: 40px 20px 32px;
    column-gap: 8px;
    row-gap: 16px;
  }
`;

const UserAvatar = styled.img`
  box-sizing: border-box;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 4px;
`;

const UserRole = styled.div`
  @media screen and (max-width:620px) {
    grid-column: 2/3;
  }
`;

const Label = styled.label`
  display: flex;
  gap: 8px;

  @media screen and (max-width:620px) {
    grid-column: 2/3;
    margin-left: -28px;
  }
`;

const Span = styled.span`
`;

const SpanPseudo = styled.span`
  display: inline-block; /* элемент span теперь сможет принимать определённую ширину и высоту */
  vertical-align: middle; /* элемент и текст будут правильно выровнены по вертикали. Работает в паре с inline-block */
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.secondaryText};
  border-radius: 6px;
  box-sizing: border-box;
`;

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);

  :checked + ${SpanPseudo} {
    background-image: url(${CheckboxPic});
    background-color: ${({ theme }) => theme.secondaryText};
  }

  :disabled + ${SpanPseudo} {
    border: 1px solid grey;
  }
  
  :disabled:checked + ${SpanPseudo} {
    background-image: url(https://code.s3.yandex.net/web-code/tick_g''rey.svg);

  }
  
  :focus + ${SpanPseudo} {
    box-shadow: 0 0 5px #fff6c5;
  }
`;

const CheckBox: FC<ICheckBoxProps> = ({
  checked, handleClick = () => {
  },
}) => {
  const theme = useTheme();

  return (
    <Label>
      <Input type='checkbox' name='admin' id='makeAdmin' value='makeAdmin' onChange={handleClick} checked={checked} />
      <SpanPseudo />
      <Span>
        <RegularText
          size='medium'
          weight={400}
          color={theme.secondaryText}
          align='center'
          sansSerif>
          <FormattedMessage id='makeAdmin' />
        </RegularText>
      </Span>
    </Label>
  );
};

const User: FC<IUserProps> = ({ user, index }) => {
  const { username, roles } = user;
  const dispatch = useDispatch();
  const theme = useTheme();
  const image = user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg';

  const [isAdmin, setIsAdmin] = useState(roles?.some((role) => role === 'admin'));
  const [checked, setChecked] = useState(!!isAdmin);
  const role = isAdmin ? 'user' : 'admin';
  const dataRoles = {
    roles: [
      role,
    ],
  };

  const onChange = () => {
    dispatch(patchUserRolesThunk(username, dataRoles));
    if (checked) {
      setChecked(false);
      setIsAdmin(false);
    } else {
      setChecked(true);
      setIsAdmin(true);
    }
  };

  return (
    <UserContainer>
      {!!index && <Divider distance={8} />}
      <UserWrapper>
        <UserAvatar src={image} />
        <RegularText
          size='medium'
          weight={400}
          color={theme.secondaryText}
          align='center'
          sansSerif>
          {username}
        </RegularText>
        <UserRole>
          <RegularText
            size='medium'
            weight={400}
            color={theme.secondaryText}
            align='center'
            sansSerif>
            {isAdmin && <FormattedMessage id='admin' />}
            {!isAdmin && <FormattedMessage id='user' />}
          </RegularText>
        </UserRole>
        <CheckBox checked={checked} handleClick={onChange} />
      </UserWrapper>
    </UserContainer>
  );
};

export default User;
