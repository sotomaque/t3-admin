// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { featureFlagRouter } from './featureFlags';
import { kycRouter } from './kyc';
import { plaidRouter } from './plaid';
import { protectedExampleRouter } from './protected-example-router';
import { registrationRouter } from './registration';
import { transferRouter } from './transfers';
import { userRouter } from './user';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('featureFlags.', featureFlagRouter)
  .merge('kyc.', kycRouter)
  .merge('plaid.', plaidRouter)
  .merge('registration.', registrationRouter)
  .merge('transfer.', transferRouter)
  .merge('user.', userRouter)
  .merge('question.', protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
