import { useUsers } from 'store';
import { Transaction } from 'types';
import SelectedUserTransferRow from '../SelectedUserTransferRow';
import TransfersEmptyState from '../TransfersEmptyState';

interface SelectedUsersTransfersTableProps {
  transfers: [] | Transaction[];
}

const SelectedUsersTransfersTable = ({
  transfers,
}: SelectedUsersTransfersTableProps) => {
  const { selectedUser } = useUsers();

  if (transfers.length === 0) {
    return <TransfersEmptyState userId={selectedUser?.userID} />;
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
            Amount
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
            State
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Select</span>
          </th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-200 bg-white">
        {transfers.map((transfer) => (
          <tr key={transfer.transactionID} className="hover:bg-gray-50">
            <SelectedUserTransferRow transfer={transfer} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelectedUsersTransfersTable;
