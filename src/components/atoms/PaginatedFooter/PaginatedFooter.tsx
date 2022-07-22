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
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          disabled={currentPage === 0}
          onClick={() => handleOnPrev()}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === 9}
          onClick={() => handleOnNext()}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
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
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                currentPage === 0
                  ? 'bg-gray-300 text-gray-800'
                  : 'hover:bg-gray-50'
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
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                >
                  {page + 1}
                </div>
              );
            })}
            <button
              disabled={currentPage === 9}
              onClick={() => handleOnNext()}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                currentPage === 9
                  ? 'bg-gray-300 text-gray-800'
                  : 'hover:bg-gray-50'
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
