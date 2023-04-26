import { Trial } from '../../models';

type TrialOrderableKeys = Omit<Trial, 'trialRequestedByOffice' | 'user' | 'clientId' | 'officeId' | 'region' | 'trialType' | 'trialHistories' | 'createdAt' | 'paymentId'>;

export default TrialOrderableKeys;
