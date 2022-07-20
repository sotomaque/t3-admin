import { PaginatedFooter } from 'components/atoms';
import { useEffect, useState } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const RecentUsersPagination = () => {
  // State
  const [currentPage, setCurrentPage] = useState(0);

  // Effect(s)
  const { setLoading, setRecentUsers } = useUsers();
  const { data, mutate } = trpc.useMutation(['user.recentUsers']);
  useEffect(() => {
    if (data && data.users) {
      setRecentUsers(data.users);
    }
  }, [setRecentUsers, data]);

  // Function(s)
  const handleOnClick = async (newPage: number) => {
    const newPageOffset = newPage - 1;
    if (newPageOffset < 0 || newPageOffset > 9) {
      return;
    }
    setCurrentPage(newPageOffset);
    setLoading(true);
    mutate({
      pageNumber: `${newPageOffset}`,
    });
    setLoading(false);
  };
  const handleOnPrev = async () => {
    // validate
    if (currentPage < 1) return;

    // update state
    setCurrentPage((prev) => prev - 1);

    // make users.recentUsers request
    setLoading(true);
    mutate({
      pageNumber: `${currentPage - 1}`,
    });
    setLoading(false);
  };
  const handleOnNext = async () => {
    // validate
    if (currentPage > 9) return;

    // update state
    setCurrentPage((prev) => prev + 1);

    // make users.recentUsers request
    setLoading(true);
    mutate({
      pageNumber: `${currentPage + 1}`,
    });
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

export default RecentUsersPagination;
