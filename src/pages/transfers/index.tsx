import {
  RecentTransfersSection,
  SingleColumnContentWrapper,
  Spinner,
} from 'components';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useLayout, useTransfers } from 'store';
import { trpc } from 'utils/trpc';

const TransfersPage: NextPage = () => {
  // Effect(s)
  const { setSelectedRoute } = useLayout();
  const { setLoading, setRecentTransfers, recentTransfers } = useTransfers();
  const { isLoading: transfersLoading, mutate } = trpc.useMutation(
    ['transfer.recentTransfers'],
    {
      onSuccess(data) {
        if (data && data.transfers) {
          setRecentTransfers(data.transfers);
        }
      },
    }
  );
  useEffect(() => {
    mutate({ pageNumber: '0' });
  }, [mutate]);
  useEffect(() => {
    setSelectedRoute('Transfers');
  }, [setSelectedRoute]);
  useEffect(() => {
    setLoading(transfersLoading);
  }, [setLoading, transfersLoading]);

  if (transfersLoading) {
    return (
      <SingleColumnContentWrapper>
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </SingleColumnContentWrapper>
    );
  }

  return (
    <SingleColumnContentWrapper>
      {!!recentTransfers && !transfersLoading && (
        <div className="h-full w-full py-10">
          <div className="max-w-10xl mx-auto lg:px-4">
            <div className="max-w-7xl mx-auto">
              <div className="md:p-4 bg-white dark:bg-slate-800">
                <RecentTransfersSection transfers={recentTransfers} />
              </div>
            </div>
          </div>
        </div>
      )}
    </SingleColumnContentWrapper>
  );
};

export default TransfersPage;
