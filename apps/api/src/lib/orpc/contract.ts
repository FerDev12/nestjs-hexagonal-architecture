import { oc } from '@orpc/contract';
import { CreateUserSchema } from './schemas/create-user.schema';
import { UserSchema } from './schemas/user.schema';
import { GetUserByEmailSchema } from './schemas/get-user-by-email.schema';
import { populateContractRouterPaths } from '@orpc/nest';

const createUserContract = oc
  .route({
    method: 'POST',
    path: '/orpc/users',
  })
  .input(CreateUserSchema)
  .output(UserSchema.pick({ id: true }));

const getUsersContract = oc
  .route({
    method: 'GET',
    path: '/orpc/users',
  })
  .output(UserSchema.array());

const getUserByEmailContract = oc
  .route({
    method: 'GET',
    path: '/orpc/users/email',
  })
  .input(GetUserByEmailSchema)
  .output(UserSchema);

export const orpcContract = populateContractRouterPaths({
  users: {
    list: getUsersContract,
    getByEmail: getUserByEmailContract,
    create: createUserContract,
  },
});
