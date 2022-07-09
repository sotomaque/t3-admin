import { Spinner, SelectedUsersTransfersTable } from 'components';
import { useEffect } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const SelectedUserTransfersSection = ({ userId }: { userId: string }) => {
  const { selectedUserTransactions, setSelectedUserTransactions } = useUsers();
  const { data: transfersData, isLoading: transfersLoading } = trpc.useQuery([
    'example.transfersByUserId',
    {
      userId,
    },
  ]);

  useEffect(() => {
    if (transfersData) {
      setSelectedUserTransactions(transfersData.transfers);
    }
  }, [setSelectedUserTransactions, transfersData]);

  return (
    <div className="p-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Transfers</h1>
          <p className="mt-2 text-sm text-gray-700">{userId}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {transfersLoading && (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              )}
              {selectedUserTransactions && !transfersLoading && (
                <SelectedUsersTransfersTable
                  transfers={selectedUserTransactions}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedUserTransfersSection;
