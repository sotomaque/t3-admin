import { useMemo } from 'react';
import { Transaction } from 'types';

const useUserTransactionSelector = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const formattedTransactionAmount = useMemo(() => {
    let originalAmount = `${parseFloat(transaction.amount).toFixed(2)}`;
    if (originalAmount.startsWith('-')) {
      originalAmount = originalAmount.substring(1);
    }
    let originalAmountAsNumber = parseFloat(originalAmount).toLocaleString(
      'en-US',
      { minimumFractionDigits: 2 }
    );
    return `$${originalAmountAsNumber}`;
  }, [transaction.amount]);

  const isAmountNegative = useMemo(() => {
    return transaction.amount.startsWith('-');
  }, [transaction.amount]);

  const formattedTransactionState = useMemo(() => {
    switch (transaction.state) {
      case 'TRANSFER_PENDING':
        return 'Pending';
      case 'TRANSFER_COMPLETED':
        return 'Completed';
      case 'TRANSFER_INITIATION_FAILED':
        return 'Initiation Failed';
      case 'TRANSFER_QUEUED':
        return 'Queued';
      case 'OPENING_BONUS':
        return 'Opening Bonus';
      default:
        return transaction.state;
    }
  }, [transaction.state]);

  const formattedTransactionCategory = useMemo(() => {
    switch (transaction.category) {
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
        return transaction.category;
    }
  }, [transaction.category]);

  const isTransactionPending = useMemo(() => {
    return transaction.state === 'TRANSFER_PENDING';
  }, [transaction.state]);

  const isTransactionError = useMemo(() => {
    return transaction.state === 'TRANSFER_INITIATION_FAILED';
  }, [transaction.state]);

  const isTransactionCompleted = useMemo(() => {
    return transaction.state === 'TRANSFER_COMPLETED';
  }, [transaction.state]);

  const transactionStateColor = useMemo(() => {
    if (isTransactionPending) {
      return 'text-gray-500 dark:text-slate-100';
    } else if (isTransactionError) {
      return 'text-red-500 dark:text-red-100';
    } else if (isTransactionCompleted) {
      return 'text-green-500 dark:text-green-100';
    }
    return 'text-gray-500 dark:text-slate-100';
  }, [isTransactionPending, isTransactionError, isTransactionCompleted]);

  const transactionStateBackgroundColor = useMemo(() => {
    if (isTransactionPending) {
      return 'bg-gray-100 dark:bg-slate-600';
    } else if (isTransactionError) {
      return 'bg-red-100 dark:bg-red-600';
    } else if (isTransactionCompleted) {
      return 'bg-green-100 dark:bg-green-600';
    }
    return 'bg-gray-100 dark:bg-slate-600';
  }, [isTransactionPending, isTransactionError, isTransactionCompleted]);

  const canSelectTransaction = useMemo(() => {
    return transaction.category != 'EXTERNAL_TRANSFER';
  }, [transaction.category]);

  const canProcessTransaction = useMemo(() => {
    const isInValidState = transaction.state === 'TRANSFER_PENDING';

    const isValidTransferCategory =
      transaction.category === 'AD_HOC_DEPOSIT' || 'AD_HOC_WITHDRAWAL';

    return isInValidState && isValidTransferCategory;
  }, [transaction.state, transaction.category]);

  return {
    canProcessTransaction,
    canSelectTransaction,
    formattedTransactionAmount,
    formattedTransactionCategory,
    formattedTransactionState,
    isAmountNegative,
    transactionStateBackgroundColor,
    transactionStateColor,
  };
};

export default useUserTransactionSelector;
