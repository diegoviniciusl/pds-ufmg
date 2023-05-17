import React from 'react';
import { TrialStatus } from '../../../../shared/enums';
import getTrialStatusAttributes from '../../../../shared/utils/trial/get-trial-status-attributes';

interface Props {
  status: TrialStatus;
}

export default function TrialsStatusLabel({ status }: Props) {
  const trialAtributes = getTrialStatusAttributes(status);

  return (
    <div className={`${trialAtributes.color} w-35 rounded-md`}>
      <p className="p-2">{trialAtributes.text}</p>
    </div>
  );
}
