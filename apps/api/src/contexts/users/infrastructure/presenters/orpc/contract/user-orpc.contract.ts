import { oc } from '@orpc/contract';
import { CreateUserSchema } from '../schemas/create-user.schema';
import { UserSchema } from '../schemas/user.schema';
import { GetUserByEmailSchema } from '../schemas/get-user-by-email.schema';
import { populateContractRouterPaths } from '@orpc/nest';

export const createUserContract = oc
  .route({
    method: 'POST',
    path: '/users',
  })
  .input(CreateUserSchema)
  .output(UserSchema.pick({ id: true }));

export const getUsersContract = oc
  .route({
    method: 'GET',
    path: '/users',
  })
  .output(UserSchema.array());

export const getUserByEmailContract = oc
  .route({
    method: 'GET',
    path: '/users/email',
  })
  .input(GetUserByEmailSchema)
  .output(UserSchema);

export const usersOrpcContract = populateContractRouterPaths({
  users: {
    list: getUsersContract,
    getByEmail: getUserByEmailContract,
    create: createUserContract,
  },
});
