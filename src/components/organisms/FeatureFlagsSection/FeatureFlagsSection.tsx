import { Spinner } from 'components/atoms';
import { useEffect, useState } from 'react';
import { useUsers } from 'store';
import { FeatureFlag } from 'types/featureFlags';
import { trpc } from 'utils/trpc';

const FeatureFlagsSection = () => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[] | []>([]);
  const { data, isLoading, error } = trpc.useQuery([
    'featureFlags.getAllFeatureFlags',
  ]);

  useEffect(() => {
    // if the query gives us flags
    if (data && data.flags) {
      setFeatureFlags(data.flags);
    }
  }, [data]);

  return (
    <div className="p-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Feature Flags</h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden md:rounded-lg">
              {isLoading && (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              )}
              {featureFlags && !isLoading && (
                <FeatureFlagsGrid flags={featureFlags} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureFlagsSection;

// Grid List
const FeatureFlagsGrid = ({ flags }: { flags: FeatureFlag[] | [] }) => {
  if (flags.length === 0) {
    return <FeatureFlagsEmptyState />;
  }

  console.dir({ flags });

  return (
    <div>
      {flags.map((flag) => {
        return (
          <Toggle
            key={flag.key}
            label={flag.key}
            description={flag.description}
            isEnabled={flag.environments.staging.on}
          />
        );
      })}
    </div>
  );
};

// Empty State
import { FlagIcon } from '@heroicons/react/outline';
import { Switch } from '@headlessui/react';

const FeatureFlagsEmptyState = () => {
  return (
    <div className="text-center py-6 flex flex-col justify-center items-center">
      <FlagIcon className="h-10 w-10" strokeWidth={1.4} />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No flags found</h3>
    </div>
  );
};

// Toggle
const Toggle = ({
  label,
  description,
  isEnabled = false,
}: {
  label: string;
  description: string;
  isEnabled?: boolean;
}) => {
  const [enabled, setEnabled] = useState(isEnabled);

  return (
    <Switch.Group as="div" className="flex items-center justify-between pb-6">
      <span className="flex-grow flex flex-col">
        <Switch.Label
          as="span"
          className="text-sm font-medium text-gray-900"
          passive
        >
          {label}
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          {description}
        </Switch.Description>
      </span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`
          ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span
          aria-hidden="true"
          className={`
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
          `}
        />
      </Switch>
    </Switch.Group>
  );
};
