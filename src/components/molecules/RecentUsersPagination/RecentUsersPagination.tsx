import { PaginatedFooter } from 'components/atoms';
import { useEffect, useState } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const RecentUsersPagination = () => {
  // State
  const [currentPage, setCurrentPage] = useState(0);

  // Effect(s)
  const { setLoading, setRecentUsers } = useUsers();
  const { data, refetch } = trpc.useQuery(
    [
      'user.recentUsers',
      {
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
    if (data && data.users) {
      setRecentUsers(data.users);
    }
  }, [setRecentUsers, data]);

  // Function(s)
  const handleOnClick = async (newPage: number) => {
    if (newPage > currentPage) {
      if (currentPage > 9) return;
      setCurrentPage(newPage - 1);
      setLoading(true);
      await refetch();
      setLoading(false);
    } else {
      if (currentPage < 0) return;
      setCurrentPage(newPage - 1);
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
      handleOnNext={() => handleOnNext}
      handleOnPrev={() => handleOnPrev}
      handleOnClick={(newPage) => handleOnClick(newPage)}
    />
  );
};

export default RecentUsersPagination;
