import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const registrationRouter = createRouter()
  .mutation('sendOTP', {
    input: z.object({ email: z.string().min(0).max(400) }),
    async resolve({ ctx, input }) {
      // Process Input
      const { email } = input;
      const client_id = process.env.AUTH0_CLIENT_ID;
      const url = process.env.AUTH0_OTP_URL;

      // Validate
      if (!email || typeof email !== 'string') {
        throw new TRPCError({
          message: 'Missing Email',
          code: 'BAD_REQUEST',
        });
      }
      if (!client_id || typeof client_id !== 'string') {
        throw new TRPCError({
          message: 'Missing Client ID',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!url || typeof url !== 'string') {
        throw new TRPCError({
          message: 'Missing URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // Build Request Object
      const data = {
        client_id,
        connection: 'email',
        email,
        send: 'link',
      };

      // Send Request
      try {
        await fetch(url, {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // Return Message
        return {
          message: `OTP sent to ${email}`,
        };
      } catch (err) {
        console.log({ err });

        // Thorw Error
        throw new TRPCError({
          message: 'Error Sending OTP',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  })
  .mutation('validateOTP', {
    input: z.object({
      otp: z.string().min(6).max(6),
      email: z.string().min(0).max(100),
    }),
    async resolve({ ctx, input }) {
      // Process Input
      const { otp, email } = input;

      const client_id = process.env.AUTH0_CLIENT_ID;
      const grant_type = process.env.AUTH0_GRANT_TYPE;
      const url = process.env.AUTH0_URL;

      // Validate
      if (!otp || typeof otp !== 'string') {
        throw new TRPCError({
          message: 'Missing Valid OTP',
          code: 'BAD_REQUEST',
        });
      }
      if (!email || typeof email !== 'string') {
        throw new TRPCError({
          message: 'Missing Valid Email',
          code: 'BAD_REQUEST',
        });
      }
      if (!client_id || typeof client_id !== 'string') {
        throw new TRPCError({
          message: 'Missing Client ID',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!url || typeof url !== 'string') {
        throw new TRPCError({
          message: 'Missing URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!grant_type || typeof grant_type !== 'string') {
        throw new TRPCError({
          message: 'Missing Grant Type',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // Build Request Object
      const data = {
        client_id,
        grant_type,
        username: email,
        otp,
        realm: 'email',
      };

      // Send Request
      try {
        const response = await fetch(url, {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const body = await response.json();

        // Process Response
        if (!response) {
          throw new TRPCError({
            message: 'No Response',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        if (response.status === 200) {
          const token: string = body['id_token'];
          if (!token) {
            throw new TRPCError({
              message: 'No Token',
              code: 'INTERNAL_SERVER_ERROR',
            });
          }
          return {
            token,
          };
        } else if (response.status === 403) {
          throw new TRPCError({
            message: 'Invalid OTP',
            code: 'UNAUTHORIZED',
          });
        } else if (response.status === 429) {
          throw new TRPCError({
            message: 'Locked Account',
            code: 'UNAUTHORIZED',
          });
        }
      } catch (err) {
        console.log({ err });

        // Thorw Error
        throw new TRPCError({
          message: 'Error Verifying OTP',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  })
  .mutation('register', {
    input: z.object({
      token: z.string(),
      registrationData: z.object({
        username: z.string(),
        password: z.string(),
        givenName: z.string(),
        familyName: z.string(),
        accountParams: z.object({
          provider: z.string(),
        }),
      }),
    }),
    async resolve({ ctx, input }) {
      // Process Input
      const { token, registrationData } = input;
      if (!token || !registrationData) {
        throw new TRPCError({
          message: 'Missing Token or Registration Data',
          code: 'BAD_REQUEST',
        });
      }

      // Get URL
      const baseURL = process.env.ECO_BASE_URL;
      const registerURL = process.env.ECO_REGISTER_URL;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!registerURL || typeof registerURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Register URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const fullURL = `${baseURL}${registerURL}`;

      // Make Request
      try {
        await fetch(fullURL, {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        return {
          message: 'Registration Successful',
        };
      } catch (error) {
        console.log({ error });
        throw new TRPCError({
          message: 'Error Registering',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  })
  .mutation('isUsernameAvailable', {
    input: z.object({ username: z.string().min(0).max(400) }),
    async resolve({ ctx, input }) {
      // Process Input
      const { username } = input;
      if (!username || typeof username !== 'string') {
        throw new TRPCError({
          message: 'Missing Username',
          code: 'BAD_REQUEST',
        });
      }

      // Get URL
      const baseURL = process.env.ECO_BASE_URL;
      const usernamePrefix = process.env.ECO_USERS;
      const isAvailableSuffix = process.env.ECO_IS_USERNAME_AVAILABLE;

      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!usernamePrefix || typeof usernamePrefix !== 'string') {
        throw new TRPCError({
          message: 'Missing Username Prefix',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!isAvailableSuffix || typeof isAvailableSuffix !== 'string') {
        throw new TRPCError({
          message: 'Missing Is Username Available Suffix',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const fullURL = `${baseURL}${usernamePrefix}${username}${isAvailableSuffix}`;

      // Make Request
      try {
        const response = await fetch(fullURL);

        if (response.status === 200) {
          return {
            username,
            isAvailable: true,
          };
        } else {
          return {
            username,
            isAvailable: false,
          };
        }
      } catch (error) {
        console.error({ error });

        throw new TRPCError({
          message: 'Error Checking Username',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  });
