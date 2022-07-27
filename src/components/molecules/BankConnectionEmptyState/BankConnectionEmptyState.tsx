import { PlusIcon } from '@heroicons/react/solid';
import { LibraryIcon } from '@heroicons/react/outline';
import { useLayout } from 'store';

const BankConnectionEmptyState = ({ userId }: { userId?: string }) => {
  const { isDark } = useLayout();
  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <LibraryIcon
        className="h-10 w-10"
        color={`${isDark && 'lightGray'}`}
        strokeWidth={1.4}
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-300">
        No bank connections for{' '}
        {userId ? (
          <span className="text-xs">
            <br />
            {userId}
          </span>
        ) : (
          'this user'
        )}
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
        Get started by creating a bank connection.
      </p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-purple-700 hover:bg-indigo-700 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-purple-600"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Bank Connection
        </button>
      </div>
    </div>
  );
};

export default BankConnectionEmptyState;
