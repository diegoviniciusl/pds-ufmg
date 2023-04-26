import { Company } from '../../models';

type CreateCompanyAttributes = Omit<Company, 'companyId'>;

export default CreateCompanyAttributes;
