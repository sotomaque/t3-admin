import { useUsers } from 'store';
import { Transaction } from 'types';
import SelectedUserTransactionRow from '../SelectedUserTransactionRow';
import TransactionsEmptyState from '../TransfersEmptyState';

interface SelectedUsersTransactionsTableProps {
  transaction: [] | Transaction[];
}

const SelectedUsersTransactionsTable = ({
  transaction,
}: SelectedUsersTransactionsTableProps) => {
  const { selectedUser } = useUsers();

  if (transaction.length === 0) {
    return <TransactionsEmptyState userId={selectedUser?.userID} />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      {/* Head */}
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell"
          >
            ID
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Category
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Amount
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            State
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Process
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-right pr-6 text-sm font-semibold text-gray-900"
          >
            Select
          </th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-200 bg-white">
        {transaction.map((transaction) => (
          <tr key={transaction.transactionID} className="hover:bg-gray-50">
            <SelectedUserTransactionRow transaction={transaction} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelectedUsersTransactionsTable;
