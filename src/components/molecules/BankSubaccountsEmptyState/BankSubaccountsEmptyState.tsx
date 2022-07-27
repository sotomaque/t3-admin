import { CurrencyDollarIcon } from '@heroicons/react/outline';
import { useLayout } from 'store';

const BankSubaccountsEmptyState = ({ userId }: { userId?: string }) => {
  const { isDark } = useLayout();
  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <CurrencyDollarIcon
        className="h-10 w-10"
        color={`${isDark && 'lightGray'}`}
        strokeWidth={1.4}
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-300">
        No subaccounts for{' '}
        {userId ? (
          <span className="text-xs">
            <br />
            {userId}
          </span>
        ) : (
          'this user'
        )}
      </h3>
    </div>
  );
};

export default BankSubaccountsEmptyState;
