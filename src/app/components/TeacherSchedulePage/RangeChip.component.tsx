import React, { useState } from 'react';
import { Chip, CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';
import { RangesChipProps } from './types';
import { format } from 'date-fns';

const getParsedRange = (start: Date, end: Date) =>
  `${format(start, 'hh:mm a')} - ${format(end, 'hh:mm a')}`;

const RangesChip = (props: RangesChipProps) => {
  const styles = useStyles();
  const [isDeleting, setIsDeleting] = useState(false);

  const initiateRangeDelete = () => {
    setIsDeleting(true);
    props.onDelete();
  };

  return (
    <Chip
      variant="outlined"
      onDelete={initiateRangeDelete}
      deleteIcon={
        props.dayIsUpdating && isDeleting ? (
          <CircularProgress size={15} />
        ) : undefined
      }
      color="primary"
      disabled={props.dayIsUpdating}
      className={styles.timeChips}
      label={getParsedRange(props.start, props.end)}
    />
  );
};

export default RangesChip;
