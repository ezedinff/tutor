import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Theme } from '@material-ui/core';
import { LayoutsTopBarProps } from './types';
import { Close, Menu as MenuIcon } from '@material-ui/icons';
import styled from 'styled-components';

import useWindowSize from 'utils/hooks/useWindowSize';
import { Logo } from '../Logo';
import { sizesInNumber, device } from 'styles/devices';
import { useStyles } from './styles';

const LayoutsTopBar = (props: LayoutsTopBarProps) => {
  const { screenWidth } = useWindowSize();
  const isScreenSizeBig = () => {
    return screenWidth ? screenWidth > sizesInNumber.tablet : false;
  };
  const styles = useStyles();

  return (
    <TopBar elevation={0} color="inherit" position="sticky">
      <Toolbar className={styles.toolBar}>
        {!props.dontShowSnackMenu && (
          <MenuButton onClick={props.toogleSidebar} color="primary">
            {props.sideBarVisible ? <Close /> : <MenuIcon />}
          </MenuButton>
        )}
        {/* <Box
              display="flex"
              flex={0.6}
              flexDirection="row"
              justifyContent="space-between"
            > */}
        <Logo size="small" bold hideText={!isScreenSizeBig()} />

        {/* </Box> */}
        <IconButton onClick={props.openAccountMenu}>
          <Avatar />
        </IconButton>
      </Toolbar>
    </TopBar>
  );
};

const TopBar = styled(AppBar)`
  ${({ theme }: { theme: Theme }) => `
    border-bottom: 1px solid ${theme.palette.grey[300]};
  `}
`;

const MenuButton = styled(IconButton)`
  display: none !important;

  ${device.tablet} {
    display: block !important;
  }
`;

export default LayoutsTopBar;
