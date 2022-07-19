import { UserIcon } from '@heroicons/react/outline';

const UserSearchResultsEmptyState = ({
  searchFilter,
}: {
  searchFilter: string;
}) => {
  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <UserIcon className="h-10 w-10" strokeWidth={1.4} />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No users with username {searchFilter}
      </h3>
    </div>
  );
};

export default UserSearchResultsEmptyState;
