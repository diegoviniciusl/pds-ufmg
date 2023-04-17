import Region from '../../types/enums/region';
import TrialType from '../../types/enums/trial-type';
import TrialTribunal from '../../types/trial/trial-tribunal';

const trialTypeMapping: Record<string, TrialType> = {
  1: TrialType.STF,
  2: TrialType.CNJ,
  3: TrialType.STJ,
  4: TrialType.FEDERAL,
  5: TrialType.TRABALHISTA,
  6: TrialType.ELEITORAL,
  7: TrialType.MILITAR_F,
  8: TrialType.CIVEL,
  9: TrialType.MILITAR_E,
};

const regionMapping: Record<string, Record<string, Region>> = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {
    '01': Region.RJ,
    '02': Region.SP,
    '03': Region.MG,
    '04': Region.RS,
    '05': Region.BA,
    '06': Region.PE,
    '07': Region.CE,
    '08': Region.PA_AP,
    '09': Region.PR,
    10: Region.DF_TO,
    11: Region.AM_PR,
    12: Region.SC,
    13: Region.PB,
    14: Region.AC_RO,
    15: Region.CAMP,
    16: Region.MA,
    17: Region.ES,
    18: Region.GO,
    19: Region.AL,
    20: Region.SE,
    21: Region.RN,
    22: Region.PI,
    23: Region.MT,
    24: Region.MS,
  },
  6: {},
  7: {},
  8: {
    '00': Region.TSE,
    '01': Region.AC,
    '02': Region.AL,
    '03': Region.AP,
    '04': Region.AM,
    '05': Region.BA,
    '06': Region.CE,
    '07': Region.DF,
    '08': Region.ES,
    '09': Region.GO,
    10: Region.MA,
    11: Region.MT,
    12: Region.MS,
    13: Region.MG,
    14: Region.PA,
    15: Region.PB,
    16: Region.PR,
    17: Region.PE,
    18: Region.PI,
    19: Region.RJ,
    20: Region.RN,
    21: Region.RS,
    22: Region.RO,
    23: Region.RR,
    24: Region.SC,
    25: Region.SE,
    26: Region.SP,
    27: Region.TO,
  },
  9: {},
};

const getTrialTribunal = (trialNumber: string | null): TrialTribunal => {
  if (!trialNumber || trialNumber.length !== 20) {
    return {
      trialType: null,
      region: null,
    };
  }

  const trialTypeCode = trialNumber.substring(13, 14);
  const regionCode = trialNumber.substring(14, 16);

  return {
    trialType: trialTypeMapping[trialTypeCode] || null,
    region: regionMapping[trialTypeCode][regionCode] || null,
  };
};

export default getTrialTribunal;
