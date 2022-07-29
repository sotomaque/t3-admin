import NextAuth, { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async signIn({ profile }) {
      // TODO: move all envs
      // add new callback urls to github app settings
      // deploy app on vercel and check if auth works
      // add sign out button to mobile menu
      // try to clean up flicker on route change / auth
      // merge!
      const baseURL = env.GITHUB_BASE_URL;
      const ecoOrgMembersURL = env.GITHUB_ECO_ORG_MEMBERS_URL;
      if (!baseURL || typeof baseURL !== 'string') {
        console.error('MISSING BASE URL');
        return false;
      }
      if (!ecoOrgMembersURL || typeof ecoOrgMembersURL !== 'string') {
        console.error('MISSING ECO ORG MEMBERS URL');
        return false;
      }
      const url = `${baseURL}${ecoOrgMembersURL}`;
      const githubToken = env.GITHUB_TOKEN;
      if (!githubToken || typeof githubToken !== 'string') {
        console.error('MISSING GITHUB TOKEN');
        return false;
      }

      // Make Request
      const request = await fetch(url, {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
      const response = await request.json();

      // Validate Response
      if (!response || !Array.isArray(response) || response.length < 1) {
        return false;
      }

      // Check if user is in the list of public members
      const isAllowedToSignIn = response.some(
        (member) => member.login === profile.login
      );

      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        // return false;
        // Or you can return a URL to redirect to:
        return '/unauthorized';
      }
    },
  },
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
