/**
 *
 * DashboardLayout
 *
 */

import React, { ReactNode, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { dashboardLayoutSaga } from './saga';
import {
  Box,
  Divider,
  IconButton,
  Slide,
  Typography,
  useTheme,
  LinearProgress,
} from '@material-ui/core';
import { Today, BusinessCenter } from '@material-ui/icons';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { device, sizesInNumber } from 'styles/devices';
import useWindowSize from 'utils/hooks/useWindowSize';
import { actions as userActions } from '../UserLayout/slice';
import { selectUserLayout } from '../UserLayout/selectors';
import {
  LowerContainer,
  MainContainer,
  ContentContainer,
} from 'app/components/Layouts';
import LayoutsTopBar from 'app/components/Layouts/TopBar.component';
import AccountMenu from 'app/components/Layouts/AccountMenu.component';

interface Props {
  children: ReactNode | ReactNode[];
}

export function DashboardLayout(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: dashboardLayoutSaga });
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [
    accountMenuAnchor,
    setAccountMenuAnchor,
  ] = useState<null | HTMLElement>(null);

  const [notTeacher, setNotTeacher] = useState(false);

  const location = useLocation();
  const dashboardRouteStart = '/dashboard';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userLayout = useSelector(selectUserLayout);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const theme = useTheme();
  const { screenWidth } = useWindowSize();

  const toogleSideBar = () => setSideBarVisible(!sideBarVisible);

  const openAccountMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const isSelectedRoute = (route: string) => {
    if (route === '') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(`${dashboardRouteStart}${route}`);
  };

  const closeAccountMenu = () => setAccountMenuAnchor(null);

  const isScreenSizeBig = () => {
    return screenWidth ? screenWidth > sizesInNumber.tablet : false;
  };

  const logoutUser = () => dispatch(userActions.logOutUser());

  useEffect(() => {
    if (userLayout.user?.role) {
      const { role } = userLayout.user;
      if (role !== 'teacher') {
        setNotTeacher(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLayout.user?.role]);

  if (notTeacher) return <Redirect to="/client" />;

  return (
    <>
      <Helmet>
        <title>DashboardLayout</title>
        <meta name="description" content="Description of DashboardLayout" />
      </Helmet>
      <MainContainer>
        <LayoutsTopBar
          openAccountMenu={openAccountMenu}
          sideBarVisible={sideBarVisible}
          toogleSidebar={toogleSideBar}
        />

        <AccountMenu
          accountMenuAnchor={accountMenuAnchor}
          closeAccountMenu={closeAccountMenu}
          fullName={userLayout.user?.fullName}
          onLogout={logoutUser}
        />

        <LowerContainer>
          {/* <SideBarComponent
            dashboardLayout={dashboardLayout}
            sideBarVisible={sideBarVisible}
            ml={sideBarVisible ? '250px' : 0}
          /> */}
          <Slide
            in={sideBarVisible || isScreenSizeBig()}
            mountOnEnter
            unmountOnExit
            direction={isScreenSizeBig() ? 'right' : 'down'}
          >
            <MenuBox
              boxShadow={isScreenSizeBig() ? 0 : 2}
              display={sideBarVisible || isScreenSizeBig() ? 'flex' : 'none'}
              bgcolor="background.paper"
              borderRight={`1px ${theme.palette.divider} solid`}
            >
              <IconButton
                color={isSelectedRoute('') ? 'primary' : 'default'}
                component={Link}
                to="/dashboard"
                onClick={toogleSideBar}
                style={{
                  width: '100%',
                  borderRadius: 0,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <BusinessCenter style={{ marginRight: 10 }} />
                {isScreenSizeBig() ? null : (
                  <Typography variant="button">Profiles</Typography>
                )}
              </IconButton>
              <Divider orientation="vertical" flexItem variant="middle" />
              <IconButton
                color={isSelectedRoute('/schedules') ? 'primary' : 'default'}
                component={Link}
                to="/dashboard/schedules"
                onClick={toogleSideBar}
                style={{
                  width: '100%',
                  borderRadius: 0,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Today style={{ marginRight: 10 }} />
                {isScreenSizeBig() ? null : (
                  <Typography variant="button">Schedules</Typography>
                )}
              </IconButton>
            </MenuBox>
          </Slide>
          <ContentContainer ml={isScreenSizeBig() ? '80px' : '0'}>
            {userLayout.gettingUser ? <LinearProgress /> : props.children}
          </ContentContainer>
        </LowerContainer>
      </MainContainer>
    </>
  );
}

const MenuBox = styled(Box)`
  flex-direction: column;
  position: fixed;
  width: 80px;
  height: 100%;
  padding-left: 16px !important;
  ${device.tablet} {
    position: fixed;
    align-items: flex-start;
    width: 100%;
    z-index: 10 !important;
    height: auto;
  }
`;

// const SideMenuButton = styled(IconButton)`
//   width: 100%;
//   background: red;
//   justify-content: flex-start;
//   align-items: center;
//   border-radius: 0;
// `;
