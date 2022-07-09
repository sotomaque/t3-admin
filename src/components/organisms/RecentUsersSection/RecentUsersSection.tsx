import { XIcon } from '@heroicons/react/outline';
import RecentUsersTable from 'components/molecules/RecentUsersTable';
import { useDebounce } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
import { useUsers } from 'store';
import { User } from 'types';
import { trpc } from 'utils/trpc';

interface RecentUsersSectionProps {
  users: User[];
}

const RecentUsersSection = ({ users }: RecentUsersSectionProps) => {
  const [filter, setFilter] = useState('');
  const [searchedUser, setSearchedUser] = useState('');

  const debounedSearchValue = useDebounce(filter, 1000);
  const {
    data: userResults,
    isLoading: userIsLoading,
    refetch: refetchSearch,
    isFetched: searchResultsFetched,
  } = trpc.useQuery(
    [
      'example.userByUsername',
      {
        username: debounedSearchValue,
      },
    ],
    {
      refetchOnWindowFocus: false,
      enabled: debounedSearchValue.length > 0,
    }
  );
  const { searchResults, setSearchResults, clearSelectedUser } = useUsers();

  useEffect(() => {
    console.log({ userIsLoading });
  }, [userIsLoading]);
  useEffect(() => {
    if (debounedSearchValue) {
      console.log({ debounedSearchValue });
    }
  }, [debounedSearchValue]);
  useEffect(() => {
    if (filter) {
      console.log({ filter });
    }
  }, [filter]);
  useEffect(() => {
    if (userResults && userResults.users) {
      setSearchResults(userResults.users);
    }
  }, [setSearchResults, userResults]);

  const handleOnClick = () => {
    // make this simpler -> if you have searched and not changed input -> clear
    // else -> search
    if (filter && searchedUser !== filter) {
      setSearchedUser(filter);
      refetchSearch();
    } else {
      setSearchResults(null);
      clearSelectedUser();
      setFilter('');
      setSearchedUser('');
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const showSearchResults = useMemo(() => {
    return searchResults && searchResults?.length > 0;
  }, [searchResults]);

  const showNoReesultsFound = useMemo(() => {
    return Boolean(searchResultsFetched && !searchResults && filter);
  }, [searchResultsFetched, searchResults, filter]);

  const showRecentUsers = useMemo(() => {
    return !showSearchResults && !showNoReesultsFound;
  }, [showSearchResults, showNoReesultsFound]);

  return (
    <div className="p-4 sm:px-6 lg:px-8">
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
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>
      {/* Search */}
      <div className="w-full p-4 flex flex-col md:flex-row items-start md:items-center justify-end">
        <div className="flex items-center w-7/12 mt-3">
          <div className="relative w-full ">
            <div className="absolute text-gray-600 flex items-center pl-3 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx={10} cy={10} r={7} />
                <line x1={21} y1={21} x2={15} y2={15} />
              </svg>
            </div>
            <label
              htmlFor="search"
              className="hidden text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
            />
            <input
              disabled={false}
              id="search"
              className="w-full bg-transparent text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal pl-8 pr-24 h-10 flex items-center text-sm border-gray-300 rounded border"
              placeholder={'Search by username'}
              value={filter}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          {/*  Button */}
          <button
            disabled={false}
            className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button"
            id="button-addon2"
            onClick={() => handleOnClick()}
          >
            {searchResults ? (
              <XIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {showSearchResults && searchResults && (
                <RecentUsersTable users={searchResults} />
              )}
              {showNoReesultsFound && (
                <div className="p-4">No Results for username: {filter}</div>
              )}
              {showRecentUsers && <RecentUsersTable users={users} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentUsersSection;
