import { Spinner } from 'components/atoms';
import { Transaction } from 'types';
import { trpc } from 'utils/trpc';
import { useRouter } from 'next/router';
import { useUserTransferSelector } from 'hooks';

interface SelectedUserTransferRowProps {
  transaction: Transaction;
}

const SelectedUserTransferRow = ({
  transaction,
}: SelectedUserTransferRowProps) => {
  // Effects
  const router = useRouter();
  const {
    canProcessTransaction,
    canSelectTransaction,
    formattedTransactionAmount,
    formattedTransactionCategory,
    formattedTransactionState,
    isAmountNegative,
    transactionStateBackgroundColor,
    transactionStateColor,
  } = useUserTransferSelector({
    transaction,
  });
  const { isLoading, mutateAsync, error } = trpc.useMutation([
    'transfer.processTransfer',
  ]);

  // Functions
  const handleOnProcess = async () => {
    if (!canProcessTransaction) return;
    // Make API Call to process transfer
    await mutateAsync(
      {
        transferId: transaction.transactionID,
      },
      {
        onSuccess: () => {},
      }
    );
  };
  const handleOnSelect = () => {
    router.push(`/transfers/${transaction.transactionID}`);
  };

  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hidden xl:table-cell">
        {transaction.transactionID}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formattedTransactionCategory}
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left pl-5 ${
          isAmountNegative && 'text-red-400'
        }`}
      >
        {formattedTransactionAmount}
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${transactionStateColor}`}
      >
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${transactionStateBackgroundColor}`}
        >
          {formattedTransactionState}
        </span>
      </td>

      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
        {canProcessTransaction && (
          <button
            role="button"
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => handleOnProcess()}
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
        {canSelectTransaction && (
          <button onClick={() => handleOnSelect()}>Select</button>
        )}
      </td>
    </>
  );
};

export default SelectedUserTransferRow;
