import dayjs from 'dayjs';
import { Trial } from '../../../models';
import { TrialStatus } from '../../../shared/enums';

const isTrialPastDue = (trial: Trial) => {
  const deadline = dayjs(trial.deadline);
  const today = dayjs();

  return today.isAfter(deadline, 'day') && trial.status !== TrialStatus.SENT;
};

const trialsTableBodyService = {
  isTrialPastDue,
};

export default trialsTableBodyService;
