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
  const handleOnClick = async (page: number) => {
    console.log('in handleOnClick', page);
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
    console.log('in handleOnPrev');

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
    console.log('in handleOnNext');

    // validate
    if (currentPage > 9) return;

    // update state
    setCurrentPage((prev) => prev + 1);

    // make users.recentUsers request
    setLoading(true);
    await refetch();
    setLoading(false);
  };

  console.log('current page in recent users component', currentPage);

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
