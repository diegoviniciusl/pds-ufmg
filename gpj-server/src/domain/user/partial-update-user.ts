import { Role } from '@prisma/client';
import Repository from '../../types/respository';
import errorMessages from '../../utils/error-messages';
import { hashMessage } from '../../utils/hash-helper';

const partialUpdateUser = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { params: { userId }, body, session } = req;

    const user = await repository.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return rep.status(404).send();
    }

    const foundEmailUser = await repository.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (foundEmailUser && foundEmailUser.userId !== userId) {
      return rep.status(400).send({ message: errorMessages.EMAIL_BELONGS_TO_A_USER });
    }

    if (userId === session.user.userId && !body.active) {
      return rep.status(400).send({ message: errorMessages.CAN_NOT_DEACTIVATE_OWN_USER });
    }

    if (userId === session.user.userId && body.role === Role.USER) {
      return rep.status(400).send({ message: errorMessages.CAN_NOT_REGRESS_OWN_PERMISSION });
    }

    const updatedUser = await repository.user.update({
      where: {
        userId,
      },
      data: {
        ...body,
        password: body.password ? hashMessage(body.password) : undefined,
      },
    });

    return rep.status(200).send(updatedUser);
  }
} 

export default partialUpdateUser;
