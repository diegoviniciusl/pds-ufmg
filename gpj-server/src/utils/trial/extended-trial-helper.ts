import {
  Prisma,
} from '@prisma/client';
import RawExtendedTrial from '../../types/trial/raw-extended-trial';
import ExtendedTrial from '../../types/trial/extended-trial';
import { getDateFromDateTime } from '../date-helper';
import getTrialTribunal from './get-trial-tribunal';
import Repository from '../../types/respository';

export const includeForExtendedTrialQuery = {
  client: true,
  office: true,
  trialHistories: {
    include: {
      user: true,
    },
    orderBy: {
      trialHistoryId: Prisma.SortOrder.desc,
    },
  },
};

export const parseExtendedTrial = (trial: RawExtendedTrial): ExtendedTrial => {
  const trialTribunal = getTrialTribunal(trial.trialNumber);

  return {
    ...trial,
    createdAt: trial.createdAt.toISOString(),
    trialHistories: trial.trialHistories.map((trialHistory) => ({ ...trialHistory, createdAt: trialHistory.createdAt.toISOString() })),
    deadline: getDateFromDateTime(trial.deadline),
    user: trial.trialHistories[0].user,
    region: trialTribunal.region,
    trialType: trialTribunal.trialType,
  };
};

export const findExtendedTrial = async (repository: Repository, trialId: number) => {
  const extendedTrial = await repository.trial.findUnique({
    include: includeForExtendedTrialQuery,
    where: {
      trialId,
    },
  });

  if (!extendedTrial) {
    return null;
  }

  return parseExtendedTrial(extendedTrial);
};
