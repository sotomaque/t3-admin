import { Spinner } from 'components/atoms';
import {
  RecentTransfersTable,
  TransfersPagination,
} from 'components/molecules';
import { useMemo } from 'react';
import { useTransfers } from 'store';
import { Transfer } from 'types';

const RecentTransfersSection = ({ transfers }: { transfers: Transfer[] }) => {
  const { loading } = useTransfers();

  const showRecentTransfers = useMemo(() => {
    return true; // todo: house conditional when we have search filter / error / results
  }, []);

  return (
    <div className="lg:px-8">
      {/* Add User Button */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-200">
            Transfers
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-slate-400">
            A list of all the recently created transfers in staging
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            // onClick={() => onAddUserClicked()}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Transfer
          </button>
        </div>
        {/* {searchResults && (
          <div className="mt-4 sm:mt-0 sm:ml-2 sm:flex-none">
            <button
              onClick={() => onClearSearch()}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Clear Search
            </button>
          </div>
        )} */}
      </div>
      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {/* Loading */}
              {loading && !transfers && (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              )}

              {/* Default Recent Transfers */}
              {showRecentTransfers && (
                <RecentTransfersTable transfers={transfers} />
              )}
              {showRecentTransfers && transfers.length >= 10 && (
                <div className="pt-2">
                  <TransfersPagination />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransfersSection;
