import { Trial, TrialStatus } from '@prisma/client';
import Repository from '../../types/respository';
import { findExtendedTrial } from '../../utils/trial/extended-trial-helper';
import getTrialOrderableStatus from '../../utils/trial/get-trial-orderable-status';



const createTrial = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { body, session } = req;

    if (!await repository.company.findUnique({
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

    const foundTrialNumber = !body.trialNumber ? false : await repository.trial.findFirst({
      where: {
        trialNumber: body.trialNumber,
      },
    });

    const { trialId } = await repository.$transaction(async (tx) => {
      const trial: Trial = await tx.trial.create({
        data: {
          ...body,
          deadline: new Date(body.deadline),
          status: TrialStatus.PENDING,
          orderableStatus: getTrialOrderableStatus(TrialStatus.PENDING),
        },
      });

      await tx.trialHistory.create({
        data: {
          trialId: trial.trialId,
          userId: session.user.userId,
          status: trial.status,
        },
      });

      return trial;
    });

    const headers = { 'found-duplicated-trial': foundTrialNumber ? 'true' : 'false' };

    const extendedTrial = await findExtendedTrial(repository, trialId);

    if (extendedTrial === null) {
      return rep.status(404).send();
    }

    return rep.status(201).headers(headers).send(extendedTrial);
  }
} 

export default createTrial;
