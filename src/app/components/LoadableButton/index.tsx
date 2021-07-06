/**
 *
 * LoadableButton
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import {
  Button,
  ButtonProps,
  CircularProgress,
  useTheme,
} from '@material-ui/core';

interface Props extends ButtonProps {
  loading: boolean;
  disabled?: boolean;
}

export const LoadableButton = memo((props: Props) => {
  const buttonProps = { ...props, loading: undefined };
  const theme = useTheme();
  return (
    <Container disabled={props.disabled || props.loading} {...buttonProps}>
      {props.loading ? '...' : props.children}
      {props.loading ? (
        <CircularProgress
          size={22}
          style={{ position: 'absolute', color: theme.palette.primary.light }}
        />
      ) : null}
    </Container>
  );
});

const Container = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
