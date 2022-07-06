import { createRouter } from './context';
import { z } from 'zod';

export const exampleRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('world', {
    input: z.object({
      text: z.string(),
    }),
    resolve({ input }) {
      return {
        greeting: `hmmm ${input.text ?? 'does this work'}`,
      };
    },
  });
