import { useBankConnectionsSelector } from 'hooks';
import { BankConnection } from 'types/bankConnections';

interface SelectedUsersBankConnectionRowProps {
  connection: BankConnection;
}

const SelectedUsersBankConnectionRow = ({
  connection,
}: SelectedUsersBankConnectionRowProps) => {
  const {
    formattedInstitutionName,
    formattedInstitutionID,
    formattedItemID,
    formattedLinkStatus,
    formattedProviderItemID,
    formattedCreatedAt,
    linkStatusForegroundColor,
    linkStatusBackgroundColor,
  } = useBankConnectionsSelector({
    connection: connection,
  });
  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 0 dark:text-slate-200 hidden xl:table-cell">
        {formattedItemID}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200">
        {formattedInstitutionName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 hidden xl:table-cell">
        {formattedInstitutionID}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 hidden xl:table-cell">
        {formattedProviderItemID}
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm ${linkStatusForegroundColor}`}
      >
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${linkStatusBackgroundColor}`}
        >
          {formattedLinkStatus}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200">
        {formattedCreatedAt}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-indigo-600 hover:text-indigo-900 cursor-pointer">
        <button
          className="text-indigo-600 dark:text-purple-400 hover:text-indigo-900 dark:hover:text-purple-200"
          // onClick={() => handleOnSelect()}
        >
          Select
        </button>
      </td>
    </>
  );
};

export default SelectedUsersBankConnectionRow;
