import { useUserAccounts, useUserKYC } from 'hooks';
import { useUsers } from 'store';
import { User } from 'types';

interface RecentUsersRowProps {
  user: User;
}

const RecentUsersRow = ({ user }: RecentUsersRowProps) => {
  const { selectedUser, setSelectedUser, clearSelectedUser } = useUsers();

  const handleOnClick = (user: User) => {
    if (selectedUser === user) {
      clearSelectedUser();
    } else {
      setSelectedUser(user);
    }
  };

  const {
    balances: { ecoBalances, usdcBalances },
    apy,
  } = useUserAccounts({ user });
  const {
    cognito: {
      stateBackgroundColor: cognitoStateBackgroundColor,
      stateColor: cognitoStateColor,
      stateLabel: cognitoStateLabel,
    },
    primeTrust: {
      stateBackgroundColor: ptStateBackgroundColor,
      stateColor: ptStateColor,
      stateLabel: ptStateLabel,
    },
  } = useUserKYC({ user });

  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-slate-200 sm:pl-6 hidden md:table-cell">
        {user.givenName} {user.familyName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200">
        {user.username}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 hidden xl:table-cell">
        {user.email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200">
        ${usdcBalances.settled?.toFixed(2)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 hidden lg:table-cell">
        {ecoBalances.totalBalance === 0
          ? 0
          : ecoBalances.totalBalance.toFixed(3)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 hidden lg:table-cell">
        {apy}%
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 hidden md:table-cell ${cognitoStateColor}`}
      >
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${cognitoStateBackgroundColor}`}
        >
          {cognitoStateLabel}
        </span>
      </td>
      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-200 ${ptStateColor}`}
      >
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${ptStateBackgroundColor}`}
        >
          {ptStateLabel}
        </span>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button
          role="button"
          className="text-indigo-600 dark:text-purple-400 hover:text-indigo-900 dark:hover:text-purple-200"
          onClick={() => handleOnClick(user)}
        >
          {user === selectedUser ? 'Unselect' : 'Select'}
        </button>
      </td>
    </>
  );
};

export default RecentUsersRow;
