import {
  getTransferDetails,
  getPrimeTrustTransferIdForDeposit,
  getProviderTransferData,
  getProviderTransferId,
  setupAPI,
  settleTransfer,
  clearTransfer,
  getPrimeTrustTransferIdForWithdraw,
} from 'utils/transferUtils';
import { Transaction } from 'types/index';
import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const transferRouter = createRouter()
  .query('transfersByUserId', {
    input: z.object({
      userId: z.string(),
      pageNumber: z.string().nullable().default('0'),
      pageSize: z.string().nullable().default('10'),
      startDate: z.string().nullable().default('1'),
      sortOrder: z.string().nullable().default('desc'),
    }),
    async resolve({ input }) {
      // get userId from input
      const { userId, pageNumber, pageSize, startDate, sortOrder } = input;

      // validate userId
      if (!userId.startsWith('user:')) {
        throw new TRPCError({
          message: 'Invalid UserID Provided to transfersByUserId',
          code: 'BAD_REQUEST',
        });
      }

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const combinedHistoryURL = process.env.ECO_COMBINED_HISTORY;
      const pageNumberQuery = `?pageNumber=${pageNumber}`;
      const pageSizeQuery = `&pageSize=${pageSize}`;
      const startDateQuery = `&startDate=${startDate}`;
      const userIdQuery = `&userID=${userId}`;
      const sortOrderQuery = `&sortOrder=${sortOrder}`;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!pageNumberQuery || typeof pageNumberQuery !== 'string') {
        throw new TRPCError({
          message: 'Missing pageNumberQuery',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!pageSizeQuery || typeof pageSizeQuery !== 'string') {
        throw new TRPCError({
          message: 'Missing pageSizeQuery',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!startDateQuery || typeof startDateQuery !== 'string') {
        throw new TRPCError({
          message: 'Missing startDateQuery',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!userIdQuery || typeof userIdQuery !== 'string') {
        throw new TRPCError({
          message: 'Missing userIdQuery',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!sortOrderQuery || typeof sortOrderQuery !== 'string') {
        throw new TRPCError({
          message: 'Missing sortOrderQuery',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const fullURL = `${baseURL}${combinedHistoryURL}${pageNumberQuery}${pageSizeQuery}${startDateQuery}${userIdQuery}${sortOrderQuery}`;

      // make fetch request to the server for given userId
      const response = await fetch(fullURL);

      // parse the response
      const body = await response.json();
      if (!body || !body.data || !Array.isArray(body.data)) {
        throw new TRPCError({
          message: 'Invalid Response in transfersByUserId',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // extract transfers from the response
      const transfers: Transaction[] = body.data;

      // return transfers
      return { transfers };
    },
  })
  .mutation('processTransfer', {
    input: z.object({ transferId: z.string() }),
    async resolve({ ctx, input }) {
      // Process Input
      const { transferId } = input;

      if (!transferId || typeof transferId !== 'string') {
        throw new TRPCError({
          message: 'Invalid TransferId Provided to processTransfer',
          code: 'BAD_REQUEST',
        });
      }

      // Get TransferDetails
      const transferDetails = await getTransferDetails(transferId);

      // Validate TransferDetails
      if (!transferDetails || typeof transferDetails === 'undefined') {
        throw new TRPCError({
          message: `No Transfer Details Found for transferId: ${transferId}`,
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // Handle Deposit
      if (transferDetails.trackingData.transferCategory === 'AD_HOC_DEPOSIT') {
        // Get Prime Trust Transfer ID
        const primeTrustTransferId =
          getPrimeTrustTransferIdForDeposit(transferDetails);
        if (
          !primeTrustTransferId ||
          typeof primeTrustTransferId === 'undefined'
        ) {
          throw new TRPCError({
            message: `No Prime Trust Transfer ID Found for Eco Transfer: ${transferId}`,
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Get Prime Trust Data
        const primeTrustData = await getProviderTransferData(
          primeTrustTransferId
        );
        if (!primeTrustData || typeof primeTrustData === 'undefined') {
          throw new TRPCError({
            message: `No Prime Trust Transfer Data Found for Eco Transfer: ${transferId}`,
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Get Provider Transfer ID
        const providerTransferId = getProviderTransferId(primeTrustData);
        if (!providerTransferId || typeof providerTransferId === 'undefined') {
          throw new TRPCError({
            message: `No Provider Transfer ID found for Eco Transfer: ${transferId}`,
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Setup API
        let api = await setupAPI();
        if (!api || typeof api === 'undefined') {
          throw new TRPCError({
            message:
              'Failed to instanciate Prime Trust API Instance in settleTransfer mutation',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Settle
        let settleTransfersRootResponse = await settleTransfer(
          api,
          providerTransferId
        );

        if (
          !settleTransfersRootResponse ||
          typeof settleTransfersRootResponse === 'undefined'
        ) {
          throw new TRPCError({
            message: 'Invalid Response when attempting to settleTransfer',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Clear
        const { errors: clearTransferErrors } = await clearTransfer(
          api,
          providerTransferId
        );
        if (clearTransferErrors) {
          throw new TRPCError({
            message: 'Invalid Response when attempting to clearTransfer',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        return {
          success: true,
        };
      }
      // Handle Withdrawal
      else if (
        transferDetails.trackingData.transferCategory === 'AD_HOC_WITHDRAWAL'
      ) {
        // Get Prime Trust Transfer ID
        const primeTrustTransferId =
          getPrimeTrustTransferIdForWithdraw(transferDetails);
        if (
          !primeTrustTransferId ||
          typeof primeTrustTransferId === 'undefined'
        ) {
          throw new TRPCError({
            message: `No Prime Trust Transfer ID Found for Eco Transfer: ${transferId}`,
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Get Prime Trust Data
        const primeTrustData = await getProviderTransferData(
          primeTrustTransferId
        );
        if (!primeTrustData || typeof primeTrustData === 'undefined') {
          throw new TRPCError({
            message: `No Prime Trust Transfer Data Found for Eco Transfer: ${transferId}`,
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Get Provider Transfer ID
        const providerTransferId = getProviderTransferId(primeTrustData);
        if (!providerTransferId || typeof providerTransferId === 'undefined') {
          throw new TRPCError({
            message: `No Provider Transfer ID found for Eco Transfer: ${transferId}`,
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Setup API
        let api = await setupAPI();
        if (!api || typeof api === 'undefined') {
          throw new TRPCError({
            message:
              'Failed to instanciate Prime Trust API Instance in settleTransfer mutation',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Clear
        const { errors: clearTransferErrors } = await clearTransfer(
          api,
          providerTransferId
        );
        if (clearTransferErrors) {
          throw new TRPCError({
            message: 'Invalid Response when attempting to clearTransfer',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Settle
        let settleTransfersRootResponse = await settleTransfer(
          api,
          providerTransferId
        );

        if (
          !settleTransfersRootResponse ||
          typeof settleTransfersRootResponse === 'undefined'
        ) {
          throw new TRPCError({
            message: 'Invalid Response when attempting to settleTransfer',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        // Return
        return {
          success: true,
        };
      } else {
        throw new TRPCError({
          message: `Transfer ${transferId} is neither a deposit nor a withdrawl`,
          code: 'BAD_REQUEST',
        });
      }
    },
  })
  .mutation('clearTransfer', {
    input: z.object({ providerTransferId: z.string() }),
    async resolve({ ctx, input }) {
      // Process Input
      const { providerTransferId } = input;

      // Validate Input
      if (!providerTransferId || typeof providerTransferId !== 'string') {
        throw new TRPCError({
          message:
            'Invalid ProviderTransferID provided to clearTransfer mutation',
          code: 'BAD_REQUEST',
        });
      }

      // Setup API
      let api = await setupAPI();
      if (!api || typeof api === 'undefined') {
        throw new TRPCError({
          message:
            'Failed to instanciate Prime Trust API Instance in clearTransfer mutation',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      const { errors: clearTransferErrors } = await clearTransfer(
        api,
        providerTransferId
      );
      if (clearTransferErrors) {
        throw new TRPCError({
          message: 'Failed to clear transfer in clearTransfer mutation',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      return {
        clearedTransfer: true,
      };
    },
  });
