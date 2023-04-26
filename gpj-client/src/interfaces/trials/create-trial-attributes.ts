import { Trial } from '../../models';

type CreateTrialAttributes = Omit<Trial, 'trialId' | 'status' | 'userId' | 'clientName' | 'officeName' | 'region' | 'trialType'>;

export default CreateTrialAttributes;
