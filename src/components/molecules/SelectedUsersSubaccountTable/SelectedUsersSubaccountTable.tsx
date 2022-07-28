import { BankSubaccount } from 'types/bankConnections';

interface SelectedUsersSubaccountTableProps {
  subaccount: BankSubaccount;
}

const SelectedUsersSubaccountTable = ({
  subaccount,
}: SelectedUsersSubaccountTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      {/* Head */}
      <thead className="bg-gray-50 dark:bg-slate-600">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 sm:pl-6 hidden xl:table-cell"
          >
            Account ID
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Available Balance
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Account Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 hidden xl:table-cell"
          >
            Official Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Subtype
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Mask
          </th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-200 bg-white dark:bg-slate-800">
        <tr>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 0 dark:text-slate-200 hidden xl:table-cell">
            {subaccount.account_id}
          </td>

          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200">
            {subaccount.balances.available}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200">
            {subaccount.name}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 hidden xl:table-cell">
            {subaccount.official_name}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200">
            {subaccount.subtype}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200">
            {subaccount.mask}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SelectedUsersSubaccountTable;
