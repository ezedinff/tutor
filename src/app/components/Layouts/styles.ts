import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);
