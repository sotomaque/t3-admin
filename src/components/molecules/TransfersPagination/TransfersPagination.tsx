import { PaginatedFooter } from 'components/atoms';
import { useState } from 'react';
import { useTransfers } from 'store';
import { trpc } from 'utils/trpc';

const TransfersPagination = () => {
  // State
  const [currentPage, setCurrentPage] = useState(0);

  // Effect(s)
  const { setLoading, setRecentTransfers } = useTransfers();
  const { mutateAsync, variables } = trpc.useMutation(
    ['transfer.recentTransfers'],
    {
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: (data) => {
        if (data && data.transfers) {
          setRecentTransfers(data.transfers);
        }
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );

  // Function(s)
  const handleOnClick = async (newPage: number) => {
    const newPageOffset = newPage - 1;
    if (newPageOffset < 0 || newPageOffset > 9) {
      return;
    }
    setCurrentPage(newPageOffset);
    await mutateAsync({
      pageNumber: `${newPageOffset}`,
    });
  };
  const handleOnPrev = async () => {
    // validate
    if (currentPage < 1) return;

    // update state
    setCurrentPage((prev) => prev - 1);

    // make users.recentUsers request
    await mutateAsync({
      pageNumber: `${currentPage - 1}`,
    });
  };
  const handleOnNext = async () => {
    // validate
    if (currentPage > 9) return;

    // update state
    setCurrentPage((prev) => prev + 1);

    // make users.recentUsers request
    await mutateAsync({
      pageNumber: `${currentPage + 1}`,
    });
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

export default TransfersPagination;
