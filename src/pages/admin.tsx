import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from '../services/hooks';
import { HeaderTwoText } from '../ui-lib';
import User from '../widgets/user';
import getAllUsersThunk from '../thunks/get-all-users';

const Page = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 56px;
  gap: 40px;
`;

const AdminPanelList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  return (
    <Page>
      <HeaderTwoText>
        <FormattedMessage id='userList' />
      </HeaderTwoText>
      <AdminPanelList>
        {users && [...users].reverse().map((user, index) => (
          <User key={user._id} user={user} index={index} />
        ))}
      </AdminPanelList>
    </Page>
  );
};

export default AdminPanel;
