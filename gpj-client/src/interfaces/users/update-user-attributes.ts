import { User } from '../../models';

type UpdateUserAttributes = User & { password?: string };

export default UpdateUserAttributes;
