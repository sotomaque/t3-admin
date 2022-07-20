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

  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hidden lg:table-cell">
        {transfer.transactionID}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        ${`${parseFloat(transfer.amount).toFixed(2)}`}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {transfer.category}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {transfer.state}
      </td>

      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {canProcessTransfer ? (
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
        ) : (
          <div className="text-sm text-right">Unable To Process Transfer</div>
        )}
      </td>
    </>
  );
};

export default SelectedUserTransferRow;
