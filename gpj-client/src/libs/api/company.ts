import axiosInstance from './config/axios';
import CreateCompanyRequest from './requests/company/create-company-request';
import UpdateCompanyRequest from './requests/company/update-company-request';
import CreateCompanyResponse from './responses/company/create-company-response';
import GetCompaniesResponse from './responses/company/get-companies-response';
import UpdateCompanyResponse from './responses/company/update-company-response';

const COMPANY_BASE_URL = '/company';

const createCompany = async (request: CreateCompanyRequest) => (axiosInstance.post<CreateCompanyResponse>(COMPANY_BASE_URL, request));

const updateCompany = async (request: UpdateCompanyRequest) => (axiosInstance.put<UpdateCompanyResponse>(`${COMPANY_BASE_URL}/${request.companyId}`, request));

const getCompanies = async () => (axiosInstance.get<GetCompaniesResponse>(COMPANY_BASE_URL));

export default {
  getCompanies,
  createCompany,
  updateCompany,
};
