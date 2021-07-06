/**
 *
 * Logo
 *
 */
import React, { CSSProperties } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Typography, useTheme } from '@material-ui/core';
import { ReactComponent as LogoImage } from '../../assets/whiteboard.svg';

interface Props {
  hideText?: boolean;
  hideImage?: boolean;
  style?: CSSProperties;
  paletteColor?: string;
  flexDirection?: 'column' | 'row';
  size?: 'small' | 'medium' | 'large';
  bold?: boolean;
}

export function Logo(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  return (
    <Div
      style={{
        ...props.style,
        flexDirection: props.flexDirection || 'row',
      }}
    >
      {!props.hideImage && (
        <LogoImage
          style={{
            color: props.paletteColor || theme.palette.primary.main,
            height:
              props.size === 'small' ? 25 : props.size === 'medium' ? 30 : 50,
            width:
              props.size === 'small' ? 25 : props.size === 'medium' ? 30 : 50,
          }}
        />
      )}
      {!props.hideText && (
        <Typography
          style={{
            marginLeft: props.flexDirection === 'column' ? 0 : 20,
            color: props.paletteColor || theme.palette.primary.main,
            marginTop: props.flexDirection === 'column' ? theme.spacing(2) : 0,
            fontWeight: props.bold ? 'bold' : 'normal',
          }}
          variant={
            props.size === 'small'
              ? 'h6'
              : props.size === 'medium'
              ? 'h4'
              : 'h3'
          }
        >
          {t('appName')}
        </Typography>
      )}
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
