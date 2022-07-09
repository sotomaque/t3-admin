import { useUserAccounts, useUserKYC } from 'hooks';
import { Dispatch, SetStateAction } from 'react';
import { User } from 'types';

interface RecentUsersRowProps {
  user: User;
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
}

const RecentUsersRow = ({
  user,
  selectedUser,
  setSelectedUser,
}: RecentUsersRowProps) => {
  const handleOnClick = (user: User) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const {
    balances: { ecoBalances, usdcBalances },
    apy,
  } = useUserAccounts({ user });
  const { cognito, primeTrust } = useUserKYC({ user });

  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {user.givenName} {user.familyName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {user.username}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {user.email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        ${usdcBalances.settled?.toFixed(2)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {ecoBalances.totalBalance.toFixed(3)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {apy}%
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {`${new Date(user.created).toDateString()}`}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {cognito}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {primeTrust}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button
          role="button"
          className="text-indigo-600 hover:text-indigo-900"
          onClick={() => handleOnClick(user)}
        >
          {user === selectedUser ? 'Unselect' : 'Select'}
        </button>
      </td>
    </>
  );
};

export default RecentUsersRow;
