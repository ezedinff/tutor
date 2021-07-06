import React from 'react';
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  Face,
  Today,
  Timeline,
  AccountBalance,
  Settings,
  BusinessCenter,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { capitalizeFirstLetter } from 'app/utils';
import { IUser } from '../UserLayout/types';

interface Props {
  user: IUser;
  sideBarVisible: boolean;
}

const SideBarComponent = (props: Props) => {
  const theme = useTheme();
  const location = useLocation();
  const dashboardRouteStart = '/dashboard';
  const isSelectedRoute = (route: string) => {
    return location.pathname.startsWith(`${dashboardRouteStart}${route}`);
  };

  return (
    <Slide
      in={props.sideBarVisible}
      direction="right"
      mountOnEnter
      unmountOnExit
    >
      <SideBar
        // display={sideBarVisible ? 'block' : 'none'}
        borderRight={`1px ${theme.palette.divider} solid`}
      >
        <Box my={theme.spacing(1)}>
          <Typography
            variant="h5"
            align="center"
            color="primary"
            style={{
              margin: 10,
              fontFamily: "'Comfortaa', cursive",
            }}
          >
            Dade Tutors
          </Typography>
          <Box display="flex" justifyContent="center">
            {props.user && (
              <Chip
                label={capitalizeFirstLetter(props.user?.role)}
                variant="default"
                color="secondary"
                size="small"
              />
            )}
          </Box>
        </Box>

        <List component="nav" color="primary">
          <ListItem button selected={isSelectedRoute('')}>
            <ListItemIcon>
              <Today />
            </ListItemIcon>
            <ListItemText primary="Schedules" />
          </ListItem>

          <ListItem button selected={isSelectedRoute('/students')}>
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>

          <Divider variant="middle" style={{ margin: theme.spacing(2) }} />

          <ListItem button selected={isSelectedRoute('/timeline')}>
            <ListItemIcon>
              <Timeline />
            </ListItemIcon>
            <ListItemText primary="Timeline" />
          </ListItem>

          <ListItem button selected={isSelectedRoute('/balance')}>
            <ListItemIcon>
              <AccountBalance />
            </ListItemIcon>
            <ListItemText primary="Balance" />
          </ListItem>

          <Divider variant="middle" style={{ margin: theme.spacing(2) }} />

          <ListItem button selected={isSelectedRoute('/profile')}>
            <ListItemIcon>
              <BusinessCenter />
            </ListItemIcon>
            <ListItemText primary="Teaching Profile" />
          </ListItem>

          <ListItem button selected={isSelectedRoute('/settings')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </SideBar>
    </Slide>
  );
};

const SideBar = styled(Box)`
  position: fixed;
  width: 250px;
  height: 100%;
`;

export default SideBarComponent;
