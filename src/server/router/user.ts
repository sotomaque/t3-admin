import { TRPCError } from '@trpc/server';
import { User } from 'types/index';
import { createRouter } from './context';
import { z } from 'zod';

export const userRouter = createRouter()
  .query('recentUsers', {
    async resolve() {
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
      const fullURL = `${baseURL}${recenentUsersURL}`;

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
      if (!body || !Array.isArray(body) || body.length < 1) {
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
  });
