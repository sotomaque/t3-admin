/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

const PaginatedFooter = () => {
  // State
  const [currentPage, setCurrentPage] = useState(0);

  // Effect(s)
  const { setLoading, setRecentUsers } = useUsers();
  const {
    data: usersData,
    isLoading: usersLoading,
    refetch,
  } = trpc.useQuery(
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

  // Function(s)

  const handleOnPrev = async () => {
    // validate
    if (currentPage < 0) return;

    // update state
    setCurrentPage((prev) => prev - 1);

    // make users.recentUsers request
    setLoading(true);
    await refetch();
    setLoading(false);
  };
  const handleOnNext = async () => {
    // validate
    if (currentPage > 10) return;

    // update state
    setCurrentPage((prev) => prev + 1);

    // make users.recentUsers request
    setLoading(true);
    await refetch();
    setLoading(false);
  };

  useEffect(() => {
    if (usersData && usersData.users) {
      setRecentUsers(usersData.users);
    }
  }, [setRecentUsers, usersData]);

  console.log({ currentPage });

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <div
          onClick={() => handleOnPrev()}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() => handleOnNext()}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of{' '}
            <span className="font-medium">100</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <div
              onClick={() => handleOnPrev()}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {[...Array.from({ length: 10 }, (_, i) => i + 1)].map((page) => (
              <div
                onClick={() => {
                  page < currentPage + 1 ? handleOnPrev() : handleOnNext();
                }}
                key={`${page}-paginated-footer`}
                aria-current="page"
                className={`z-10 ${
                  page === currentPage + 1
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {page}
              </div>
            ))}

            <div
              onClick={() => handleOnNext()}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                onClick={() => handleOnNext()}
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginatedFooter;
