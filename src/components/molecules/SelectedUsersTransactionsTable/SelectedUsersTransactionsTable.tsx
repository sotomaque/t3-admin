import { useUsers } from 'store';
import { Transaction } from 'types';
import SelectedUserTransactionRow from '../SelectedUserTransactionRow';
import TransactionsEmptyState from '../TransfersEmptyState';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface SelectedUsersTransactionsTableProps {
  transactions: [] | Transaction[];
}

const SelectedUsersTransactionsTable = ({
  transactions,
}: SelectedUsersTransactionsTableProps) => {
  const { selectedUser } = useUsers();
  const [listRef] = useAutoAnimate<HTMLTableRowElement>();

  if (transactions.length === 0) {
    return <TransactionsEmptyState userId={selectedUser?.userID} />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      {/* Head */}
      <thead className="bg-gray-50 dark:bg-slate-600">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 hidden xl:table-cell"
          >
            ID
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Category
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Amount
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            State
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Process
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-right pr-6 text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            <span className="sr-only">Select</span>
          </th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-200 dark:divide-slate-600 bg-white dark:bg-slate-800">
        {transactions.map((transaction) => (
          <tr
            key={transaction.transactionID}
            className="hover:bg-gray-50 dark:hover:bg-slate-700"
            ref={listRef}
          >
            <SelectedUserTransactionRow transaction={transaction} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelectedUsersTransactionsTable;
