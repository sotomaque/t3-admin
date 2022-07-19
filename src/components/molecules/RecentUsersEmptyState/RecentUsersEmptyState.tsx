import { WifiIcon } from '@heroicons/react/outline';

const RecentUsersEmptyState = () => {
  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <WifiIcon className="h-10 w-10" strokeWidth={1.4} />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Whoops! No users found.
        <br />
        This is likely due to network errors.
      </h3>
    </div>
  );
};

export default RecentUsersEmptyState;
