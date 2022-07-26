import { useUserTransferSelector } from 'hooks';
import { Transfer } from 'types';

interface RecentTransfersRowProps {
  transfer: Transfer;
}

const RecentTransfersRow = ({ transfer }: RecentTransfersRowProps) => {
  const {
    formattedTransferAmount,
    formattedTransferCategory,
    isAmountNegative,
    formattedTransferState,
    transferStateBackgroundColor,
    transferStateColor,
  } = useUserTransferSelector({ transfer });

  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-slate-200  hidden xl:table-cell">
        {transfer.transferID}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 ">
        {formattedTransferCategory}
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 text-left pl-5 ${
          isAmountNegative && 'text-red-400 dark:text-red-500'
        }`}
      >
        {formattedTransferAmount}
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${transferStateColor}`}
      >
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${transferStateBackgroundColor}`}
        >
          {formattedTransferState}
        </span>
      </td>

      {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-indigo-600 hover:text-indigo-900 cursor-pointer">
      {canSelectTransaction && (
        <button
          className="text-indigo-600 dark:text-purple-400 hover:text-indigo-900 dark:hover:text-purple-200"
          onClick={() => handleOnSelect()}
        >
          Select
        </button>
      )}
    </td> */}
    </>
  );
};

export default RecentTransfersRow;
