import { CopyableRow } from 'components/atoms';
import { useUserTransferSelector } from 'hooks';
import { useRouter } from 'next/router';
import { Transfer } from 'types';

const TransferSummary = ({ transfer }: { transfer: Transfer }) => {
  // Effect(s)
  const router = useRouter();
  const {
    formattedDestinationTransferFundsAccountID,
    formattedDestinationTransferFundsAccountName,
    formattedSourceTransferFundsAccountID,
    formattedSourceTransferFundsAccountName,
    formattedTransferAmount,
    formattedTransferCategory,
    formattedTransferState,
    isTransferCompleted,
    transferStateBackgroundColor,
    transferStateColor,
  } = useUserTransferSelector({ transfer });

  const handleOnUserIdClick = () => {
    router.push(`/users/${transfer.originatingUserID}`);
  };

  return (
    <div className="mx-auto container bg-white shadow rounded overflow-x-scroll">
      {/* Title */}
      <div className="flex w-full pl-3 sm:pl-6 pr-3 py-5 items-center justify-between bg-blue-600 rounded-t">
        <div className="flex">
          <h3 className="text-lg leading-6 font-medium text-white">
            Transfer Details
          </h3>
          <h4 className="px-2 font-light text-white">
            {' '}
            - {formattedTransferCategory}
          </h4>
        </div>
      </div>
      {/* Content  */}
      <div className="px-4">
        {/* Details */}
        <CopyableRow
          rowName="User Id"
          rowData={transfer.originatingUserID}
          onClick={handleOnUserIdClick}
        />
        <hr className="my-4" />
        <CopyableRow rowName="Transfer Id" rowData={transfer.transferID} />
        <hr className="my-4" />
        <CopyableRow
          disableCopying
          rowName="Category"
          rowData={transfer.trackingData.transferCategory}
        />
        <hr className="my-4" />
        <CopyableRow
          disableCopying
          rowName="Amount"
          rowData={formattedTransferAmount}
        />
        <hr className="my-4" />
        <CopyableRow
          disableCopying
          rowName="State"
          rowData={formattedTransferState}
          chip
          chipColor={`${transferStateColor} ${transferStateBackgroundColor}`}
        />
        <hr className="my-4" />
        {formattedSourceTransferFundsAccountID !== '' && (
          <>
            <CopyableRow
              rowName="Source - Account ID"
              rowData={formattedSourceTransferFundsAccountID}
            />
            <hr className="my-4" />
          </>
        )}
        {formattedSourceTransferFundsAccountName !== '' && (
          <>
            <CopyableRow
              disableCopying
              rowName="Source - Account Display Name"
              rowData={formattedSourceTransferFundsAccountName}
            />
            <hr className="my-4" />
          </>
        )}
        {formattedDestinationTransferFundsAccountName !== '' && (
          <>
            <CopyableRow
              disableCopying
              rowName="Destination - Account Display Name"
              rowData={formattedDestinationTransferFundsAccountName}
            />
            <hr className="my-4" />
          </>
        )}
        {formattedDestinationTransferFundsAccountID !== '' && (
          <>
            <CopyableRow
              rowName="Destination - Account ID"
              rowData={formattedDestinationTransferFundsAccountID}
            />
            <hr className="my-4" />
          </>
        )}
        <CopyableRow
          rowName="Tracking Id"
          rowData={transfer.trackingData.trackingID}
        />
        <hr className="my-4" />
        <CopyableRow
          disableCopying
          rowName="Request Submitted Time"
          rowData={`${new Date(transfer.requestSubmittedAt).toLocaleString()}`}
        />
        <hr className="my-4" />
        <CopyableRow
          disableCopying
          rowName="Submit Time"
          rowData={`${new Date(
            transfer.transferData.submitTime
          ).toLocaleString()}`}
          className={`${!isTransferCompleted && 'pb-4'}`}
        />
        {isTransferCompleted && (
          <>
            <hr className="my-4" />
            <CopyableRow
              disableCopying
              rowName="Competion Time"
              rowData={`${new Date(
                transfer.transferData.completionTime
              ).toLocaleString()}`}
              className="pb-4"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TransferSummary;
