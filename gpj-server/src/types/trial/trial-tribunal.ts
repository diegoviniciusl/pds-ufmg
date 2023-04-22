import TrialType from '../enums/trial-type';
import Region from '../enums/region';

interface TrialTribunal {
  region: Region | null
  trialType: TrialType | null
}

export default TrialTribunal;
