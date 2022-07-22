import { XIcon } from '@heroicons/react/outline';
import CopyableRow from 'components/atoms/CopyableRow';
import { useUserAccounts, useUserKYC } from 'hooks';
import { User } from 'types';

interface UserProfileSummaryProps {
  user: User;
}

const UserProfileSummary = ({ user }: UserProfileSummaryProps) => {
  const {
    balances: { ecoBalances, usdcBalances },
    apy,
  } = useUserAccounts({ user });
  const { cognito, primeTrust } = useUserKYC({ user });

  return (
    <div className="mx-auto container bg-white shadow rounded overflow-x-scroll">
      {/* Title */}
      <div className="flex w-full pl-3 sm:pl-6 pr-3 py-5 items-center justify-between bg-orange-200 rounded-t">
        <div className="flex">
          {/* Full Name */}
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user.givenName} {user.familyName}
          </h3>
          <h4 className="px-2"> - User Details</h4>
        </div>
      </div>
      {/* Content  */}
      <div className="px-4">
        {/* Details */}
        <CopyableRow rowName="User Id" rowData={user.userID} />
        <hr className="my-2" />
        <CopyableRow rowName="Email" rowData={user.email} />
        <hr className="my-2" />
        <CopyableRow rowName="Username" rowData={`@${user.username}`} />
        <hr className="my-2" />
        <CopyableRow
          rowName="USDC Balance"
          rowData={`$${
            usdcBalances.disbursable?.toFixed(2) ?? '0.00'
          } Disbursable / $${
            usdcBalances.pending?.toFixed(2) ?? '0.00'
          } Pending / $${usdcBalances.settled?.toFixed(2) ?? '0.00'} Settled`}
          disableCopying
        />
        <hr className="my-2" />
        <CopyableRow
          rowName="Eco Balance"
          rowData={`${ecoBalances.availableBalance.toFixed(
            3
          )} Available / ${ecoBalances.totalBalance.toFixed(3)} Total`}
          disableCopying
        />
        <hr className="my-2" />
        <CopyableRow rowName="APY" rowData={`${apy}%`} disableCopying />
        <hr className="my-2" />
        <CopyableRow
          rowName="Created At"
          rowData={`${new Date(user.created).toDateString()}`}
          disableCopying
        />
        {/* Cognito */}
        <hr className="my-2" />
        <div className="flex justify-between mt-4">
          <p className="text-xs text-left">Cognito KYC Status</p>
          <span
            className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
            ${cognito === 'KYC_REQUIRED' && 'bg-gray-100 text-gray-800'}
            ${cognito === 'KYC_FAILED' && 'bg-red-100 text-red-800'}
            ${cognito === 'KYC_PENDING' && 'bg-yellow-100 text-yellow-800'}
            ${cognito === 'KYC_PASSED' && 'bg-green-100 text-green-800'}
            `}
          >
            <p className="pr-1 text-sm text-right">{cognito}</p>
          </span>
        </div>

        {/* Prime Trust */}
        <hr className="my-2" />
        <div className="flex justify-between mt-4">
          <p className="text-xs text-left">PT KYC Status</p>
          <span
            className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${primeTrust === 'KYC_REQUIRED' && 'bg-gray-100 text-gray-800'}
            ${primeTrust === 'KYC_FAILED' && 'bg-red-100 text-red-800'}
            ${primeTrust === 'KYC_PENDING' && 'bg-yellow-100 text-yellow-800'}
            ${primeTrust === 'KYC_PASSED' && 'bg-green-100 text-green-800'}
            `}
          >
            <p className="pr-1 text-sm text-right">{primeTrust}</p>
          </span>
        </div>

        <hr className="my-2" />
        <CopyableRow
          rowName="App Version"
          rowData={`TODO`}
          disableCopying
          className="pb-4"
        />
      </div>
    </div>
  );
};

export default UserProfileSummary;
