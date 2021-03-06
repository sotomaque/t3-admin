import { PlusIcon } from '@heroicons/react/outline';
import {
  CreateQuickTransferForm,
  SelectedUsersTransactionsTable,
  Spinner,
  TransactionsPagination,
} from 'components';
import { useMemo } from 'react';
import { useLayout, useUsers } from 'store';
import { User } from 'types';
import { trpc } from 'utils/trpc';

const SelectedUserTransfersSection = ({ user }: { user: User }) => {
  // Effect(s)
  const { setShowPopup, setPopupComponent } = useLayout();
  const {
    selectedUserTransactions,
    setSelectedUserTransactions,
    selectedUserBankConnections,
    selectedUserBankSubaccounts,
  } = useUsers();
  const { data: transfersData, isLoading: transfersLoading } = trpc.useQuery(
    [
      'transfer.transfersByUserId',
      {
        userId: user.userID,
      },
    ],
    {
      retryOnMount: true,
      refetchOnWindowFocus: true,
      cacheTime: 0,
      enabled: true,
      onSuccess(data) {
        setSelectedUserTransactions(data.transfers);
      },
    }
  );
  const isCreateTransferEnabled = useMemo(() => {
    return Boolean(
      selectedUserBankConnections?.length > 0 &&
        selectedUserBankConnections[0]?.itemID &&
        selectedUserBankConnections[0]?.linkStatus === 'LINK_OK' &&
        selectedUserBankSubaccounts?.length > 0
    );
  }, [selectedUserBankConnections, selectedUserBankSubaccounts]);

  // Function(s)
  const handleOnNewTransaction = () => {
    setPopupComponent(<CreateQuickTransferForm user={user} />);
    setShowPopup(true);
  };

  return (
    <div className="p-4 sm:px-6 lg:px-8 dark:bg-slate-700 rounded-xl">
      <div className="flex w-full py-2">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
            Transactions
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-slate-200">
            {user.userID}
          </p>
        </div>
        {transfersData && transfersData.transfers.length > 0 && (
          <div className="pl-6 pt-3">
            <button
              disabled={!isCreateTransferEnabled || transfersLoading}
              onClick={() => handleOnNewTransaction()}
              type="button"
              className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-purple-700 hover:bg-indigo-700 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-purple-600 ${
                !isCreateTransferEnabled && 'opacity-50 cursor-not-allowed'
              }`}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Transaction
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
                      <TransactionsPagination userId={user.userID} />
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
