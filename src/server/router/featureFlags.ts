import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { FeatureFlag } from 'types/featureFlags';

export const featureFlagRouter = createRouter()
  .query('getAllFeatureFlags', {
    async resolve() {
      // build url?
      const baseURL = process.env.LAUNCH_DARKLY_BASE_URL;
      const accessToken = process.env.LAUNCH_DARKLY_ACCESS_TOKEN;
      const allFeatureFlagsURL = process.env.LAUNCH_DARKLY_ALL_FEATURE_FLAGS;

      // validation
      if (
        !baseURL ||
        !accessToken ||
        !allFeatureFlagsURL ||
        typeof baseURL !== 'string' ||
        typeof accessToken !== 'string' ||
        typeof allFeatureFlagsURL !== 'string'
      ) {
        throw new TRPCError({
          message: 'Missing LaunchDarkly Environment Variables',
          code: 'BAD_REQUEST',
        });
      }
      const fullURL = `${baseURL}${allFeatureFlagsURL}`;

      // make api call
      try {
        const result = await fetch(fullURL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${accessToken}`,
          },
        });
        // parse response
        const json = await result.json();

        // validate response
        if (!json.items) {
          throw new TRPCError({
            message: 'No Flags Found',
            code: 'BAD_REQUEST',
          });
        }
        if (!Array.isArray(json.items) || json.items.length < 1) {
          throw new TRPCError({
            message: 'Invalid Flags',
            code: 'BAD_REQUEST',
          });
        }
        let flags: FeatureFlag[] = json.items;
        flags = flags
          .filter((flag) => !flag.archived)
          .sort((a, b) => {
            let dateA = new Date(a.creationDate).getTime();
            let dateB = new Date(b.creationDate).getTime();
            return dateB > dateA ? 1 : -1;
          });

        // filter & sort response
        return { flags };
      } catch (error) {
        console.error({ error });
        throw new TRPCError({
          message: 'Error Getting Feature Flags',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
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
      // try {

      // } catch(error) {
      //   console.error({ error })
      //   throw new TRPCError({
      //     message: 'Error fetching feature flag',
      //     code: 'INTERNAL_SERVER_ERROR',
      //   }
      // }

      // parse response

      // return feature falgs
      return {
        message: 'success',
      };
    },
  });
