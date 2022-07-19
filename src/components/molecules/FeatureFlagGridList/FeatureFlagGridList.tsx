import { FeatureFlag } from 'types/featureFlags';
import FeatureFlagsEmptyState from '../FeatureFlagsEmptyState';
import FeatureFlagToggleList from '../FeatureFlagToggleList';

const FeatureFlagsGrid = ({ flags }: { flags: FeatureFlag[] | [] }) => {
  if (!flags || flags.length === 0) {
    return (
      <div className="h-full w-full">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="p-4 bg-white">
              <div className="flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <FeatureFlagsEmptyState />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {flags.map((flag) => {
        return (
          <FeatureFlagToggleList
            key={flag.key}
            label={flag.key}
            description={flag.description}
            isEnabled={flag.environments.staging.on}
          />
        );
      })}
    </>
  );
};

export default FeatureFlagsGrid;
