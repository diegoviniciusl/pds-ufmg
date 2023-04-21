import Repository from '../../types/respository';

const getUsers = (repository: Repository) => {
  return async (_req: any, rep: any) => {
    const users = await repository.user.findMany({
      orderBy: {
        userId: 'desc',
      },
    });

    return rep.status(200).send(users);
  }
} 

export default getUsers;
