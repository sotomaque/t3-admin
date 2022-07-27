import { Sidebar, Spinner } from 'components/atoms';
import {
  RecentTransfersTable,
  TransfersPagination,
} from 'components/molecules';
import { useMemo, useState } from 'react';
import { useLayout, useTransfers } from 'store';
import { Transfer } from 'types';
import { Fragment } from 'react';
import { Menu, Transition, Disclosure } from '@headlessui/react';
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
} from '@heroicons/react/solid';
import { trpc } from 'utils/trpc';

type SortType = 'Newest' | 'Oldest';

type SortOption = {
  name: SortType;
  current: boolean;
};

const defaultSortOptions: SortOption[] = [
  { name: 'Newest', current: true },
  { name: 'Oldest', current: false },
];

const filters = [
  {
    id: 'state',
    name: 'State',
    options: [
      { value: 'TRANSFER_QUEUED', label: 'Queued', checked: false },
      { value: 'TRANSFER_CREATED', label: 'Created', checked: false },
      { value: 'TRANSFER_INITIATING', label: 'Initiating', checked: true },
      {
        value: 'TRANSFER_INITIATION_FAILED',
        label: 'Initiation Failed',
        checked: false,
      },
      { value: 'TRANSFER_PENDING', label: 'Pending', checked: false },
      { value: 'TRANSFER_COMPLETED', label: 'Completed', checked: false },
      { value: 'TRANSFER_FAILED', label: 'Failed', checked: false },
      { value: 'TRANSFER_CANCELLED', label: 'Cancelled', checked: false },
      { value: 'TRANSFER_REVERSED', label: 'Reversed', checked: false },
      {
        value: 'TRANSFER_INSUFFICIENT_FUNDS',
        label: 'Insufficient Funds',
        checked: false,
      },
    ],
  },
  // TODO: add more filters
];

const RecentTransfersSection = ({ transfers }: { transfers: Transfer[] }) => {
  // State
  const [sortOptions, setSortOptions] =
    useState<SortOption[]>(defaultSortOptions);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { setLoading, setRecentTransfers } = useTransfers();
  const { mutateAsync } = trpc.useMutation(['transfer.recentTransfers'], {
    onMutate() {
      setLoading(true);
    },
    onSuccess(data) {
      if (data && data.transfers) {
        setRecentTransfers(data.transfers);
      }
    },
    onSettled() {
      setLoading(false);
    },
  });

  // Effect(s)
  const { isDark } = useLayout();
  const { loading } = useTransfers();
  const showRecentTransfers = useMemo(() => {
    return transfers.length > 0;
  }, [transfers]);

  // Function(s)
  const onToggleSort = async (sortOption: SortOption) => {
    if (sortOption.current) {
      return;
    }

    let sortOrder = sortOption.name === 'Newest' ? 'desc' : 'asc';
    await mutateAsync({ sortOrder });
    setSortOptions((prev) => {
      return prev.map((option) => {
        return { ...option, current: option.name === sortOption.name };
      });
    });
  };

  const onToggleFilter = () => {};

  /*
  TODO:
  - select a transfer
  - /admin/eco/transfers?transferID=<transferID> -> show details
  - filtered query
  - search
  - view selected transfers details
  - additional "transfer like" tables
  - add recurring transfers table to selected user section {{server_url}}/api/v1/admin/recurringtransfers

  */

  return (
    <div className="lg:px-8">
      {/* Filter Section */}
      <Sidebar
        show={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        onClick={() => setMobileFiltersOpen(false)}
        title="Filters"
      >
        <form
          className={`mt-4 border-t ${
            isDark ? 'border-slate-500' : 'border-gray-200'
          } `}
        >
          {/* By default all of them should be checked, 
              since api only lets us sort by one state, we have to ensure they cannot check multiple states
              i.e. either all are checked or just one is checked */}
          {filters.map((section) => (
            <Disclosure
              as="div"
              key={section.id}
              className={`border-t ${
                isDark ? 'border-slate-800 border-opacity-0' : 'border-gray-200'
              } px-4 py-6`}
            >
              {({ open }) => (
                <>
                  <h3 className="-mx-2 -my-3 flow-root">
                    <Disclosure.Button
                      className={`${
                        isDark
                          ? 'bg-slate-500 text-slate-400 hover:text-slate-300'
                          : 'bg-white text-gray-400 hover:text-gray-500'
                      } px-2 py-3 w-full flex items-center justify-between rounded-md`}
                    >
                      <span
                        className={`font-medium ${
                          isDark ? 'text-slate-50' : 'text-gray-900'
                        }`}
                      >
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center ">
                        {open ? (
                          <MinusSmIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                            color={`${isDark ? 'white' : 'black'}`}
                          />
                        ) : (
                          <PlusSmIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                            color={`${isDark ? 'white' : 'black'}`}
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            className={`h-4 w-4 rounded ${
                              isDark
                                ? 'text-slate-300 focus:ring-slate-200 border-slate-500'
                                : 'text-indigo-600 focus:ring-indigo-500 border-gray-300'
                            }`}
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className={`ml-3 min-w-0 flex-1 ${
                              isDark ? 'text-slate-200' : 'text-gray-500'
                            } `}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </form>
      </Sidebar>
      {/* Add User Button */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-200">
            Transfers
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-slate-400">
            A list of all the recently created transfers in staging
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {/* Sort Section */}
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 dark:text-slate-400 group-hover:text-gray-500  dark:group-hover:text-slate-200"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-md shadow-2xl bg-white dark:bg-slate-600 ring-1 ring-black dark:ring-slate-500 ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <button
                            onClick={() => onToggleSort(option)}
                            className={`p-2 text-sm w-full ${
                              option.current
                                ? 'font-medium text-gray-900 dark:text-slate-100'
                                : 'text-gray-500 dark:text-slate-400'
                            } ${active && 'bg-gray-100 dark:bg-slate-700'}`}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 "
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FilterIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        {/* {searchResults && (
          <div className="mt-4 sm:mt-0 sm:ml-2 sm:flex-none">
            <button
              onClick={() => onClearSearch()}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Clear Search
            </button>
          </div>
        )} */}
      </div>
      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black dark:ring-slate-600 ring-opacity-5 md:rounded-lg">
              {/* Loading */}
              {loading && !transfers && (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              )}

              {/* Default Recent Transfers */}
              {showRecentTransfers && (
                <RecentTransfersTable transfers={transfers} />
              )}
              {showRecentTransfers && transfers.length >= 10 && (
                <div className="pt-2">
                  <TransfersPagination />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransfersSection;
