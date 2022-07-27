import { createRouter } from './context';
import { z } from 'zod';

export const giftcardRouter = createRouter().query('recentPurchases', {
  input: z.object({
    pageNumber: z.string().default('0').nullable(),
    pageSize: z.string().default('10').nullable(),
    startDate: z.string().default('1').nullable(),
    sortOrder: z.string().default('desc').nullable(),
  }),
  async resolve({ input }) {
    // Get query params from input
    const { pageNumber, pageSize, startDate, sortOrder } = input;

    // Build URL
    // const baseURL = process.env.ECO_BASE_URL;
    // const recentPurchasesURL = process.env.ECO_GIFTCARDS;
    // if (!baseURL || typeof baseURL !== 'string') {
    //   throw new TRPCError({
    //     message: 'Missing Base URL',
    //     code: 'INTERNAL_SERVER_ERROR',
    //   });
    // }
    // if (!recentPurchasesURL || typeof recentPurchasesURL !== 'string') {
    //   throw new TRPCError({
    //     message: 'Missing Recent Purchases URL',
    //     code: 'INTERNAL_SERVER_ERROR',
    //   });
    // }
    // const pageNumberQuery = `?pageNumber=${pageNumber}`;
    // const pageSizeQuery = `&pageSize=${pageSize}`;
    // const startDateQuery = `&startDate=${startDate}`;
    // const sortOrderQuery = `&sortOrder=${sortOrder}`;
    // const fullURL = `${baseURL}${recenentUsersURL}${pageNumberQuery}${pageSizeQuery}${startDateQuery}${sortOrderQuery}`;
    // // make fetch request to the server for given userId
    // const response = await fetch(fullURL);

    // // parse the response
    // const body = await response.json();
    // if (!body || !Array.isArray(body)) {
    //   throw new TRPCError({
    //     message: 'Invalid Response (empty or not an array) in recentUsers',
    //     code: 'INTERNAL_SERVER_ERROR',
    //   });
    // }

    // // extract user from the response
    // const users: User[] = body;

    // // return user
    // return { users };
  },
});
