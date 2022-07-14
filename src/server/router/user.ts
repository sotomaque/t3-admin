import { User } from 'types/index';
import { createRouter } from './context';
import { z } from 'zod';

export const userRouter = createRouter()
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
  .query('usersByUsername', {
    input: z.object({
      username: z.string(),
    }),
    async resolve({ input }) {
      // get username from input
      const { username } = input;

      let baseURL = `https://api.staging.app.eco.com`;
      let usernameEndpoint = `/api/v1/admin/users?username=${username}`;
      let fullURL = `${baseURL}${usernameEndpoint}`;

      // make fetch request to the server for given username
      const response = await fetch(fullURL);
      // parse the response
      const body = await response.json();
      if (!body || !Array.isArray(body) || body.length < 1) {
        return null;
      }

      // extract user(s) from the response
      const users: User[] = body;

      // return user(s)
      return { users };
    },
  });