import { PlusIcon } from '@heroicons/react/solid';
import { UserGroupIcon } from '@heroicons/react/outline';

const ReferralEmptyState = ({ userId }: { userId?: string }) => {
  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <UserGroupIcon className="h-10 w-10" strokeWidth={1.4} />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No referrals for{' '}
        {userId ? (
          <span className="text-xs">
            <br />
            {userId}
          </span>
        ) : (
          'this user'
        )}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new referral.
      </p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Referral
        </button>
      </div>
    </div>
  );
};

export default ReferralEmptyState;
