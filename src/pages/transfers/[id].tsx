import {
  SingleColumnContentWrapper,
  Spinner,
  TransferSummary,
} from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';

const TransferDetailsPage: NextPage = () => {
  // Effect(s)
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.useQuery([
    'transfer.transferDetailsByTransferId',
    { transferId: `${id}` },
  ]);

  return (
    <SingleColumnContentWrapper>
      {isLoading || !data?.transfer ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <TransferSummary transfer={data.transfer} />
      )}
    </SingleColumnContentWrapper>
  );
};

export default TransferDetailsPage;
