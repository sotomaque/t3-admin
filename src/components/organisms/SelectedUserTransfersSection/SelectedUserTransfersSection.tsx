import {
  Spinner,
  SelectedUsersTransfersTable,
  PaginatedFooter,
} from 'components';
import { useEffect, useState } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const SelectedUserTransfersSection = ({ userId }: { userId: string }) => {
  const { selectedUserTransactions, setSelectedUserTransactions } = useUsers();
  const { data: transfersData, isLoading: transfersLoading } = trpc.useQuery([
    'transfer.transfersByUserId',
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
                <>
                  <SelectedUsersTransfersTable
                    transfers={selectedUserTransactions}
                  />
                  {selectedUserTransactions.length > 10 && (
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

const TransactionsPagination = ({ userId }: { userId: string }) => {
  // State
  const [currentPage, setCurrentPage] = useState(0);

  // Effect(s)
  const { setLoading, setSelectedUserTransactions } = useUsers();
  const { data, refetch } = trpc.useQuery(
    [
      'transfer.transfersByUserId',
      {
        userId,
        pageNumber: `${currentPage}`,
        pageSize: '10',
        sortOrder: 'desc',
        startDate: '0',
      },
    ],
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (data && data.transfers) {
      setSelectedUserTransactions(data.transfers);
    }
  }, [setSelectedUserTransactions, data]);

  // Function(s)
  const handleOnClick = async (page: number) => {
    if (page > currentPage) {
      if (currentPage > 9) return;
      setCurrentPage(page - 1);
      setLoading(true);
      await refetch();
      setLoading(false);
    } else {
      if (currentPage < 0) return;
      setCurrentPage(page - 1);
      setLoading(true);
      await refetch();
      setLoading(false);
    }
  };
  const handleOnPrev = async () => {
    // validate
    if (currentPage < 1) return;

    // update state
    setCurrentPage((prev) => prev - 1);

    // make users.recentUsers request
    setLoading(true);
    await refetch();
    setLoading(false);
  };
  const handleOnNext = async () => {
    // validate
    if (currentPage > 9) return;

    // update state
    setCurrentPage((prev) => prev + 1);

    // make users.recentUsers request
    setLoading(true);
    await refetch();
    setLoading(false);
  };

  return (
    <PaginatedFooter
      currentPage={currentPage}
      handleOnNext={handleOnNext}
      handleOnPrev={handleOnPrev}
      handleOnClick={handleOnClick}
    />
  );
};
