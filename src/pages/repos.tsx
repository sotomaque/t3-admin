import { SingleColumnContentWrapper } from 'components';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useLayout } from 'store';

const ReposPage: NextPage = () => {
  const { setSelectedRoute } = useLayout();

  useEffect(() => {
    setSelectedRoute('Repos');
  }, [setSelectedRoute]);

  return (
    <SingleColumnContentWrapper>
      <div className="p-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Repos</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden md:rounded-lg">
                <div>TODO: Repos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleColumnContentWrapper>
  );
};

export default ReposPage;
