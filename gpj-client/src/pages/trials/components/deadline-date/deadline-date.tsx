import React from 'react';
import { Grid } from '@mui/material';
import dateHelper from '../../../../shared/utils/date-helper';

interface Props {
  deadline: string;
  isLate: boolean;
}

const themeConfiguration = require('../../../../theme/themeConfiguration');

export default function DeadlineDate({ deadline, isLate }: Props) {
  return (
    <Grid
      sx={{
        color: isLate ? themeConfiguration.colors.red.main : 'inherit',
        padding: '0.5rem',
        borderRadius: '0.5rem',
      }}
    >
      <p className="font-medium">
        {dateHelper.getLocaleDate(deadline)}
      </p>
    </Grid>
  );
}
