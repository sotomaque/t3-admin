import { PaginatedFooter } from 'components/atoms';
import { useState } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const RecentUsersPagination = () => {
  // State
  const [currentPage, setCurrentPage] = useState(0);

  // Effect(s)
  const { setRecentUsers, setLoading } = useUsers();
  const { mutateAsync } = trpc.useMutation(['user.recentUsers'], {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      if (data && data.users) {
        setRecentUsers(data.users);
      }
    },
    onSettled: () => {
      setLoading(false);
    },
  });

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

export default RecentUsersPagination;
