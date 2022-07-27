import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';
import { BankSubaccount } from 'types/bankConnections';

export const plaidRouter = createRouter().query('linkedSubaccount', {
  input: z.object({
    userId: z.string(),
    itemId: z.string(),
  }),
  async resolve({ input }) {
    // get userId and itemId from input
    const { userId, itemId } = input;

    // validate userId
    if (!userId || userId === '' || !userId.startsWith('user:')) {
      throw new TRPCError({
        message: 'Invalid User ID Provided to linkedSubaccount',
        code: 'BAD_REQUEST',
      });
    }
    // validate itemId
    if (!itemId || itemId === '' || !itemId.startsWith('plaiditem:')) {
      throw new TRPCError({
        message: 'Invalid Plaid Item ID Provided to linkedSubaccount',
        code: 'BAD_REQUEST',
      });
    }

    // Build URL
    const baseURL = process.env.ECO_BASE_URL;
    const subaccountsURL = process.env.ECO_BANK_SUBACCOUNTS;
    if (!baseURL || typeof baseURL !== 'string') {
      throw new TRPCError({
        message: 'Missing Base URL',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    if (!subaccountsURL || typeof subaccountsURL !== 'string') {
      throw new TRPCError({
        message: 'Missing Bank Subaccounts URL',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    const itemIdQuery = `?itemID=${itemId}`;
    const userIdQuery = `&userID=${userId}`;
    const fullURL = `${baseURL}${subaccountsURL}${itemIdQuery}${userIdQuery}`;

    // make fetch request to the server for given userId
    const response = await fetch(fullURL);

    // parse the response
    const body = await response.json();
    if (!body || !body.accounts || !Array.isArray(body.accounts)) {
      throw new TRPCError({
        message: 'Invalid Response in linkedSubaccount',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }

    if (body.accounts.length < 1) {
      return { subaccounts: [] };
    }

    // extract connections from the response
    const subaccounts: BankSubaccount[] = body.accounts;

    // return connections
    return { subaccounts };
  },
});
