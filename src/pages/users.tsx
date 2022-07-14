import {
  RecentUsersSection,
  SelectedUserSection,
  SingleColumnContentWrapper,
  Spinner,
} from 'components';
import { useDebounce } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';
import { SearchIcon } from '@heroicons/react/solid';

const Users = () => {
  const { setRecentUsers, recentUsers, selectedUser, setLoading } = useUsers();
  const { data: usersData, isLoading: usersLoading } = trpc.useQuery([
    'example.recentUsers',
  ]);

  useEffect(() => {
    if (usersData && usersData.users) {
      setRecentUsers(usersData.users);
    }
  }, [setRecentUsers, usersData]);

  useEffect(() => {
    setLoading(usersLoading);
  }, [setLoading, usersLoading]);

  const selectedUserRef = useRef(null);

  const scrollToBottom = () => {
    // @ts-ignore:next-line
    selectedUserRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedUser) {
      scrollToBottom();
    }
  }, [selectedUser]);

  return (
    <SingleColumnContentWrapper searchComponent={<SearchUsers />}>
      {usersLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {!!recentUsers && !usersLoading && (
        <div className="bg-gray-100 h-full w-full py-10">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="max-w-7xl mx-auto">
              <div className="p-4 bg-white">
                <RecentUsersSection users={recentUsers} />
              </div>

              {selectedUser && (
                <div ref={selectedUserRef}>
                  <SelectedUserSection user={selectedUser} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SingleColumnContentWrapper>
  );
};

const SearchUsers = () => {
  const [filter, setFilter] = useState('');
  const { setSearchResults, setSearchFilter: setFilterInState } = useUsers();
  const debounedSearchValue = useDebounce(filter, 1000);
  const { data: userResults } = trpc.useQuery(
    [
      'example.usersByUsername',
      {
        username: debounedSearchValue,
      },
    ],
    {
      refetchOnWindowFocus: false,
      enabled: debounedSearchValue.length > 0,
    }
  );

  useEffect(() => {
    setSearchResults(userResults?.users ?? null);
  }, [setSearchResults, userResults]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setFilterInState(debounedSearchValue);
  }, [debounedSearchValue, setFilterInState]);

  return (
    <div>
      <div className="max-w-md w-full mx-auto">
        <label htmlFor="mobile-search" className="sr-only">
          Search
        </label>
        <div className="relative text-white focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="mobile-search"
            className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
