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
import { Transaction, Transfer } from 'types/index';
import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { v4 as uuidv4 } from 'uuid';

export const transferRouter = createRouter()
  .mutation('recentTransfers', {
    input: z.object({
      pageNumber: z.string().default('0').nullable(),
      pageSize: z.string().default('10').nullable(),
      startDate: z.string().default('1').nullable(),
      sortOrder: z.string().default('desc').nullable(),
    }),
    async resolve({ input }) {
      // Get query params from input
      const { pageNumber, pageSize, startDate, sortOrder } = input;

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const recentTransfersURL = process.env.ECO_TRANSFERS;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!recentTransfersURL || typeof recentTransfersURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Recent Transfers URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (sortOrder !== 'desc' && sortOrder !== 'asc') {
        throw new TRPCError({
          message: 'Invalid Sort Order',
          code: 'BAD_REQUEST',
        });
      }
      const pageNumberQuery = `?pageNumber=${pageNumber}`;
      const pageSizeQuery = `&pageSize=${pageSize}`;
      const startDateQuery = `&startDate=${startDate}`;
      const sortOrderQuery = `&sortOrder=${sortOrder}`;
      const fullURL = `${baseURL}${recentTransfersURL}${pageNumberQuery}${pageSizeQuery}${startDateQuery}${sortOrderQuery}`;
      // make fetch request to the server for given userId
      const response = await fetch(fullURL);

      // // parse the response
      const body = await response.json();
      if (!body || !Array.isArray(body)) {
        throw new TRPCError({
          message:
            'Invalid Response (empty or not an array) in recentTransfers',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // extract transfers from the response
      const transfers: Transfer[] = body;

      // return transfers
      return { transfers };
    },
  })
  .query('transferDetailsByTransferId', {
    input: z.object({
      transferId: z.string(),
    }),
    async resolve({ input }) {
      const { transferId } = input;

      // Build URL
      const baseURL = process.env.ECO_BASE_URL;
      const transfersURL = process.env.ECO_TRANSFERS;

      if (!baseURL || !transfersURL) {
        throw new TRPCError({
          message:
            'Missing BaseURL / TransfersURL in transferDetailsByTransferId',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      const startDateQueryParam = '?startDate=0';
      const transferIdQueryParam = `&transferID=${transferId}`;
      const fullURL = `${baseURL}${transfersURL}${startDateQueryParam}${transferIdQueryParam}`;

      // Make Request
      const response = await fetch(fullURL);

      // parse the response
      const body = await response.json();

      if (!body || !Array.isArray(body)) {
        throw new TRPCError({
          message: 'Invalid Response in transferDetailsByTransferId',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // // extract transfer from the response
      const transfer: Transfer = body[0];

      // return transfer
      return { transfer };
    },
  })
  .query('transfersByUserId', {
    input: z.object({
      userId: z.string(),
      pageNumber: z.string().default('0').nullable(),
      pageSize: z.string().default('10').nullable(),
      startDate: z.string().default('1').nullable(),
      sortOrder: z.string().default('desc').nullable(),
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
    async resolve({ input }) {
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
  .mutation('createQuickTransfer', {
    input: z.object({
      ptPlaidAccountID: z.string(),
      userID: z.string(),
    }),
    async resolve({ input }) {
      // Process Input
      const { ptPlaidAccountID, userID } = input;

      // Validate Input
      if (
        !userID ||
        typeof userID !== 'string' ||
        !userID.startsWith('user:')
      ) {
        throw new TRPCError({
          message: 'Invalid userID Provided to createQuckTransfer',
          code: 'BAD_REQUEST',
        });
      }
      if (!ptPlaidAccountID || typeof ptPlaidAccountID !== 'string') {
        throw new TRPCError({
          message: 'Invalid ptPlaidAccountID Provided to createQuckTransfer',
          code: 'BAD_REQUEST',
        });
      }

      const baseURL = process.env.ECO_BASE_URL;
      const transfersEndpoint = process.env.ECO_TRANSFERS;
      if (!baseURL || typeof baseURL !== 'string') {
        throw new TRPCError({
          message: 'Missing Base URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      if (!transfersEndpoint || typeof transfersEndpoint !== 'string') {
        throw new TRPCError({
          message: 'Missing Transfers URL',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
      const fullURL = `${baseURL}${transfersEndpoint}`;

      // current dummy data TODO: let users customize this
      const destinationAccountID = `system:EARNINGS`;
      const amount = '25.00';
      const trackingData = {
        trackingID: `${uuidv4()}`,
        transferCategory: 'AD_HOC_DEPOSIT',
      };

      // make request
      const response = await fetch(fullURL, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originatingUserID: userID,
          recipientUserID: userID,
          source: {
            ptPlaidAccount: {
              accountID: ptPlaidAccountID,
            },
          },
          destination: {
            primeTrustAccount: {
              accountID: destinationAccountID,
            },
          },
          amount: {
            value: amount,
          },
          trackingData,
        }),
      });

      const body = await response.json();

      if (
        !body ||
        !body.transferID ||
        typeof body.transferID === 'undefined' ||
        !body.transferID.startsWith('ecoxfer:')
      ) {
        throw new TRPCError({
          message: 'Invalid Response when attempting to createQuickTransfer',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      return { success: true };
    },
  });
