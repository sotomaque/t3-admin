// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  GITHUB_BASE_URL: z.string().url(),
  GITHUB_ECO_ORG_MEMBERS_URL: z.string().url(),
  GITHUB_TOKEN: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_GRANT_TYPE: z.string(),
  AUTH0_URL: z.string().url(),
  AUTH0_OTP_URL: z.string().url(),
  ECO_BASE_URL: z.string().url(),
  ECO_REGISTER_URL: z.string().url(),
  ECO_IS_USERNAME_AVAILABLE: z.string().url(),
  ECO_USERS: z.string().url(),
  ECO_RECENT_USERS: z.string().url(),
  ECO_COMBINED_HISTORY: z.string().url(),
  ECO_REFERRALS: z.string().url(),
  ECO_ENCRYPTION_DATA_URL: z.string().url(),
  ECO_POST_KYC_DATA_URL: z.string().url(),
  ECO_POST_KYC_DOCUMENTS_URL: z.string().url(),
  ECO_TRANSFERS: z.string().url(),
  ECO_PRIME_TRUST_TRANSFERS: z.string().url(),
  ECO_PLAID_REQUIRE_RELINK: z.string().url(),
  ECO_PLAID_UNLINK: z.string().url(),
  ECO_PLAID_ACCOUNTS: z.string().url(),
  ECO_BANK_ACCOUNTS: z.string().url(),
  ECO_BANK_CONNECTIONS: z.string().url(),
  ECO_BANK_SUBACCOUNTS: z.string().url(),
  ECO_GIFTCARDS: z.string().url(),
  PRIME_TRUST_SANDBOX_BASE_URL: z.string().url(),
  PRIME_TRUST_TOKEN: z.string(),
  LAUNCH_DARKLY_ACCESS_TOKEN: z.string(),
  LAUNCH_DARKLY_BASE_URL: z.string().url(),
  LAUNCH_DARKLY_ALL_FEATURE_FLAGS: z.string().url(),
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
