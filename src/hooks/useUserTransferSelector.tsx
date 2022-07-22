import { useMemo } from 'react';
import { Transfer } from 'types';

const useUserTransferSelector = ({ transfer }: { transfer: Transfer }) => {
  const formattedTransferAmount = useMemo(() => {
    let originalAmount = `${parseFloat(transfer.amount.value).toFixed(2)}`;
    if (originalAmount.startsWith('-')) {
      originalAmount = originalAmount.substring(1);
    }
    let originalAmountAsNumber = parseFloat(originalAmount).toLocaleString(
      'en-US',
      { minimumFractionDigits: 2 }
    );
    return `$${originalAmountAsNumber}`;
  }, [transfer.amount]);

  const formattedSourceTransferFundsAccountID = useMemo(() => {
    if (transfer.source.ptPlaidAccount) {
      return transfer.source.ptPlaidAccount.accountID;
    } else if (transfer.source.primeTrustAccount) {
      return transfer.source.primeTrustAccount.accountID;
    }
    return '';
  }, [transfer]);

  const formattedDestinationTransferFundsAccountName = useMemo(() => {
    if (transfer.destination.wyreAccount) {
      return `${transfer.destination.wyreAccount.label}`;
    } else if (transfer.destination.primeTrustAccount) {
      return `${transfer.destination.primeTrustAccount.label} ${transfer.destination.primeTrustAccount.mask}`;
    } else if (transfer.destination.ptPlaidAccount) {
      return `${transfer.destination.ptPlaidAccount.label} ${transfer.destination.ptPlaidAccount.mask}`;
    }
    return '';
  }, [transfer]);

  const formattedDestinationTransferFundsAccountID = useMemo(() => {
    if (transfer.source.ptPlaidAccount) {
      return transfer.source.ptPlaidAccount.accountID;
    } else if (transfer.source.primeTrustAccount) {
      return transfer.source.primeTrustAccount.accountID;
    }
    return '';
  }, [transfer]);

  const formattedSourceTransferFundsAccountName = useMemo(() => {
    if (transfer.source.ptPlaidAccount) {
      return `${transfer.source.ptPlaidAccount.label} ${transfer.source.ptPlaidAccount.mask}`;
    } else if (transfer.source.primeTrustAccount) {
      return `${transfer.source.primeTrustAccount.label} ${transfer.source.primeTrustAccount.mask}`;
    }
    return '';
  }, [transfer]);

  const formattedTransferCategory = useMemo(() => {
    switch (transfer.trackingData.transferCategory) {
      case 'AD_HOC_DEPOSIT':
        return 'Deposit';
      case 'AD_HOC_WITHDRAWAL':
        return 'Withdrawal';
      case 'GIFTCARD_PURCHASE':
        return 'Giftcard Purchase';
      case 'ECO_POINT_SAVINGS_REWARD':
        return 'Eco Points Savings Reward';
      case 'ECO_POINTS_REWARDS':
        return 'Eco Points Rewards';
      case 'EXTERNAL_TRANSFER':
        return 'External Transfer';
      default:
        return transfer.trackingData.transferCategory;
    }
  }, [transfer.trackingData.transferCategory]);

  const formattedTransferState = useMemo(() => {
    switch (transfer.state) {
      case 'TRANSFER_PENDING':
        return 'Pending';
      case 'TRANSFER_COMPLETED':
        return 'Completed';
      case 'TRANSFER_INITIATION_FAILED':
        return 'Initiation Failed';
      default:
        return transfer.state;
    }
  }, [transfer.state]);

  const isTransferPending = useMemo(() => {
    return transfer.state === 'TRANSFER_PENDING';
  }, [transfer.state]);

  const isTransferError = useMemo(() => {
    return transfer.state === 'TRANSFER_INITIATION_FAILED';
  }, [transfer.state]);

  const isTransferCompleted = useMemo(() => {
    return transfer.state === 'TRANSFER_COMPLETED';
  }, [transfer.state]);

  const transferStateColor = useMemo(() => {
    if (isTransferPending) {
      return 'text-gray-500';
    } else if (isTransferError) {
      return 'text-red-500';
    } else if (isTransferCompleted) {
      return 'text-green-500';
    }
    return 'text-gray-500';
  }, [isTransferPending, isTransferError, isTransferCompleted]);

  const transferStateBackgroundColor = useMemo(() => {
    if (isTransferPending) {
      return 'bg-gray-100';
    } else if (isTransferError) {
      return 'bg-red-100';
    } else if (isTransferCompleted) {
      return 'bg-green-100';
    }
    return 'bg-gray-100';
  }, [isTransferPending, isTransferError, isTransferCompleted]);

  return {
    formattedDestinationTransferFundsAccountID,
    formattedDestinationTransferFundsAccountName,
    formattedSourceTransferFundsAccountID,
    formattedSourceTransferFundsAccountName,
    formattedTransferAmount,
    formattedTransferCategory,
    formattedTransferState,
    isTransferCompleted,
    isTransferError,
    isTransferPending,
    transferStateBackgroundColor,
    transferStateColor,
  };
};

export default useUserTransferSelector;
