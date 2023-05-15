import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CreateCompanyAttributes, UpdateCompanyAttributes } from '../../../interfaces';
import { api } from '../../../libs';
import errorMessages from '../../../libs/api/helpers/error-messages';
import CreateCompanyResponse from '../../../libs/api/responses/company/create-company-response';
import GetCompaniesResponse from '../../../libs/api/responses/company/get-companies-response';
import UpdateCompanyResponse from '../../../libs/api/responses/company/update-company-response';
import ErrorResponse from '../../../libs/api/responses/error-response';
import Company from '../../../models/company';
import toastMessages from '../../../shared/utils/toast-messages';

const createCompany = async (createCompanyAttributes: CreateCompanyAttributes): Promise<Company> => {
  let createCompanyResponse: AxiosResponse<CreateCompanyResponse>;
  try {
    createCompanyResponse = await api.company.createCompany(createCompanyAttributes);
  } catch (error: unknown) {
    const errorMessage = (error as AxiosError<ErrorResponse>).response?.data.message;

    switch (errorMessage) {
      case errorMessages.TAX_NUMBER_BELONGS_TO_A_COMPANY: {
        toast.error(toastMessages.error.TAX_NUMBER_BELONGS_TO_A_COMPANY);
        break;
      }
      default: {
        toast.error(toastMessages.error.DEFAULT);
      }
    }

    throw (error as AxiosError<ErrorResponse>);
  }

  toast.success(toastMessages.success.DEFAULT);
  return createCompanyResponse?.data;
};

const updateCompany = async (updateCompanyAttributes: UpdateCompanyAttributes): Promise<Company> => {
  let updateCompanyResponse: AxiosResponse<UpdateCompanyResponse>;
  try {
    updateCompanyResponse = await api.company.updateCompany(updateCompanyAttributes);
  } catch (error: unknown) {
    const errorMessage = (error as AxiosError<ErrorResponse>).response?.data.message;

    switch (errorMessage) {
      case errorMessages.TAX_NUMBER_BELONGS_TO_A_COMPANY: {
        toast.error(toastMessages.error.TAX_NUMBER_BELONGS_TO_A_COMPANY);
        break;
      }
      default: {
        toast.error(toastMessages.error.DEFAULT);
      }
    }

    throw (error as AxiosError<ErrorResponse>);
  }

  toast.success(toastMessages.success.DEFAULT);
  return updateCompanyResponse?.data;
};

const getCompanies = async (): Promise<GetCompaniesResponse> => {
  const getCompaniesResponse: AxiosResponse<GetCompaniesResponse> = await api.company.getCompanies();
  return getCompaniesResponse.data;
};
const partialMatchKeys = ['name', 'email'] as (keyof Company)[];
const fullMatchKeys = ['companyId', 'phone', 'taxNumber'] as (keyof Company)[];

const companiesService = {
  getCompanies,
  createCompany,
  updateCompany,
  partialMatchKeys,
  fullMatchKeys,
};

export default companiesService;
