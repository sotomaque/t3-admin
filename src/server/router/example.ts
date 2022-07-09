import { Transaction } from './../../types/index';
import { User } from 'types/index';
import { createRouter } from './context';
import { z } from 'zod';

export const exampleRouter = createRouter()
  .query('recentUsers', {
    async resolve() {
      let baseURL = `https://api.staging.app.eco.com`;
      let usersEndpoint = `/api/v1/admin/users`;

      // make fetch request to the server for given userId
      const response = await fetch(`${baseURL}${usersEndpoint}`);

      // parse the response
      const body = await response.json();
      if (!body || !Array.isArray(body)) {
        return;
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
        console.log('Invalid userID provided to GET User query');
        return;
      }

      let baseURL = `https://api.staging.app.eco.com`;
      let userIdEndpoint = `/api/v1/admin/users?userID=${userId}`;

      // make fetch request to the server for given userId
      const response = await fetch(`${baseURL}${userIdEndpoint}`);

      // parse the response
      const body = await response.json();

      console.log({ body });
      if (!body || !Array.isArray(body) || body.length <= 1) {
        return;
      }

      // extract user from the response
      const user: User = body[0];

      // return user
      return { user };
    },
  })
  .query('userByUsername', {
    input: z.object({
      username: z.string(),
    }),
    async resolve({ input }) {
      // get username from input
      const { username } = input;
      let baseURL = `https://api.staging.app.eco.com`;
      let usernameEndpoint = `/api/v1/admin/users?username=${username}`;

      // make fetch request to the server for given username
      const response = await fetch(`${baseURL}${usernameEndpoint}`);

      // parse the response
      const body = await response.json();

      if (!body || !Array.isArray(body) || body.length <= 1) {
        return;
      }

      // extract users from the response
      const user: User[] = body;

      // return user
      return { user };
    },
  })
  .query('transfersByUserId', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      // get userId from input
      // const { userId } = input;
      // console.log({ userId });
      // TEMP hardcode userId until i add search + debounce
      let userId = 'user:9530c662-582c-4b6c-9e58-83286411740d';
      if (!userId.startsWith('user:')) {
        return;
      }

      let baseURL = `https://api.staging.app.eco.com`;
      let usersEndpoint = `/api/v1/admin/queryfacade/combinedhistory?pageNumber=1&pageSize=10&startDate=1&userID=${userId}&sortOrder=desc`;

      // make fetch request to the server for given userId
      const response = await fetch(`${baseURL}${usersEndpoint}`);

      // parse the response
      const body = await response.json();
      if (!body || !body.data || !Array.isArray(body.data)) {
        return;
      }

      // extract transfers from the response
      const transfers: Transaction[] = body.data;

      // return transfers
      return { transfers };
    },
  });
