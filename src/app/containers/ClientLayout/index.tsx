/**
 *
 * ClientLayout
 *
 */

import React, { ReactNode, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectClientLayout } from './selectors';
import { clientLayoutSaga } from './saga';
import LayoutsTopBar from 'app/components/Layouts/TopBar.component';
import {
  MainContainer,
  LowerContainer,
  ContentContainer,
} from 'app/components/Layouts';
import AccountMenu from 'app/components/Layouts/AccountMenu.component';
import { actions as userAction } from '../UserLayout/slice';
import { selectUserLayout } from '../UserLayout/selectors';
import { Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import useWindowSize from 'utils/hooks/useWindowSize';
import { sizesInNumber } from 'styles/devices';

interface Props {
  children: ReactNode | ReactNode[];
}

export function ClientLayout(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: clientLayoutSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clientLayout = useSelector(selectClientLayout);
  const userLayout = useSelector(selectUserLayout);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const { screenWidth } = useWindowSize();

  const [
    accountMenuAnchor,
    setAccountMenuAnchor,
  ] = useState<null | HTMLElement>(null);

  const [notClient, setNotClient] = useState(false);

  const openAccountMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const isScreenSizeBig = () => {
    return screenWidth ? screenWidth > sizesInNumber.tablet : false;
  };

  const closeAccountMenu = () => setAccountMenuAnchor(null);

  const logoutUser = () => dispatch(userAction.logOutUser());

  useEffect(() => {
    if (userLayout.user?.role) {
      const { role } = userLayout.user;
      if (role === 'teacher') {
        setNotClient(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLayout.user?.role]);

  if (notClient) return <Redirect to="/dashboard" />;

  return (
    <>
      <Helmet>
        <title>Clients</title>
        <meta name="description" content="Find Tutors" />
      </Helmet>
      <MainContainer>
        <LayoutsTopBar
          dontShowSnackMenu
          openAccountMenu={openAccountMenu}
          sideBarVisible={false}
        />

        <AccountMenu
          accountMenuAnchor={accountMenuAnchor}
          closeAccountMenu={closeAccountMenu}
          fullName={userLayout.user?.fullName}
          onLogout={logoutUser}
        />
        <LowerContainer>
          <ContentContainer mt={2} ml={isScreenSizeBig() ? 3 : 1}>
            {userLayout.gettingUser ? <LinearProgress /> : props.children}
          </ContentContainer>
        </LowerContainer>
      </MainContainer>
    </>
  );
}
