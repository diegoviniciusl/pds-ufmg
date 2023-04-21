import Repository from '../../types/respository';
import errorMessages from '../../utils/error-messages';
import { hashMessage } from '../../utils/hash-helper';

const createUser = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { body } = req;

    const foundEmailUser = await repository.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (foundEmailUser) {
      return rep.status(400).send({ message: errorMessages.EMAIL_BELONGS_TO_A_USER });
    }

    const user = await repository.user.create({
      data: {
        ...body,
        password: hashMessage(body.password),
      },
    });

    return rep.status(201).send(user);
  }
} 

export default createUser;
