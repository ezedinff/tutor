import { Avatar, IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
/**
 *
 * AvatarChanger
 *
 */
import React from 'react';
import styled from 'styled-components/macro';

interface Props {
  size?: number;
}

export function AvatarChanger(props: Props) {
  return (
    <Div>
      <IconButton color="primary" aria-label="upload picture">
        <Avatar style={{ height: props.size || 80, width: props.size || 80 }} />
        <PhotoCamera
          fontSize="large"
          style={{ position: 'absolute', bottom: 10, right: 10 }}
        />
      </IconButton>
    </Div>
  );
}

const Div = styled.div``;
