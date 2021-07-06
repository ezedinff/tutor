/**
 *
 * Layouts
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { Box } from '@material-ui/core';

interface Props {}

export function Layouts(props: Props) {
  return <Div></Div>;
}

const Div = styled.div``;

export const MainContainer = styled(Box)`
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
`;

export const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ContentContainer = styled(Box)`
  flex: 1;
  height: 100%;
  width: 100%;
`;
