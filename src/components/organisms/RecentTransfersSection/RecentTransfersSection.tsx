import { Spinner } from 'components/atoms';
import {
  RecentTransfersTable,
  TransfersPagination,
} from 'components/molecules';
import { useMemo, useState } from 'react';
import { useTransfers } from 'store';
import { Transfer } from 'types';
import { Fragment } from 'react';
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react';
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
} from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/outline';

const sortOptions = [
  { name: 'Newest', href: '#', current: true },
  { name: 'Oldest', href: '#', current: false },
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
  const { loading } = useTransfers();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const showRecentTransfers = useMemo(() => {
    return true; // todo: house conditional when we have search filter / error / results
  }, []);

  console.log('IN HERE');

  return (
    <div className="lg:px-8">
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 "
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

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
          {/* Replace Button with Sort / Filter */}
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={`
                             ${
                               option.current
                                 ? 'font-medium text-gray-900'
                                 : 'text-gray-500'
                             }
                             ${active ? 'bg-gray-100' : ''}
                             block px-4 py-2 text-sm
                            )`}
                          >
                            {option.name}
                          </a>
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
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
