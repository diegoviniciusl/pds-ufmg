import {
  IconButton, Typography,
} from '@mui/material';
import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Trial } from '../../../../models';
import getTrialTitle from '../../../../shared/utils/trial/get-trial-title';

interface Props {
  trial: Trial;
  onUpdateTrial: () => void;
}

export default function TrialDetailsModalTitle(
  {
    trial,
    onUpdateTrial,
  }: Props,
) {
  return (
    <div className="flex flex-row items-center">
      <div className="mr-2">
        <Typography variant="h2">
          {getTrialTitle(trial)}
        </Typography>
      </div>

      <div>
        <IconButton onClick={() => onUpdateTrial()}>
          <CreateIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
}
