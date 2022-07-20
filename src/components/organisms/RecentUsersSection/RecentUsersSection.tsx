import { Spinner } from 'components/atoms';
import {
  RecentUsersPagination,
  UserSearchResultsEmptyState,
} from 'components/molecules';
import RecentUsersTable from 'components/molecules/RecentUsersTable';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useUsers } from 'store';
import { User } from 'types';

interface RecentUsersSectionProps {
  users: User[];
}

const RecentUsersSection = ({ users }: RecentUsersSectionProps) => {
  const router = useRouter();

  const {
    searchResults,
    setSearchResults,
    filter,
    clearSearchFilter,
    loading,
    searchError,
  } = useUsers();

  const onAddUserClicked = () => {
    router.push('/users/new-user');
  };

  const onClearSearch = () => {
    setSearchResults(null);
    clearSearchFilter();
  };

  const showSearchResultsEmptyState = useMemo(() => {
    return searchError || (searchResults && searchResults.length === 0);
  }, [searchError, searchResults]);

  const showSearchResults = useMemo(() => {
    return (
      searchResults && searchResults.length > 0 && !loading && !searchError
    );
  }, [searchResults, loading, searchError]);

  const showRecentUsers = useMemo(() => {
    return !showSearchResults && !loading && !searchError && !searchResults;
  }, [showSearchResults, loading, searchError, searchResults]);

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
              {/* Loading */}
              {loading && (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              )}
              {/* No Results / Generic Error */}
              {showSearchResultsEmptyState && (
                <UserSearchResultsEmptyState searchFilter={filter} />
              )}
              {/* Valid Search */}
              {showSearchResults &&
                searchResults &&
                searchResults?.length > 0 && (
                  <RecentUsersTable users={searchResults} />
                )}
              {/* Default Recent Users */}
              {showRecentUsers && <RecentUsersTable users={users} />}
            </div>
            {showRecentUsers && users.length > 10 && (
              <div className="pt-2">
                <RecentUsersPagination />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentUsersSection;
