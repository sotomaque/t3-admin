import NextAuth, { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const baseURL = 'https://api.github.com';
      const ecoOrgMembersURL = `/orgs/eco/public_members`;
      const url = `${baseURL}${ecoOrgMembersURL}`;
      const githubToken = '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';

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
