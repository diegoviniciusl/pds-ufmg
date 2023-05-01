import axiosInstance from './config/axios';
import CreateTrialRequest from './requests/trial/create-trial-request';
import DeleteTrialRequest from './requests/trial/delete-trial-request';
import GetTrialsRequest from './requests/trial/get-trials-request';
import UpdateTrialRequest from './requests/trial/update-trial-request';
import CreateTrialResponse from './responses/trial/create-trial-response';
import DeleteTrialResponse from './responses/trial/delete-trial-response';
import GetTrialsResponse from './responses/trial/get-trials-response';
import UpdateTrialResponse from './responses/trial/update-trial-response';

const TRIAL_BASE_URL = '/trial';

const createTrial = async (request: CreateTrialRequest) => (axiosInstance.post<CreateTrialResponse>(TRIAL_BASE_URL, request));

const getTrials = async (request: GetTrialsRequest) => (axiosInstance.get<GetTrialsResponse>(TRIAL_BASE_URL, { params: request }));

const getTrialsCsv = async () => (axiosInstance.get<string>(`${TRIAL_BASE_URL}/csv`));

const updateTrial = async (request: UpdateTrialRequest) => (axiosInstance.patch<UpdateTrialResponse>(`${TRIAL_BASE_URL}/${request.trialId}`, request));

const deleteTrial = async (request: DeleteTrialRequest) => (axiosInstance.delete<DeleteTrialResponse>(`${TRIAL_BASE_URL}/${request.trialId}`));

export default {
  createTrial,
  getTrials,
  updateTrial,
  getTrialsCsv,
  deleteTrial,
};
