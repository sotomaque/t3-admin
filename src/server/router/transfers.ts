import { Transaction } from './../../types/index';
import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const transferRouter = createRouter().query('transfersByUserId', {
  input: z.object({
    userId: z.string(),
    pageNumber: z.string().nullable().default('0'),
    pageSize: z.string().nullable().default('10'),
    startDate: z.string().nullable().default('1'),
    sortOrder: z.string().nullable().default('desc'),
  }),
  async resolve({ input }) {
    // get userId from input
    const { userId, pageNumber, pageSize, startDate, sortOrder } = input;

    // validate userId
    if (!userId.startsWith('user:')) {
      throw new TRPCError({
        message: 'Invalid UserID Provided to transfersByUserId',
        code: 'BAD_REQUEST',
      });
    }

    // Build URL
    const baseURL = process.env.ECO_BASE_URL;
    const combinedHistoryURL = process.env.ECO_COMBINED_HISTORY;
    const pageNumberQuery = `?pageNumber=${pageNumber}`;
    const pageSizeQuery = `&pageSize=${pageSize}`;
    const startDateQuery = `&startDate=${startDate}`;
    const userIdQuery = `&userID=${userId}`;
    const sortOrderQuery = `&sortOrder=${sortOrder}`;
    if (!baseURL || typeof baseURL !== 'string') {
      throw new TRPCError({
        message: 'Missing Base URL',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    if (!pageNumberQuery || typeof pageNumberQuery !== 'string') {
      throw new TRPCError({
        message: 'Missing pageNumberQuery',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    if (!pageSizeQuery || typeof pageSizeQuery !== 'string') {
      throw new TRPCError({
        message: 'Missing pageSizeQuery',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    if (!startDateQuery || typeof startDateQuery !== 'string') {
      throw new TRPCError({
        message: 'Missing startDateQuery',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    if (!userIdQuery || typeof userIdQuery !== 'string') {
      throw new TRPCError({
        message: 'Missing userIdQuery',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    if (!sortOrderQuery || typeof sortOrderQuery !== 'string') {
      throw new TRPCError({
        message: 'Missing sortOrderQuery',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
    const fullURL = `${baseURL}${combinedHistoryURL}${pageNumberQuery}${pageSizeQuery}${startDateQuery}${userIdQuery}${sortOrderQuery}`;

    // make fetch request to the server for given userId
    const response = await fetch(fullURL);

    // parse the response
    const body = await response.json();
    if (!body || !body.data || !Array.isArray(body.data)) {
      throw new TRPCError({
        message: 'Invalid Response in transfersByUserId',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }

    // extract transfers from the response
    const transfers: Transaction[] = body.data;

    // return transfers
    return { transfers };
  },
});
