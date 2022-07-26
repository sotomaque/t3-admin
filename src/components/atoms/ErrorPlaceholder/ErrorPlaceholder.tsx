import { useLayout } from 'store';
import { ExclamationIcon } from '@heroicons/react/outline';

const ErrorPlaceholder = ({ message = '' }: { message: string | null }) => {
  const { isDark } = useLayout();
  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <ExclamationIcon
        className="h-10 w-10"
        color={`${isDark && 'lightGray'}`}
        strokeWidth={1.4}
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-300">
        Whoops! An error occurred.
      </h3>
      {message != '' && (
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          {message}
        </p>
      )}
    </div>
  );
};

export default ErrorPlaceholder;
