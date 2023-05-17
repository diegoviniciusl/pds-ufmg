import { Typography } from '@mui/material';
import React, { } from 'react';
import { TrialHistory } from '../../../../models';
import { AvatarImg } from '../../../../shared/components';
import dateHelper from '../../../../shared/utils/date-helper';
import getTrialStatusAttributes from '../../../../shared/utils/trial/get-trial-status-attributes';

interface Props {
  histories: TrialHistory[];
}

export default function TrialHistoryDisplay({ histories }: Props) {
  return (
    <div className="flex flex-col items-center w-full">
      {histories.map((history, index) => (
        <div key={history.trialHistoryId} className="flex flex-row w-full justify-between mb-2">
          <div className="flex flex-row w-3/8">
            <div className="w-10">
              <AvatarImg size={24} name={history.user.name} />
            </div>
            <Typography noWrap variant="body1">{history.user.name}</Typography>
          </div>
          <Typography classes={{ root: 'w-3/8' }} noWrap variant="body1">
            {`${index !== 0
              ? getTrialStatusAttributes(histories[index].status).text
              : 'Pendente'}
              > ${getTrialStatusAttributes(history.status).text}
              `}
          </Typography>
          <Typography classes={{ root: 'w-2/8' }} noWrap variant="body1">
            {dateHelper.getLocaleDateWithHours(history.createdAt)}
          </Typography>
        </div>
      ))}
    </div>
  );
}
