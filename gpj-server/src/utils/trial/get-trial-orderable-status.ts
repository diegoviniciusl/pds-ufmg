import { TrialStatus } from '@prisma/client';

const trialOrderMapping: Record<keyof typeof TrialStatus, number> = {
  [TrialStatus.PENDING]: 0,
  [TrialStatus.IN_PROGRESS]: 1,
  [TrialStatus.TO_CHECK]: 2,
  [TrialStatus.IN_CONFERENCE]: 3,
  [TrialStatus.CHECKED]: 4,
  [TrialStatus.SENT]: 5,
};

const getTrialOrderableStatus = (trialStatus: TrialStatus): number => trialOrderMapping[trialStatus];

export default getTrialOrderableStatus;
