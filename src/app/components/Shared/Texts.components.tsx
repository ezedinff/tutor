import React from 'react';
import { Typography } from '@material-ui/core';
import { TitlesProps } from './types';
import { useStyles } from './styles';

export const Titles = (props: TitlesProps) => {
  const styles = useStyles();
  return (
    <Typography
      className={props.bold ? styles.boldText : ''}
      {...props.typographyProps}
    >
      {props.children}
    </Typography>
  );
};
