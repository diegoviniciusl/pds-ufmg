import {
  Region, TaskType, TrialSide, TrialStatus, TrialType,
} from '../shared/enums';
import Company from './company';
import TrialHistory from './trial-history';
import User from './user';

interface Trial {
  trialId: number;
  clientId: number;
  officeId: number | null;
  status: TrialStatus;
  trialRequestedByOffice: boolean;
  lawyer: string | null;
  email: string | null;
  taskType: TaskType;
  trialNumber: number | null;
  deadline: string;
  side: TrialSide | null;
  plaintiff: string | null;
  defendant: string | null;
  privateAnnotations: string | null;
  publicAnnotations: string | null;
  user: User;
  client: Company;
  office: Company | null;
  region: Region;
  trialType: TrialType;
  trialHistories: TrialHistory[];
  createdAt?: Date;
  paymentId: number;
}

export default Trial;
