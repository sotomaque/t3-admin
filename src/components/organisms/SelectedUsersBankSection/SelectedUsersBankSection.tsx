import { Spinner } from 'components/atoms';
import {
  BankSubaccountsEmptyState,
  SelectedUsersBankConnectionsTable,
  SelectedUsersSubaccountTable,
} from 'components/molecules';
import { useMemo } from 'react';
import { useUsers } from 'store';
import { User } from 'types';
import { trpc } from 'utils/trpc';

// TODO: Unlink button
const SelectedUsersBankSection = ({ user }: { user: User }) => {
  // Effect(s)
  const {
    selectedUserBankConnections,
    setSelectedUserBankConnections,
    selectedUserBankSubaccounts,
    setSelectedUserBankSubaccounts,
  } = useUsers();
  const { isLoading: isBankConnectionsLoading, refetch } = trpc.useQuery(
    [
      'user.bankConnectionsByUserId',
      {
        userId: user.userID,
      },
    ],
    {
      onSuccess(data) {
        setSelectedUserBankConnections(data.connections);
        data.connections.length > 0 && fetchLinkedSubaccounts();
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
  const { isLoading: isRelinkLoading, mutateAsync } = trpc.useMutation(
    'plaid.triggerRelink',
    {
      onSuccess() {
        setSelectedUserBankSubaccounts([]);
        setTimeout(() => {
          refetch();
        }, 1500);
      },
    }
  );
  const { isLoading: isUnlinkLoading, mutateAsync: unlink } = trpc.useMutation(
    'plaid.unlinkAccount',
    {
      onSuccess() {
        setSelectedUserBankConnections([]);
        setSelectedUserBankSubaccounts([]);
        setTimeout(() => {
          refetch();
        }, 1500);
      },
    }
  );

  const showRelinkButton = useMemo(() => {
    return (
      !isBankConnectionsLoading &&
      !isSubaccountsLoading &&
      !error &&
      selectedUserBankConnections?.length > 0 &&
      selectedUserBankSubaccounts?.length > 0
    );
  }, [
    isBankConnectionsLoading,
    isSubaccountsLoading,
    error,
    selectedUserBankConnections,
    selectedUserBankSubaccounts,
  ]);

  const showUnlnkButton = useMemo(() => {
    return selectedUserBankConnections?.length > 0;
  }, [selectedUserBankConnections]);

  // Function(s)
  const handleOnRelinkPressed = async () => {
    if (!selectedUserBankConnections?.[0]) return;
    if (!selectedUserBankSubaccounts?.length) return;

    let plaidItemId = selectedUserBankConnections[0].itemID;
    await mutateAsync({
      plaidItemId,
    });
  };
  const handleOnUnlinkPressed = async () => {
    if (!selectedUserBankConnections?.[0]) return;
    if (!selectedUserBankSubaccounts?.length) return;

    let plaidItemId = selectedUserBankConnections[0].itemID;
    await unlink({
      userId: user.userID,
      plaidItemId,
    });
  };

  return (
    <div className="p-4 sm:px-6 lg:px-8 dark:bg-slate-700 rounded-xl space-y-6">
      {/* Bank Connection */}
      <>
        <div className="sm:flex sm:items-center py-2">
          <div className="sm:flex-auto">
            <>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                Bank Information
              </h1>
              <p className="mt-2 text-sm text-gray-700 dark:text-slate-200">
                {user.userID}
              </p>
            </>
          </div>
          {showUnlnkButton && (
            <button
              disabled={isRelinkLoading}
              className="
              bg-purple-400 hover:bg-purple-600 text-white
              dark:bg-purple-700 hover:dark:bg-purple-600  dark:text-slate-200 dark:hover:text-slate-100 
              px-4 py-2 text-center flex items-center rounded-lg text-sm"
              onClick={() => handleOnUnlinkPressed()}
            >
              {isUnlinkLoading ? (
                <Spinner styles="h-4 w-4" />
              ) : (
                'Unlink Institution'
              )}
            </button>
          )}

          {showRelinkButton && (
            <button
              disabled={isRelinkLoading}
              className="bg-blue-400 hover:bg-blue-600 dark:bg-blue-200 dark:hover:bg-blue-100 ml-4 px-4 py-2 text-center flex items-center rounded-lg text-white dark:text-slate-600 dark:hover:text-slate-800 text-sm"
              onClick={() => handleOnRelinkPressed()}
            >
              {isRelinkLoading ? (
                <Spinner styles="h-4 w-4" />
              ) : (
                'Trigger Relink'
              )}
            </button>
          )}
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
            <div className="overflow-hidden shadow ring-1 ring-black dark:ring-slate-600 ring-opacity-5 md:rounded-lg">
              {isSubaccountsLoading && (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              )}
              {!isSubaccountsLoading &&
                selectedUserBankSubaccounts.length === 0 && (
                  <div className="mt-4">
                    <BankSubaccountsEmptyState userId={user.userID} />
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
                        <SelectedUsersSubaccountTable subaccount={subaccount} />
                      </div>
                    ))}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedUsersBankSection;
