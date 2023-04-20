import Repository from '../../types/respository';

const getCompanies = (repository: Repository) => {
  return async (_req: any, rep: any) => {
    const companies = await repository.company.findMany({
      orderBy: {
        companyId: 'desc',
      },
    });

    return rep.status(200).send(companies);
  }
}

export default getCompanies;
