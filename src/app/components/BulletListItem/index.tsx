/**
 *
 * BulletListItem
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { PlayCircleOutline } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

interface Props {}

export default function BulletListItem(props: Props) {
  return (
    <Div>
      <PlayCircleOutline color="primary" />
      <Typography style={{ marginLeft: 10 }} variant="subtitle1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est labore ut
        fugiat sequi dignissimos optio, cum iure soluta deleniti beatae
        explicabo culpa possimus velit perferendis, provident, libero qui
        veritatis adipisci.
      </Typography>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
`;
