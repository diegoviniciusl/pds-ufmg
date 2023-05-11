import { Trial } from '../../../models';
import getTaskTypeLabel from '../get-task-type-label';

const getTrialTitle = (trial: Trial) => `${getTaskTypeLabel(trial.taskType)} de ${trial.client.name}`;

export default getTrialTitle;
