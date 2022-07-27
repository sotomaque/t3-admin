import { Spinner } from 'components/atoms';
import {
  SelectedUsersBankConnectionsTable,
  SelectedUsersSubaccountTable,
} from 'components/molecules';
import { useUsers } from 'store';
import { User } from 'types';
import { trpc } from 'utils/trpc';

const SelectedUsersBankSection = ({ user }: { user: User }) => {
  // Effect(s)
  const {
    selectedUserBankConnections,
    setSelectedUserBankConnections,
    selectedUserBankSubaccounts,
    setSelectedUserBankSubaccounts,
  } = useUsers();
  const { isLoading: isBankConnectionsLoading } = trpc.useQuery(
    [
      'user.bankConnectionsByUserId',
      {
        userId: user.userID,
      },
    ],
    {
      onSuccess(data) {
        setSelectedUserBankConnections(data.connections);
        fetchLinkedSubaccounts();
      },
    }
  );
  const {
    refetch: fetchLinkedSubaccounts,
    isLoading: isSubaccountsLoading,
    error,
  } = trpc.useQuery(
    [
      'plaid.linkedSubaccount',
      {
        userId: user.userID,
        itemId: selectedUserBankConnections?.[0]?.itemID ?? '',
      },
    ],
    {
      enabled: selectedUserBankConnections?.length > 0,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setSelectedUserBankSubaccounts(data.subaccounts);
      },
    }
  );

  return (
    <div className="p-4 sm:px-6 lg:px-8 dark:bg-slate-700 rounded-xl space-y-6">
      {/* Bank Connection */}
      <>
        <div className="sm:flex sm:items-center py-2">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
              Bank Information
            </h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-slate-200">
              {user.userID}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black dark:ring-slate-600 ring-opacity-5 md:rounded-lg">
                {isBankConnectionsLoading && (
                  <div className="flex items-center justify-center h-screen">
                    <Spinner />
                  </div>
                )}
                {selectedUserBankConnections && !isBankConnectionsLoading && (
                  <SelectedUsersBankConnectionsTable
                    connections={selectedUserBankConnections}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
      {/* Bank Subaccount(s) */}
      {!error && (
        <>
          <div className="sm:flex sm:items-center py-2">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                Bank Subaccounts
              </h1>
              <p className="mt-2 text-sm text-gray-700 dark:text-slate-200">
                {user.userID}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 space-y-6">
                <div className="overflow-hidden shadow md:rounded-lg">
                  {isSubaccountsLoading && (
                    <div className="flex items-center justify-center h-screen">
                      <Spinner />
                    </div>
                  )}
                  {selectedUserBankSubaccounts &&
                    selectedUserBankSubaccounts.length > 0 &&
                    !isSubaccountsLoading && (
                      <>
                        {selectedUserBankSubaccounts.map((subaccount, idx) => (
                          <div
                            className={`${
                              idx != selectedUserBankSubaccounts.length - 1 &&
                              'mb-6'
                            } md:md:rounded-lg`}
                            key={`${subaccount.account_id}-${idx}`}
                          >
                            <SelectedUsersSubaccountTable
                              subaccount={subaccount}
                            />
                          </div>
                        ))}
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedUsersBankSection;
