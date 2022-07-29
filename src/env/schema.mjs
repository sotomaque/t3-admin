// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_GRANT_TYPE: z.string(),
  AUTH0_URL: z.string(),
  AUTH0_OTP_URL: z.string(),
  ECO_BASE_URL: z.string(),
  ECO_REGISTER_URL: z.string(),
  ECO_IS_USERNAME_AVAILABLE: z.string(),
  ECO_USERS: z.string(),
  ECO_RECENT_USERS: z.string(),
  ECO_COMBINED_HISTORY: z.string(),
  ECO_REFERRALS: z.string(),
  ECO_ENCRYPTION_DATA_URL: z.string(),
  ECO_POST_KYC_DATA_URL: z.string(),
  ECO_POST_KYC_DOCUMENTS_URL: z.string(),
  ECO_TRANSFERS: z.string(),
  ECO_PRIME_TRUST_TRANSFERS: z.string(),
  ECO_PLAID_REQUIRE_RELINK: z.string(),
  ECO_PLAID_UNLINK: z.string(),
  ECO_PLAID_ACCOUNTS: z.string(),
  ECO_BANK_ACCOUNTS: z.string(),
  ECO_BANK_CONNECTIONS: z.string(),
  ECO_BANK_SUBACCOUNTS: z.string(),
  ECO_GIFTCARDS: z.string(),
  PRIME_TRUST_SANDBOX_BASE_URL: z.string(),
  PRIME_TRUST_TOKEN: z.string(),
  LAUNCH_DARKLY_ACCESS_TOKEN: z.string(),
  LAUNCH_DARKLY_BASE_URL: z.string(),
  LAUNCH_DARKLY_ALL_FEATURE_FLAGS: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_BAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_BAR: process.env.NEXT_PUBLIC_BAR,
};
