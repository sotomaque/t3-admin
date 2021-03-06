import { useMemo } from 'react';
import { Transfer } from 'types';

const useUserTransferSelector = ({ transfer }: { transfer: Transfer }) => {
  const isAmountNegative = useMemo(() => {
    return transfer.amount.value.startsWith('-');
  }, [transfer.amount.value]);

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
      case 'OPENING_BONUS':
        return 'Opening Bonus';
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
      case 'TRANSFER_QUEUED':
        return 'Queued';
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

  const isTransferQueued = useMemo(() => {
    return transfer.state === 'TRANSFER_QUEUED';
  }, [transfer.state]);

  const transferStateColor = useMemo(() => {
    if (isTransferPending) {
      return 'text-orange-500 dark:text-orange-50';
    } else if (isTransferError) {
      return 'text-red-500 dark:text-red-100';
    } else if (isTransferCompleted) {
      return 'text-green-500 dark:text-green-100';
    } else if (isTransferQueued) {
      return 'text-gray-500 dark:text-slate-100';
    }
    return 'text-gray-500 dark:text-slate-100';
  }, [
    isTransferPending,
    isTransferError,
    isTransferCompleted,
    isTransferQueued,
  ]);

  const transferStateBackgroundColor = useMemo(() => {
    if (isTransferPending) {
      return 'bg-orange-100 dark:bg-orange-600';
    } else if (isTransferError) {
      return 'bg-red-100 dark:bg-red-600';
    } else if (isTransferCompleted) {
      return 'bg-green-100 dark:bg-green-600';
    } else if (isTransferQueued) {
      return 'bg-gray-100 dark:bg-slate-600';
    }
    return 'bg-gray-100 dark:bg-slate-600';
  }, [
    isTransferPending,
    isTransferError,
    isTransferCompleted,
    isTransferQueued,
  ]);

  return {
    formattedDestinationTransferFundsAccountID,
    formattedDestinationTransferFundsAccountName,
    formattedSourceTransferFundsAccountID,
    formattedSourceTransferFundsAccountName,
    formattedTransferAmount,
    formattedTransferCategory,
    formattedTransferState,
    isAmountNegative,
    isTransferCompleted,
    isTransferError,
    isTransferPending,
    isTransferQueued,
    transferStateBackgroundColor,
    transferStateColor,
  };
};

export default useUserTransferSelector;
