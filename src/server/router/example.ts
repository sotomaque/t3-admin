import { User } from 'types/index';
import { createRouter } from './context';
import { z } from 'zod';

export const exampleRouter = createRouter()
  .query('users', {
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
  .query('user', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      // get userId from input
      const { userId } = input;

      if (!userId.startsWith('user:')) {
        return;
      }

      let baseURL = `https://api.staging.app.eco.com`;
      let usersEndpoint = `/api/v1/admin/users?userID=${userId}`;

      // make fetch request to the server for given userId
      const response = await fetch(`${baseURL}${usersEndpoint}`);

      // parse the response
      const body = await response.json();
      if (!body || !Array.isArray(body) || body.length !== 1) {
        return;
      }

      // extract user from the response
      const user: User = body[0];

      // return user
      return { user };
    },
  });
