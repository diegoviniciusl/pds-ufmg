import { TrialStatus } from '../shared/enums';
import User from './user';

interface TrialHistory {
  trialHistoryId: number,
  trialId: number,
  user: User,
  status: TrialStatus,
  createdAt: string,
}

export default TrialHistory;
