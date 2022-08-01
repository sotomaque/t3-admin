import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';
import { BankSubaccount } from 'types/bankConnections';

export const plaidRouter = createRouter()
  .query('plaidItemId', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      // get userId from input
      const { userId } = input;

      // validate userId
      if (!userId || userId === '' || !userId.startsWith('user:')) {
        throw new TRPCError({
          message: 'Invalid User ID Provided to bankAccountData',
          code: 'BAD_REQUEST',
        });
      }

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const plaidAccountsURL = process.env.ECO_PLAID_ACCOUNTS;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!plaidAccountsURL || typeof plaidAccountsURL !== 'string') {
        throw new TRPCError({
          message: 'Missing plaidAccounts URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const fullURL = `${baseURL}${plaidAccountsURL}?userID=${userId}`;

      // make request
      const response = await fetch(fullURL);
      const body = await response.json();
      if (
        !body ||
        !Array.isArray(Object.keys(body)) ||
        !Object.keys(body).length
      ) {
        throw new TRPCError({
          message: 'Unable to get plaid banking information',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      let plaidItemId = Object.keys(body)[0];
      if (!plaidItemId) {
        throw new TRPCError({
          message: 'Unable to get plaid banking information',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      if (
        !body[plaidItemId] ||
        !body[plaidItemId].accounts ||
        !Array.isArray(Object.keys(body[plaidItemId].accounts)) ||
        !body[plaidItemId].accounts.length ||
        !body[plaidItemId].accounts[0] ||
        !body[plaidItemId].accounts[0].accountID
      ) {
        throw new TRPCError({
          message: 'Unable to get plaid banking information',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      let primeAccountID = body[plaidItemId].accounts[0].accountID;

      return {
        primeAccountID,
      };
    },
  })
  .query('linkedSubaccount', {
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
  })
  .mutation('triggerRelink', {
    input: z.object({
      plaidItemId: z.string(),
    }),
    async resolve({ input }) {
      // get itemId from input
      const { plaidItemId } = input;

      // validate itemId
      if (
        !plaidItemId ||
        plaidItemId === '' ||
        !plaidItemId.startsWith('plaiditem:')
      ) {
        throw new TRPCError({
          message: 'Invalid Plaid Item ID Provided to triggerRelink',
          code: 'BAD_REQUEST',
        });
      }

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const relinkEndpoint = process.env.ECO_PLAID_REQUIRE_RELINK;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!relinkEndpoint || typeof relinkEndpoint !== 'string') {
        throw new TRPCError({
          message: 'Missing Relink URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const fullURL = `${baseURL}${relinkEndpoint}/${plaidItemId}`;

      // make fetch request to the server for given userId
      const response = await fetch(fullURL, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();
      if (!body || !body.response || !body.response.reset_login) {
        throw new TRPCError({
          message: 'Unable to trigger relink',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      return { success: true };
    },
  })
  .mutation('unlinkAccount', {
    input: z.object({
      userId: z.string(),
      plaidItemId: z.string(),
    }),
    async resolve({ input }) {
      // get itemId from input
      const { userId, plaidItemId } = input;

      // validate userId
      if (!userId || userId === '' || !userId.startsWith('user:')) {
        throw new TRPCError({
          message: 'Invalid User ID Provided to linkedSubaccount',
          code: 'BAD_REQUEST',
        });
      }
      // validate itemId
      if (
        !plaidItemId ||
        plaidItemId === '' ||
        !plaidItemId.startsWith('plaiditem:')
      ) {
        throw new TRPCError({
          message: 'Invalid Plaid Item ID Provided to triggerRelink',
          code: 'BAD_REQUEST',
        });
      }

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const unlinkEndpoint = process.env.ECO_PLAID_UNLINK;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!unlinkEndpoint || typeof unlinkEndpoint !== 'string') {
        throw new TRPCError({
          message: 'Missing Unlink URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const fullURL = `${baseURL}${unlinkEndpoint}`;

      // make fetch request to the server for given userId
      const response = await fetch(fullURL, {
        method: 'PATCH',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userId,
          itemID: plaidItemId,
        }),
      });
      const body = await response.json();

      if (!body || !body.institutionRemoved) {
        throw new TRPCError({
          message: 'Unable to unlink institution',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      return { success: true };
    },
  });
