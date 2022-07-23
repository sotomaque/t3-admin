import { Spinner } from 'components/atoms';
import { useUsers } from 'store';
import { User } from 'types';
import RecentUsersRow from '../RecentUsersRow';

interface RecentUsersTableProps {
  users: User[];
}

const RecentUsersTable = ({ users }: RecentUsersTableProps) => {
  const { selectedUser, loading } = useUsers();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-auto w-auto py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      {/* Head */}
      <thead className="bg-gray-50 dark:bg-slate-600">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 sm:pl-6 hidden md:table-cell"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Username
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 hidden xl:table-cell"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            USD Balance
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 hidden lg:table-cell"
          >
            ECO Balance
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 hidden lg:table-cell"
          >
            APY
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300 hidden md:table-cell"
          >
            Cognito
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-300"
          >
            Prime Trust
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Select</span>
          </th>
        </tr>
      </thead>
      {/* Body */}
      <tbody className="divide-y divide-gray-200 dark:divide-slate-600 bg-white dark:bg-slate-800">
        {users.map((user) => (
          <tr
            key={user.email}
            className={`${
              selectedUser &&
              selectedUser.userID === user.userID &&
              'bg-gray-100 dark:bg-slate-700'
            } hover:bg-gray-50 dark:hover:bg-slate-700`}
          >
            <RecentUsersRow user={user} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentUsersTable;
