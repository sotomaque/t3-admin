import { Transaction } from './../../types/index';
import { createRouter } from './context';
import { z } from 'zod';

export const transferRouter = createRouter().query('transfersByUserId', {
  input: z.object({
    userId: z.string(),
  }),
  async resolve({ input }) {
    // get userId from input
    const { userId } = input;

    // validate userId
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
