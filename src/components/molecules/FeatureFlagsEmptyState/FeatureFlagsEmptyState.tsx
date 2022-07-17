import { FlagIcon } from '@heroicons/react/outline';

const FeatureFlagsEmptyState = () => {
  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <FlagIcon className="h-10 w-10" strokeWidth={1.4} />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No flags found</h3>
    </div>
  );
};

export default FeatureFlagsEmptyState;
