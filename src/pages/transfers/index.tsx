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
  const { setSelectedRoute, setSearchComponent, clearSearchComponent } =
    useLayout();
  const { setLoading, setRecentTransfers, recentTransfers, loading } =
    useTransfers();

  const {
    data,
    isLoading: tranfersLoading,
    error,
  } = trpc.useQuery([
    'transfer.recentTransfers',
    {
      pageNumber: '0',
      pageSize: '10',
    },
  ]);

  useEffect(() => {
    setSelectedRoute('Transfers');
  }, [setSelectedRoute]);

  useEffect(() => {
    setLoading(tranfersLoading);
  }, [setLoading, tranfersLoading]);

  useEffect(() => {
    setRecentTransfers(data?.transfers ?? []);
  }, [data, setRecentTransfers]);

  return (
    <SingleColumnContentWrapper>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {!!recentTransfers && !loading && (
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
