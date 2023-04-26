import { TaskType, TrialStatus } from '../../shared/enums';

interface TrialsFilterAttributes {
  status?: TrialStatus;
  taskType?: TaskType;
  clientId?: number;
  officeId?: number;
  fromCreatedAt?: string;
  toCreatedAt?: string;
  fromDeadline?: string;
  toDeadline?: string;
  pastDue?: boolean
}

export default TrialsFilterAttributes;
