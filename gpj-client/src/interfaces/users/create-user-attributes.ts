import { User } from '../../models';

type CreateUserAttributes = Omit<User & { password: string }, 'userId' | 'active'>;

export default CreateUserAttributes;
