/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

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
  const firstValueOnPage = (currentPage = 0 ? 1 : currentPage * 10 + 1);
  const lastValueOnPage = firstValueOnPage + 9;

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
            Showing <span className="font-medium">{firstValueOnPage}</span> to{' '}
            <span className="font-medium">{lastValueOnPage}</span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <div
              onClick={() => handleOnPrev()}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                currentPage === 0
                  ? 'bg-gray-300 text-gray-800'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {[...Array(10).keys()].map((page) => (
              <div
                onClick={() => handleOnClick(page + 1)}
                key={`${page + 1}-paginated-footer`}
                aria-current="page"
                className={`z-10 ${
                  page + 1 === currentPage + 1
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {page + 1}
              </div>
            ))}
            <div
              onClick={() => currentPage < 9 && handleOnNext()}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                currentPage === 9
                  ? 'bg-gray-300 text-gray-800'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className={`h-5 w-5 `} aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginatedFooter;
