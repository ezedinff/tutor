import React from 'react';
import {
  Menu,
  MenuItem,
  Avatar,
  Box,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ExitToApp, Settings } from '@material-ui/icons';

import { AccountMenuProps } from './types';

const AccountMenu = (props: AccountMenuProps) => {
  return (
    <Menu
      id="account-menu"
      anchorEl={props.accountMenuAnchor}
      keepMounted
      open={Boolean(props.accountMenuAnchor)}
      onClose={props.closeAccountMenu}
      // getContentAnchorEl={null}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      // transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Box p={2}>
        <Typography
          variant="subtitle1"
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar />
          {props.fullName}
        </Typography>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText>Account Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={props.onLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default AccountMenu;
