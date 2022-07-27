import { TRPCError } from '@trpc/server';
import { Referral, User } from 'types/index';
import { createRouter } from './context';
import { z } from 'zod';
import { BankConnection } from 'types/bankConnections';

export const userRouter = createRouter()
  .mutation('recentUsers', {
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
      const baseURL = process.env.ECO_BASE_URL;
      const recenentUsersURL = process.env.ECO_RECENT_USERS;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!recenentUsersURL || typeof recenentUsersURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Recent Users URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const pageNumberQuery = `?pageNumber=${pageNumber}`;
      const pageSizeQuery = `&pageSize=${pageSize}`;
      const startDateQuery = `&startDate=${startDate}`;
      const sortOrderQuery = `&sortOrder=${sortOrder}`;
      const fullURL = `${baseURL}${recenentUsersURL}${pageNumberQuery}${pageSizeQuery}${startDateQuery}${sortOrderQuery}`;
      // make fetch request to the server for given userId
      const response = await fetch(fullURL);

      // parse the response
      const body = await response.json();
      if (!body || !Array.isArray(body)) {
        throw new TRPCError({
          message: 'Invalid Response (empty or not an array) in recentUsers',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // extract user from the response
      const users: User[] = body;

      // return user
      return { users };
    },
  })
  .query('userByUserId', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      // get userId from input
      const { userId } = input;

      // validate userId
      if (!userId.startsWith('user:')) {
        throw new TRPCError({
          message: 'Invalid UserID Provided to usersByUserId',
          code: 'BAD_REQUEST',
        });
      }

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const usersURL = process.env.ECO_RECENT_USERS;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!usersURL || typeof usersURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Users URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const userIdQuery = `?userID=${userId}`;
      const fullURL = `${baseURL}${usersURL}${userIdQuery}`;

      // make fetch request to the server for given userId
      const response = await fetch(fullURL);

      // parse the response
      const body = await response.json();

      if (!body || !Array.isArray(body) || body.length < 1) {
        throw new TRPCError({
          message: 'Invalid Response (empty or not an array) in usersByUserId',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // extract user from the response
      const user: User = body[0];

      // return user
      return { user };
    },
  })
  .query('usersByUsername', {
    input: z.object({
      username: z.string(),
    }),
    async resolve({ input }) {
      // get username from input
      const { username } = input;

      // validate input
      if (!username || typeof username !== 'string') {
        throw new TRPCError({
          message: 'Invalid Username Provided to usersByUsername',
          code: 'BAD_REQUEST',
        });
      }

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const usersURL = process.env.ECO_RECENT_USERS;
      if (!usersURL || typeof usersURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Users URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const usernameQuery = `?username=${username}`;
      const fullURL = `${baseURL}${usersURL}${usernameQuery}`;

      // make fetch request to the server for given username
      const response = await fetch(fullURL);

      // parse the response
      const body = await response.json();
      if (!body || !Array.isArray(body)) {
        throw new TRPCError({
          message:
            'Invalid Response (empty or not an array) in usersByUsername',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // extract user(s) from the response
      const users: User[] = body;

      // return user(s)
      return { users };
    },
  })
  .query('referralsByUserId', {
    input: z.object({
      userId: z.string(),
      pageSize: z.string().optional().default('10'),
    }),
    async resolve({ input }) {
      // get userId from input
      const { userId, pageSize } = input;

      // validate userId
      if (!userId.startsWith('user:')) {
        throw new TRPCError({
          message: 'Invalid UserID Provided to referralsByUserId',
          code: 'BAD_REQUEST',
        });
      }

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const referralsURL = process.env.ECO_REFERRALS;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!referralsURL || typeof referralsURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Referrals URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const pageSizeQuery = `?pageSize=${pageSize}`;
      const userIdQuery = `&referringUserID=${userId}`;
      const fullURL = `${baseURL}${referralsURL}${pageSizeQuery}${userIdQuery}`;

      // make fetch request to the server for given userId
      const response = await fetch(fullURL);

      // parse the response
      const body = await response.json();
      if (!body || !body?.referrals || !Array.isArray(body.referrals)) {
        throw new TRPCError({
          message: 'Invalid Response in referralsByUserId',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      if (body.referrals.length < 1) {
        return { referrals: [] };
      }

      // extract referrals from the response
      const referrals: Referral[] = body.referrals;

      // return referrals
      return { referrals };
    },
  })
  .query('bankConnectionsByUserId', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      // get userId from input
      const { userId } = input;

      // validate userId
      if (!userId.startsWith('user:')) {
        throw new TRPCError({
          message: 'Invalid UserID Provided to bankConnectionsByUserId',
          code: 'BAD_REQUEST',
        });
      }

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const bankConnectionsURL = process.env.ECO_BANK_CONNECTIONS;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!bankConnectionsURL || typeof bankConnectionsURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Bank Connections URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const userIdQuery = `?userID=${userId}`;
      const fullURL = `${baseURL}${bankConnectionsURL}${userIdQuery}`;

      // make fetch request to the server for given userId
      const response = await fetch(fullURL);

      // parse the response
      const body = await response.json();
      if (!body || !Array.isArray(body)) {
        throw new TRPCError({
          message: 'Invalid Response in bankConnectionsByUserId',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      if (body.length < 1) {
        return { connections: [] };
      }

      // extract connections from the response
      const connections: BankConnection[] = body;

      // return connections
      return { connections };
    },
  });
