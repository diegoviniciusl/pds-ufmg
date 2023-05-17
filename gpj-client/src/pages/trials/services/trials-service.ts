import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import {
  CreateTrialAttributes, DeleteTrialAttributes, GetTrialsAttributes, TrialOrderableKeys, UpdateTrialAttributes,
} from '../../../interfaces';
import { api } from '../../../libs';
import ErrorResponse from '../../../libs/api/responses/error-response';
import CreateTrialResponse from '../../../libs/api/responses/trial/create-trial-response';
import DeleteTrialResponse from '../../../libs/api/responses/trial/delete-trial-response';
import GetTrialsResponse from '../../../libs/api/responses/trial/get-trials-response';
import UpdateTrialResponse from '../../../libs/api/responses/trial/update-trial-response';
import { Trial } from '../../../models';
import TrialOrderableColumn from '../../../shared/enums/trial-orderable-colum';
import { TRIALS_CSV_FILE_NAME } from '../../../shared/utils/constants';
import fileSeverHelper from '../../../shared/utils/file-saver-helper';
import toastMessages from '../../../shared/utils/toast-messages';

const createTrial = async (createTrialAttributes: CreateTrialAttributes): Promise<Trial> => {
  let createTrialResponse: AxiosResponse<CreateTrialResponse>;
  try {
    createTrialResponse = await api.trial.createTrial(createTrialAttributes);
  } catch (error: unknown) {
    toast.error(toastMessages.error.DEFAULT);
    throw (error as AxiosError<ErrorResponse>);
  }

  toast.success(toastMessages.success.DEFAULT);
  if (createTrialResponse.headers['found-duplicated-trial'] === 'true') {
    toast.warn(toastMessages.warn.FOUND_DUPLICATED_TRIAL);
  }
  return createTrialResponse?.data;
};

const getTrials = async (getTrialsAttributes: GetTrialsAttributes): Promise<GetTrialsResponse> => {
  const getTrialsResponse: AxiosResponse<GetTrialsResponse> = await api.trial.getTrials(getTrialsAttributes);
  return getTrialsResponse.data;
};

const updateTrial = async (updateTrialAttributes: UpdateTrialAttributes): Promise<Trial> => {
  let updateTrialResponse: AxiosResponse<UpdateTrialResponse>;
  try {
    updateTrialResponse = await api.trial.updateTrial(updateTrialAttributes);
  } catch (error: unknown) {
    toast.error(toastMessages.error.DEFAULT);
    throw (error as AxiosError<ErrorResponse>);
  }

  toast.success(toastMessages.success.DEFAULT);

  return updateTrialResponse?.data;
};

const downloadTrialsCsv = async () => {
  let getTrialsCsvResponse: AxiosResponse<string>;

  try {
    getTrialsCsvResponse = await api.trial.getTrialsCsv();
  } catch (error: unknown) {
    toast.error(toastMessages.error.DEFAULT);
    throw (error as AxiosError<ErrorResponse>);
  }

  if (!getTrialsCsvResponse?.data) {
    toast.error(toastMessages.error.DEFAULT);
    return;
  }

  fileSeverHelper.saveCsvFile(getTrialsCsvResponse.data, TRIALS_CSV_FILE_NAME);
};

const deleteTrial = async (deleteTrialsAttributes: DeleteTrialAttributes): Promise<DeleteTrialResponse> => {
  let deleteTrialResponse: AxiosResponse<DeleteTrialResponse>;
  try {
    deleteTrialResponse = await api.trial.deleteTrial(deleteTrialsAttributes);
  } catch (error: unknown) {
    toast.error(toastMessages.error.DEFAULT);
    throw (error as AxiosError<ErrorResponse>);
  }

  toast.success(toastMessages.success.DEFAULT);

  return deleteTrialResponse?.data;
};

const getTrialOrderableColumnFromTrialKey = (key: keyof TrialOrderableKeys) => {
  const trialsOrderableColumnsByTrialKeys: Record<keyof TrialOrderableKeys, TrialOrderableColumn> = {
    trialId: TrialOrderableColumn.TRIAL_ID,
    client: TrialOrderableColumn.CLIENT,
    office: TrialOrderableColumn.OFFICE,
    status: TrialOrderableColumn.STATUS,
    lawyer: TrialOrderableColumn.LAWYER,
    email: TrialOrderableColumn.EMAIL,
    taskType: TrialOrderableColumn.TASK_TYPE,
    trialNumber: TrialOrderableColumn.TRIAL_NUMBER,
    deadline: TrialOrderableColumn.DEADLINE,
    side: TrialOrderableColumn.SIDE,
    plaintiff: TrialOrderableColumn.PLAINTIFF,
    defendant: TrialOrderableColumn.DEFENDANT,
    privateAnnotations: TrialOrderableColumn.PRIVATE_ANNOTATIONS,
    publicAnnotations: TrialOrderableColumn.PUBLIC_ANNOTATIONS,
  };

  return trialsOrderableColumnsByTrialKeys[key];
};

const fullMatchKeys = ['trialId', 'trialNumber'] as (keyof Trial)[];

const trialsService = {
  getTrialOrderableColumnFromTrialKey,
  createTrial,
  getTrials,
  updateTrial,
  deleteTrial,
  fullMatchKeys,
  downloadTrialsCsv,
};

export default trialsService;
