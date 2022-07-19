import { PaginatedFooter } from 'components/atoms';
import { useEffect, useState } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

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

export default TransactionsPagination;
