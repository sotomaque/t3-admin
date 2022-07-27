import { useUsers } from 'store';
import { BankConnection } from 'types';
import BankConnectionEmptyState from '../BankConnectionEmptyState';
import SelectedUsersBankConnectionRow from '../SelectedUsersBankConnectionRow';

interface SelectedUsersBankConnectionsTableProps {
  connections: [] | BankConnection[];
}

const SelectedUsersBankConnectionsTable = ({
  connections,
}: SelectedUsersBankConnectionsTableProps) => {
  const { selectedUser } = useUsers();

  if (connections.length === 0) {
    return <BankConnectionEmptyState userId={selectedUser?.userID} />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      {/* Head */}
      <thead className="bg-gray-50 dark:bg-slate-600">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 sm:pl-6 hidden xl:table-cell"
          >
            Item ID
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Institution Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 hidden xl:table-cell"
          >
            Institution ID
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 hidden xl:table-cell"
          >
            Provider Item ID
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Link Status
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Created At
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
      <tbody className="divide-y divide-gray-200 bg-white dark:bg-slate-800">
        {connections.map((connection, idx) => (
          <tr
            key={`${connection.providerItemID}-${idx}`}
            className="hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <SelectedUsersBankConnectionRow connection={connection} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelectedUsersBankConnectionsTable;
