import { Trial } from '../../models';

type UpdateTrialAttributes = Partial<Omit<Trial, 'clientName' | 'officeName' | 'region' | 'trialType' | 'trialId'>> & { trialId: number };

export default UpdateTrialAttributes;
