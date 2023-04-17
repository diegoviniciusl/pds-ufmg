import { Role } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import AuthPayload from '../types/auth-payload';
import Options from '../types/options';

const isActiveUser = async (userId: number, options: Options): Promise<boolean> => {
  const user = await options.repository.user.findFirst({
    where:
    {
      userId,
    },
  });

  return user?.active || false;
};

const isValidPayload = (payload: AuthPayload): boolean => !!payload?.user?.userId
  && !!payload.user.email
  && !!payload.user.name
  && !!payload.user.role;

const verifyAuthHeader = async (authHeader: string, roles: Role[], options: Options): Promise<{ valid: boolean; payload?: AuthPayload }> => {
  const [authType, accessToken] = authHeader.split(' ', 2);

  if (authType !== 'Bearer' || !accessToken) {
    return { valid: false };
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET as string) as AuthPayload;
    if (
      !isValidPayload(payload)
      || !roles.includes(payload.user.role)
      || !(await isActiveUser(payload.user.userId, options))
    ) {
      return {
        valid: false,
      };
    }
    return {
      valid: true,
      payload,
    };
  } catch (e) {
    return { valid: false };
  }
};

const authorizer = (
  roles: Role[],
  options: Options,
) => async (
  req: FastifyRequest,
  rep: FastifyReply,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return rep.code(401).send();
  }

  const { valid, payload } = await verifyAuthHeader(authHeader, roles, options);
  if (!valid || !payload) {
    return rep.code(403).send();
  }

  req.session = payload;
  return null;
};

export default authorizer;
