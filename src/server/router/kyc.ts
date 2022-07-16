import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { getUploadData, uploadData } from 'utils/kycUtils';

export const kycRouter = createRouter().mutation('submitKycDocuments', {
  input: z.object({ token: z.string() }),
  async resolve({ input }) {
    // Process Input
    const { token } = input;

    // Validate
    if (!token || typeof token !== 'string') {
      throw new TRPCError({
        message: 'Missing Token',
        code: 'BAD_REQUEST',
      });
    }

    try {
      // Get Upload Data (what we will send to PT)
      const { rsaPublicKey, front, back } = await getUploadData({ token });

      // Validate Upload Data
      if (!rsaPublicKey) {
        throw new TRPCError({
          message: 'Missing RSA Public Key',
          code: 'INTERNAL_SERVER_ERROR',
        });
      } else if (!front) {
        throw new TRPCError({
          message: 'Missing Front Image Data',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const { uploadUrl, postDataFields } = front;
      console.log('UPLOADING DATA');

      // Upload Data
      const { data, error } = await uploadData({
        file: 'public/front.png',
        rsaPublicKey,
        postDataFields,
        uploadUrl,
      });

      console.log('UPLOADED DATA');

      // Validate Uploaded Data
      if (error) {
        console.error({ error });
        throw new TRPCError({
          message: 'Error Uploading Data (front)',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      console.log('UPLOADED DATA');
      console.log('FRONT DATA', { data });

      if (back) {
        const { uploadUrl, postDataFields } = back;
        const { data, error } = await uploadData({
          file: 'public/back.png',
          rsaPublicKey,
          postDataFields,
          uploadUrl,
        });
        if (error) {
          console.error({ error });
          throw new TRPCError({
            message: 'Error Uploading Data (Back)',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }
        console.log('BACK DATA', { data });
      }

      // Return Success
      return {
        message: 'Successfully Uploaded KYC Data',
      };
    } catch (error) {
      console.error({ error });
      // Throw Error
      throw new TRPCError({
        message: 'Error Uploading KYC Documents',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  },
});
