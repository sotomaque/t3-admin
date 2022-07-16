// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { userRouter } from './user';
import { transferRouter } from './transfers';
import { registrationRouter } from './registration';
import { kycRouter } from './kyc';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('user.', userRouter)
  .merge('registration.', registrationRouter)
  .merge('kyc.', kycRouter)
  .merge('transfer.', transferRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
