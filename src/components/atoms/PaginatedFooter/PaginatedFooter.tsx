import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useMemo } from 'react';

type PaginatedFooterProps = {
  currentPage: number;
  handleOnClick: (page: number) => Promise<void>;
  handleOnPrev: () => void;
  handleOnNext: () => void;
};

const PaginatedFooter = ({
  currentPage,
  handleOnClick,
  handleOnPrev,
  handleOnNext,
}: PaginatedFooterProps) => {
  const firstValueOnPage = useMemo(() => {
    if (currentPage === 0) {
      return 1;
    } else {
      return currentPage * 10 + 1;
    }
  }, [currentPage]);
  const lastValueOnPage = useMemo(() => {
    return firstValueOnPage + 9;
  }, [firstValueOnPage]);

  return (
    <div className="bg-white dark:bg-slate-600 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          disabled={currentPage === 0}
          onClick={() => handleOnPrev()}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-400 text-sm font-medium rounded-md text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-500 hover:bg-gray-50 hover:dark:bg-slate-300 hover:dark:text-slate-600"
        >
          Previous
        </button>
        <button
          disabled={currentPage === 9}
          onClick={() => handleOnNext()}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-400 text-sm font-medium rounded-md text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-500 hover:bg-gray-50 hover:dark:bg-slate-300 hover:dark:text-slate-600"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-slate-300">
            Showing <span className="font-medium">{firstValueOnPage}</span> to{' '}
            <span className="font-medium">{lastValueOnPage}</span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              disabled={currentPage === 0}
              onClick={() => handleOnPrev()}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-sm font-medium text-gray-500 dark:text-slate-300 ${
                currentPage === 0
                  ? 'bg-gray-300 dark:bg-slate-500 text-gray-800 dark:text-slate-200'
                  : 'hover:bg-gray-50 dark:hover:bg-slate-500 dark:hover:text-slate-300'
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {[...Array(10).keys()].map((page) => {
              return (
                <div
                  onClick={() => handleOnClick(page + 1)}
                  key={`${page + 1}-paginated-footer`}
                  aria-current="page"
                  className={`z-10 ${
                    page === currentPage
                      ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 dark:border-slate-400 text-indigo-600 dark:text-indigo-200'
                      : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-500 text-gray-500 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-200 dark:hover:text-slate-500'
                  } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                >
                  {page + 1}
                </div>
              );
            })}
            <button
              disabled={currentPage === 9}
              onClick={() => handleOnNext()}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-sm font-medium text-gray-500 dark:text-slate-300 ${
                currentPage === 9
                  ? 'bg-gray-300 dark:bg-slate-500 text-gray-800 dark:text-slate-200'
                  : 'hover:bg-gray-50 dark:hover:bg-slate-500 dark:hover:text-slate-300'
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className={`h-5 w-5 `} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginatedFooter;
