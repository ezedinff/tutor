import { TypographyProps } from '@material-ui/core';
import { ReactNode } from 'react';

export interface TitlesProps {
  typographyProps?: TypographyProps;
  bold?: boolean;
  children: ReactNode;
}
