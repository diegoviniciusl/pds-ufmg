import Repository from '../../types/respository';
import errorMessages from '../../utils/error-messages';

const createCompany = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { body } = req;
    if (body.taxNumber && await repository.company.findUnique({
      where: {
        taxNumber: body.taxNumber,
      },
    })) {
      return rep.status(400).send({ message: errorMessages.TAX_NUMBER_BELONGS_TO_A_COMPANY });
    }

    const company = await repository.company.create({
      data: body,
    });

    return rep.status(201).send(company);
  };
};

export default createCompany;
