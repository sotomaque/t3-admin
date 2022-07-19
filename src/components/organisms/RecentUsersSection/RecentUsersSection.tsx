import { PaginatedFooter, Spinner } from 'components/atoms';
import RecentUsersTable from 'components/molecules/RecentUsersTable';
import { useRouter } from 'next/router';
import { useMemo, useEffect, useState } from 'react';
import { useUsers } from 'store';
import { User } from 'types';
import { trpc } from 'utils/trpc';

interface RecentUsersSectionProps {
  users: User[];
}

const RecentUsersSection = ({ users }: RecentUsersSectionProps) => {
  const router = useRouter();

  const { searchResults, setSearchResults, filter, clearSearchFilter } =
    useUsers();

  const onAddUserClicked = () => {
    router.push('/users/new-user');
  };

  const onClearSearch = () => {
    setSearchResults(null);
    clearSearchFilter();
  };

  const showNoResults = useMemo(() => {
    if (filter && !searchResults) {
      return true;
    } else {
      return false;
    }
  }, [filter, searchResults]);

  const showSearchResults = useMemo(() => {
    if (searchResults) {
      return true;
    } else {
      return false;
    }
  }, [searchResults]);

  const showRecentUsers = useMemo(() => {
    if (showNoResults || showSearchResults) {
      return false;
    } else {
      return true;
    }
  }, [showNoResults, showSearchResults]);

  return (
    <div className="lg:px-8">
      {/* Add User Button */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the recently created users in staging
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => onAddUserClicked()}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
        {searchResults && (
          <div className="mt-4 sm:mt-0 sm:ml-2 sm:flex-none">
            <button
              onClick={() => onClearSearch()}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Clear Serach
            </button>
          </div>
        )}
      </div>
      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {showNoResults && <p className="p-4">No Results for {filter}</p>}
              {showSearchResults && <RecentUsersTable users={searchResults} />}
              {showRecentUsers && <RecentUsersTable users={users} />}
            </div>
            <div className="pt-2">
              <RecentUsersPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentUsersSection;

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
