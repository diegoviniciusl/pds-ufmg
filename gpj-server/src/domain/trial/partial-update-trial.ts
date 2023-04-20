import { Trial } from '@prisma/client';
import Repository from '../../types/respository';
import { findExtendedTrial } from '../../utils/trial/extended-trial-helper';
import getTrialOrderableStatus from '../../utils/trial/get-trial-orderable-status';

const hasExistingTrialNumber = async (repository: Repository, trialId: number, trialNumber?: string | null): Promise<boolean> => {
  if (!trialNumber) return false;

  const foundTrial = await repository.trial.findFirst({
    where: {
      trialId: {
        not: trialId,
      },
      trialNumber,
    },
  });

  return !!foundTrial;
};

const partialUpdateTrial = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { params: { trialId }, body, session } = req;

    if (body.clientId && !await repository.company.findUnique({
      where: {
        companyId: body.clientId,
      },
    })) {
      return rep.status(404).send();
    }
    if (body.officeId && !await repository.company.findUnique({
      where: {
        companyId: body.officeId,
      },
    })) {
      return rep.status(404).send();
    }

    const foundTrial = await repository.trial.findUnique({
      where: {
        trialId,
      },
    });

    if (!foundTrial) {
      return rep.status(404).send();
    }

    const foundTrialNumber = await hasExistingTrialNumber(repository, trialId, body.trialNumber);

    await repository.$transaction(async (tx) => {
      const trial: Trial = await tx.trial.update({
        where: {
          trialId,
        },
        data: {
          ...body,
          deadline: body.deadline ? new Date(body.deadline) : undefined,
          orderableStatus: body.status ? getTrialOrderableStatus(body.status) : undefined,
        },
      });

      if (foundTrial.status !== body.status) {
        await tx.trialHistory.create({
          data: {
            trialId,
            userId: session.user.userId,
            status: trial.status,
          },
        });
      }

      return trial;
    });

    const headers = { 'found-duplicated-trial': foundTrialNumber ? 'true' : 'false' };

    const extendedTrial = await findExtendedTrial(repository, trialId);

    if (extendedTrial === null) {
      return rep.status(404).send();
    }

    return rep.status(200).headers(headers).send(extendedTrial);
  }
} 

export default partialUpdateTrial;
