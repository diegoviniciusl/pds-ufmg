import { compareMessage } from '../../utils/hash-helper';
import { generateAccessToken } from '../../utils/jwt-token-helper';
import Repository from '../../types/respository';

const login = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { body } = req;

    const user = await repository.user.findFirst({
      where: {
        email: body.email,
        active: true,
      },
    });
    if (!user) {
      return rep.status(404).send();
    }

    const validPassword = compareMessage(body.password, user.password);
    if (!validPassword) {
      return rep.status(404).send();
    }

    const accessToken = generateAccessToken(user);
    return rep.status(200).send({ accessToken });
  }
} 

export default login;
