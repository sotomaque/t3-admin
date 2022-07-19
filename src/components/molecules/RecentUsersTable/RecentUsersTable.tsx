import { Spinner } from 'components/atoms';
import { useUsers } from 'store';
import { User } from 'types';
import RecentUsersRow from '../RecentUsersRow';

interface RecentUsersTableProps {
  users: User[];
}

const RecentUsersTable = ({ users }: RecentUsersTableProps) => {
  const { selectedUser, loading } = useUsers();

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-300">
          {/* Head */}
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                USD Balance
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell"
              >
                ECO Balance
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell"
              >
                APY
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Cognito
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Prime Trust
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr
                key={user.email}
                className={`${
                  selectedUser &&
                  selectedUser.userID === user.userID &&
                  'bg-gray-100'
                } hover:bg-gray-50`}
              >
                <RecentUsersRow user={user} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RecentUsersTable;
