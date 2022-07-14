import { SearchIcon } from '@heroicons/react/outline';
import { useDebounce } from 'hooks';
import { useState, useEffect } from 'react';
import { useUsers } from 'store';
import { trpc } from 'utils/trpc';

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

export default SearchUsers;
