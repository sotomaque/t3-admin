import { FeatureFlag } from 'types/featureFlags';
import FeatureFlagsEmptyState from '../FeatureFlagsEmptyState';
import FeatureFlagToggleList from '../FeatureFlagToggleList';

const FeatureFlagsGrid = ({ flags }: { flags: FeatureFlag[] | [] }) => {
  if (flags.length === 0) {
    return <FeatureFlagsEmptyState />;
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
