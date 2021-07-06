/**
 *
 * LoadingScreens
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Logo } from '../Logo';
import { LinearProgress } from '@material-ui/core';

interface Props {}

export const LoadingScreen = memo((props: Props) => {
  return (
    <Div>
      {/* <motion.div
        animate={{ scale: [0.5, 1], opacity: [0.1, 1] }}
        transition={{ duration: 1.5 }}
      > */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Logo hideText style={{ marginRight: 100, marginLeft: 100 }} />
        <LinearProgress style={{ width: '100%', marginTop: 20 }} />
      </div>

      {/* </motion.div> */}
    </Div>
  );
});

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
`;
