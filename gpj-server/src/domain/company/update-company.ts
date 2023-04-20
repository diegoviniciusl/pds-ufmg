import Repository from '../../types/respository';
import errorMessages from '../../utils/error-messages';

const updateCompany = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { params: { companyId }, body } = req;

    const company = await repository.company.findUnique({
      where: {
        companyId,
      },
    });

    if (!company) {
      return rep.status(404).send();
    }

    if (body.taxNumber) {
      const foundCompanyTaxNumber = await repository.company.findUnique({
        where: {
          taxNumber: body.taxNumber,
        },
      });

      if (foundCompanyTaxNumber && foundCompanyTaxNumber.companyId !== companyId) {
        return rep.status(400).send({ message: errorMessages.TAX_NUMBER_BELONGS_TO_A_COMPANY });
      }
    }

    const updatedCompany = await repository.company.update({
      where: {
        companyId,
      },
      data: {
        ...body,
        email: body.email ?? null,
        notes: body.notes ?? null,
        phone: body.phone ?? null,
        taxNumber: body.taxNumber ?? null,
        receiptDescription: body.receiptDescription ?? null,
      },
    });

    return rep.status(200).send(updatedCompany);
  }
}

export default updateCompany;
