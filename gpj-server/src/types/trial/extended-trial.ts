import { FromSchema } from 'json-schema-to-ts';
import { extendedTrialSchema } from '../../schemas/trial/trial';

type ExtendedTrial = FromSchema<typeof extendedTrialSchema>;

export default ExtendedTrial;
