import Repository from '../../types/respository';

const deleteTrial = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { params: { trialId } } = req;

    if (!await repository.trial.findUnique({
      where: {
        trialId,
      },
    })) {
      return rep.status(404).send();
    }

    await repository.$transaction(async (tx) => {
      await tx.trialHistory.deleteMany({
        where: {
          trialId,
        },
      });

      await tx.trial.delete({
        where: {
          trialId,
        },
      });
    });

    return rep.status(204).send();
  }
} 

export default deleteTrial;
