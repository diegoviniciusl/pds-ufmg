import {
  Company, Trial, TrialHistory, User,
} from '@prisma/client';

type RawExtendedTrial = (Trial & {
  client: Company,
  office: Company | null,
  trialHistories: (TrialHistory & {
    user: User
  })[];
});

export default RawExtendedTrial;
