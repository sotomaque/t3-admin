import { Spinner } from 'components/atoms';
import { useMemo } from 'react';
import { Transaction } from 'types';
import { trpc } from 'utils/trpc';

interface SelectedUserTransferRowProps {
  transfer: Transaction;
}

const SelectedUserTransferRow = ({
  transfer,
}: SelectedUserTransferRowProps) => {
  const { isLoading, mutateAsync, error } = trpc.useMutation([
    'transfer.processTransfer',
  ]);

  const canProcessTransfer = useMemo(() => {
    const isInValidState = transfer.state === 'TRANSFER_PENDING';

    const isValidTransferCategory =
      transfer.category === 'AD_HOC_DEPOSIT' || 'AD_HOC_WITHDRAWAL';

    return isInValidState && isValidTransferCategory;
  }, [transfer.state, transfer.category]);

  const handleOnClick = async () => {
    if (!canProcessTransfer) return;
    // Make API Call to process transfer
    await mutateAsync({
      transferId: transfer.transactionID,
    });
  };

  const formattedTransferAmount = useMemo(() => {
    let originalAmount = `${parseFloat(transfer.amount).toFixed(2)}`;
    if (originalAmount.startsWith('-')) {
      originalAmount = originalAmount.substring(1);
      return `- $${originalAmount}`;
    }
    return `$${originalAmount}`;
  }, [transfer.amount]);

  const isAmountNegative = useMemo(() => {
    return transfer.amount.startsWith('-');
  }, [transfer.amount]);

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

  const formattedTransferCategory = useMemo(() => {
    switch (transfer.category) {
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
        return transfer.category;
    }
  }, [transfer.category]);

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

  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hidden xl:table-cell">
        {transfer.transactionID}
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left pl-5 ${
          isAmountNegative && 'text-red-400'
        }`}
      >
        {formattedTransferAmount}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formattedTransferCategory}
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${transferStateColor}`}
      >
        <span
          className={`text-center px-2.5 py-1 rounded-full text-xs font-medium ${transferStateBackgroundColor}`}
        >
          {formattedTransferState}
        </span>
      </td>

      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
        {canProcessTransfer && (
          <button
            role="button"
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => handleOnClick()}
            disabled={isLoading || Boolean(error)}
          >
            {isLoading ? (
              <Spinner styles={'h-4 w-4 flex justify-center items-center'} />
            ) : (
              'Process Transfer'
            )}
          </button>
        )}
      </td>

      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-indigo-600 hover:text-indigo-900 cursor-pointer">
        Select
      </td>
    </>
  );
};

export default SelectedUserTransferRow;
