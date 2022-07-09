import { Transaction } from 'types';

interface SelectedUserTransferRowProps {
  transfer: Transaction;
}

const SelectedUserTransferRow = ({
  transfer,
}: SelectedUserTransferRowProps) => {
  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
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
        <button
          role="button"
          className="text-indigo-600 hover:text-indigo-900"
          // onClick={() => handleOnClick(transfer)}
        >
          Process Transaction
        </button>
      </td>
    </>
  );
};

export default SelectedUserTransferRow;
