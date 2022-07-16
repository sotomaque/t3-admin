import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const featureFlagRouter = createRouter()
  .query('getAllFeatureFlags', {
    async resolve() {
      // any validation?

      // build url?

      // make api call

      // parse response

      // return feature falgs
      return {
        message: 'success',
      };
    },
  })
  .query('featureFlagById', {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      // any validation?
      const { id: featureFlagId } = input;
      if (!featureFlagId) {
        throw new TRPCError({
          message: 'Missing Feature Flag Id',
          code: 'BAD_REQUEST',
        });
      }

      // build url?

      // make api call

      // parse response

      // return feature falgs
      return {
        message: 'success',
      };
    },
  });
