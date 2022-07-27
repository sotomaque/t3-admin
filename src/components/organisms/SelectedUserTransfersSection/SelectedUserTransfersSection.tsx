import { PlusIcon } from '@heroicons/react/outline';
import {
  Spinner,
  SelectedUsersTransactionsTable,
  TransactionsPagination,
} from 'components';
import { useEffect, useState } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const SelectedUserTransfersSection = ({ userId }: { userId: string }) => {
  const { selectedUserTransactions, setSelectedUserTransactions } = useUsers();
  const { data: transfersData, isLoading: transfersLoading } = trpc.useQuery(
    [
      'transfer.transfersByUserId',
      {
        userId,
      },
    ],
    {
      refetchOnWindowFocus: true,
      cacheTime: 0,
      enabled: true,
    }
  );

  useEffect(() => {
    if (transfersData) {
      setSelectedUserTransactions(transfersData.transfers);
    }
  }, [setSelectedUserTransactions, transfersData]);

  return (
    <div className="p-4 sm:px-6 lg:px-8 dark:bg-slate-700 rounded-xl">
      <div className="flex w-full py-2">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
            Transactions
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-slate-200">
            {userId}
          </p>
        </div>
        {transfersData && transfersData.transfers.length > 0 && (
          <div className="pl-6 pt-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-purple-700 hover:bg-indigo-700 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-purple-600"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Transaction
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black dark:ring-slate-600 ring-opacity-5 md:rounded-lg">
              {transfersLoading && (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              )}
              {selectedUserTransactions && !transfersLoading && (
                <>
                  <SelectedUsersTransactionsTable
                    transactions={selectedUserTransactions}
                  />
                  {selectedUserTransactions.length >= 10 && (
                    <div className="pt-2">
                      <TransactionsPagination userId={userId} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedUserTransfersSection;
