import { UserIcon } from '@heroicons/react/outline';
import { useLayout } from 'store';

const UserSearchResultsEmptyState = ({
  searchFilter,
}: {
  searchFilter: string;
}) => {
  const { isDark } = useLayout();

  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <UserIcon
        className="h-10 w-10"
        color={`${isDark && 'lightGray'}`}
        strokeWidth={1.4}
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-300">
        No users with username {searchFilter}
      </h3>
    </div>
  );
};

export default UserSearchResultsEmptyState;
