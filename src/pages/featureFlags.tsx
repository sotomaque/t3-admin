import {
  FeatureFlagGridList,
  SingleColumnContentWrapper,
  Spinner,
} from 'components';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useLayout } from 'store';
import { FeatureFlag } from 'types/featureFlags';
import { trpc } from 'utils/trpc';

const FeatureFlags: NextPage = () => {
  const { setSelectedRoute } = useLayout();
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[] | []>([]);
  const { data, isLoading, error } = trpc.useQuery([
    'featureFlags.getAllFeatureFlags',
  ]);

  useEffect(() => {
    setSelectedRoute('Feature Flags');
  }, [setSelectedRoute]);

  useEffect(() => {
    // if the query gives us flags
    if (data && data.flags) {
      setFeatureFlags(data.flags);
    }
  }, [data]);

  return (
    <SingleColumnContentWrapper>
      <div className="p-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Feature Flags
            </h1>
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
                  <FeatureFlagGridList flags={featureFlags} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleColumnContentWrapper>
  );
};

export default FeatureFlags;
