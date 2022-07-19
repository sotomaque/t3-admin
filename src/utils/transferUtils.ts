import axios from 'axios';
import { PrimeTrustTransfer, Transfer } from 'types';
import { APIResponse } from '@beamnetwork/eco-prime-trust-api/lib/APIResponse';
import { FundsTransfer } from '@beamnetwork/eco-prime-trust-api/lib/funds-transfers/FundsTransfer';
import { FundsTransferResponse } from '@beamnetwork/eco-prime-trust-api/lib/funds-transfers/responses/FundsTransferResponse';
import { PrimeTrustAPI } from '@beamnetwork/eco-prime-trust-api/lib/PrimeTrustAPI';

export const getTransferDetails = async (
  transferId: string
): Promise<Transfer | undefined> => {
  const baseURL = process.env.ECO_BASE_URL;
  const transfersURL = process.env.ECO_TRANSFERS;

  if (!baseURL || !transfersURL) {
    console.error('Missing BaseURL / TransfersURL in getTransferDetails');
    return undefined;
  }

  const startDateQueryParam = '?startDate=0';
  const transferIdQueryParam = `&transferID=${transferId}`;
  const fullURL = `${baseURL}${transfersURL}${startDateQueryParam}${transferIdQueryParam}`;

  try {
    const req = axios.get(`${fullURL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // send the request
    const { data } = await req;

    if (!data || !Array.isArray(data) || data.length !== 1) {
      console.error('Invalid Response for getTransferDetails');
      return undefined;
    }

    return data[0] as Transfer;
  } catch (error) {
    console.error('Unknown Error in getTransferDetails');
    return undefined;
  }
};

export const getPrimeTrustTransferIdForDeposit = (
  transfer: Transfer
): string | undefined => {
  let transferIds = transfer.transferData.transferLegs.transferIDs;
  if (!transferIds || !Array.isArray(transferIds) || transferIds.length <= 0) {
    console.error(
      `Transfer ID: ${transfer.transferID} is missing transfer legs`
    );
    return undefined;
  }

  let filteredIds = transferIds.filter((id) => id.startsWith('ptdeposit'));
  if (!filteredIds || !Array.isArray(filteredIds) || filteredIds.length <= 0) {
    console.error(
      `No Prime Trust TransferID associated with eco transfer: ${transfer.transferID}`
    );
    return undefined;
  }

  return filteredIds[0];
};

export const getProviderTransferData = async (
  primeTrustTransferId: string
): Promise<PrimeTrustTransfer | undefined> => {
  const baseURL = process.env.ECO_BASE_URL;
  const primeTrustURL = process.env.ECO_PRIME_TRUST_TRANSFERS;

  if (!baseURL || !primeTrustURL) {
    console.error(
      'Missing baseURL or primeTrustURL in getProviderTransferData'
    );
    return undefined;
  }

  const startDateQueryParam = '?startDate=0';
  const transferIdQueryParam = `&transferID=${primeTrustTransferId}`;
  const fullURL = `${baseURL}${primeTrustURL}${startDateQueryParam}${transferIdQueryParam}`;

  try {
    const req = axios.get(`${fullURL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // send the request
    const { data } = await req;

    if (!data || !Array.isArray(data) || data.length !== 1) {
      console.error(
        'Missing Provider Transfer Data in getProviderTransferData'
      );
      return undefined;
    }

    return data[0] as PrimeTrustTransfer;
  } catch (error) {
    console.error('Unknown Error in getProviderTransferData');
    return undefined;
  }
};

export const getProviderTransferId = (
  primeTrustTransfer: PrimeTrustTransfer
): string | undefined => {
  let transferId = primeTrustTransfer.transferData.providerTransferID;
  if (!transferId || typeof transferId !== 'string') {
    return undefined;
  }

  return transferId;
};

export const settleTransfer = async (
  api: PrimeTrustAPI,
  providerTransferId: string
) => {
  const fundsTransfer = await getPrimeTrustFundsTransferData(
    api,
    providerTransferId
  );

  if (!fundsTransfer || typeof fundsTransfer === 'undefined') {
    return false;
  }

  const response = await settleFundsTransfer(api, fundsTransfer);

  if (!response) {
    return false;
  }

  return true;
};

export async function setupAPI(): Promise<PrimeTrustAPI | undefined> {
  const baseUrl = process.env.PRIME_TRUST_SANDBOX_BASE_URL;
  const authorization = process.env.PRIME_TRUST_TOKEN;

  if (
    !baseUrl ||
    typeof baseUrl !== 'string' ||
    !authorization ||
    typeof authorization !== 'string'
  ) {
    console.error('Missing Prime Trust Base URL or Prime Trust API Key');
    return;
  }

  const api = new PrimeTrustAPI({
    baseUrl,
    authorization,
  });

  await api.initialize();
  return api;
}

export const getPrimeTrustFundsTransferData = async (
  api: PrimeTrustAPI,
  providerTransferId: string
): Promise<FundsTransfer | undefined> => {
  const { response, errors: getFundsTransferError } =
    await api.getFundsTransferByID({ id: providerTransferId });

  if (getFundsTransferError) {
    return;
  }

  if (!response || !response.data) {
    return;
  }
  const { data: fundsTransfer } = response;

  if (!fundsTransfer || typeof fundsTransfer === 'undefined') {
    return;
  }

  return fundsTransfer as FundsTransfer;
};

export async function settleFundsTransferByID(
  api: PrimeTrustAPI,
  fundsTransferID: string,
  fundsSourceName?: string
): Promise<APIResponse<FundsTransferResponse>> {
  const request = {
    fundsTransferID,
    data: {
      attributes: {
        'comments-1': 'settled via admin app', // <= 60 characters
        'settlement-details': 'settled via admin app',
      },
    },
  };

  if (fundsSourceName) {
    // @ts-ignore
    request.data.attributes['funds-source-name'] = fundsSourceName;
  }

  return await api.sandboxSettleFundsTransfer(request);
}

export async function settleFundsTransfer(
  api: PrimeTrustAPI,
  fundsTransfer: FundsTransfer
): Promise<any> {
  const {
    id: transferID,
    attributes: { status, 'funds-source-name': fundsSourceName },
  } = fundsTransfer;

  if (status === 'settled') {
    console.log('Funds transfer already settled');
    return;
  }

  let result = await settleFundsTransferByID(api, transferID, fundsSourceName);

  if (!result) {
    return;
  }

  return result;
}

export async function clearTransfer(
  api: PrimeTrustAPI,
  fundsTransferID: string
): Promise<any> {
  const request = {
    fundsTransferID,
  };

  const { response, errors } = await api.sandboxClearFundsTransfer(request);
  if (errors) {
    return { errors };
  }

  return { response };
}

export const getPrimeTrustTransferIdForWithdraw = (
  transfer: Transfer
): string | undefined => {
  let transferIds = transfer.transferData.transferLegs.transferIDs;
  if (!transferIds || !Array.isArray(transferIds) || transferIds.length <= 0) {
    return undefined;
  }

  let filteredIds = transferIds.filter((id) => id.startsWith('ptwithdrawal'));
  if (!filteredIds || !Array.isArray(filteredIds) || filteredIds.length <= 0) {
    return undefined;
  }

  return filteredIds[0];
};
