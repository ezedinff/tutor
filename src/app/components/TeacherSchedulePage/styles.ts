import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBar: {
      position: 'relative',
    },

    dayList: {
      border: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(1),
    },

    rangeItem: {
      margin: theme.spacing(1),
    },

    timeChips: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  }),
);
