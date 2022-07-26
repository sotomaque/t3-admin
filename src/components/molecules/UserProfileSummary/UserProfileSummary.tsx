import CopyableRow from 'components/atoms/CopyableRow';
import { useUserAccounts, useUserKYC } from 'hooks';
import { useLayout } from 'store';
import { User } from 'types';

interface UserProfileSummaryProps {
  user: User;
}

const UserProfileSummary = ({ user }: UserProfileSummaryProps) => {
  const { isDark } = useLayout();
  const {
    balances: { ecoBalances, usdcBalances },
    apy,
  } = useUserAccounts({ user });
  const {
    cognito: {
      stateBackgroundColor: cognitoStateBackgroundColor,
      stateColor: cognitoStateColor,
      stateLabel: cognitoStateLabel,
    },
    primeTrust: {
      stateBackgroundColor: ptStateBackgroundColor,
      stateColor: ptStateColor,
      stateLabel: ptStateLabel,
    },
  } = useUserKYC({ user });

  return (
    <div className="mx-auto container bg-white dark:bg-slate-700 shadow overflow-x-scroll rounded-xl">
      {/* Title */}
      <div className="flex w-full pl-3 sm:pl-6 pr-3 py-5 items-center justify-between bg-orange-200 dark:bg-opacity-0 dark:border-b-2 dark:border-b-slate-500 rounded-t">
        <div className="flex">
          {/* Full Name */}
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-slate-100">
            {user.givenName} {user.familyName}
          </h3>
          <h4 className="px-2 dark:text-slate-200"> - User Details</h4>
        </div>
      </div>
      {/* Content  */}
      <div className="px-4">
        {/* Details */}
        <CopyableRow
          rowName="User Id"
          rowData={user.userID}
          className="py-2"
          rowNameClassName="dark:text-slate-200"
          rowDataClassName="dark:text-slate-200"
          iconDefaultColor={`${isDark ? 'white' : 'black'}`}
        />
        <hr className="my-2" />
        <CopyableRow
          rowName="Email"
          rowData={user.email}
          className="py-2"
          rowNameClassName="dark:text-slate-200"
          rowDataClassName="dark:text-slate-200"
          iconDefaultColor={`${isDark ? 'white' : 'black'}`}
        />
        <hr className="my-2" />
        <CopyableRow
          rowName="Username"
          rowData={`@${user.username}`}
          className="py-2"
          rowDataClassName="dark:text-slate-200"
          rowNameClassName="dark:text-slate-200"
          iconDefaultColor={`${isDark ? 'white' : 'black'}`}
        />
        <hr className="my-2" />
        <CopyableRow
          rowName="USDC Balance"
          rowData={`$${
            usdcBalances.disbursable?.toFixed(2) ?? '0.00'
          } Disbursable / $${
            usdcBalances.pending?.toFixed(2) ?? '0.00'
          } Pending / $${usdcBalances.settled?.toFixed(2) ?? '0.00'} Settled`}
          disableCopying
          className="py-2"
          rowDataClassName="dark:text-slate-200"
          rowNameClassName="dark:text-slate-200"
        />
        <hr className="my-2" />
        <CopyableRow
          rowName="Eco Balance"
          rowData={`${ecoBalances.availableBalance.toFixed(
            3
          )} Available / ${ecoBalances.totalBalance.toFixed(3)} Total`}
          disableCopying
          className="py-2"
          rowDataClassName="dark:text-slate-200"
          rowNameClassName="dark:text-slate-200"
        />
        <hr className="my-2" />
        <CopyableRow
          rowName="APY"
          rowData={`${apy}%`}
          disableCopying
          className="py-2"
          rowDataClassName="dark:text-slate-200"
          rowNameClassName="dark:text-slate-200"
        />
        <hr className="my-2" />
        <CopyableRow
          rowName="Created At"
          rowData={`${new Date(user.created).toDateString()}`}
          disableCopying
          className="py-2"
          rowDataClassName="dark:text-slate-200"
          rowNameClassName="dark:text-slate-200"
        />
        {/* Cognito */}
        <hr className="my-2" />
        <div className="flex justify-between mt-4 py-2">
          <p className="text-xs text-left dark:text-slate-200">
            Cognito KYC Status
          </p>
          <span
            className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cognitoStateBackgroundColor}`}
          >
            <p className={`pr-1 text-sm text-right ${cognitoStateColor}`}>
              {cognitoStateLabel}
            </p>
          </span>
        </div>

        {/* Prime Trust */}
        <hr className="my-2" />
        <div className="flex justify-between mt-4 py-2">
          <p className="text-xs text-left dark:text-slate-200">PT KYC Status</p>
          <span
            className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ptStateBackgroundColor}`}
          >
            <p className={`pr-1 text-sm text-right ${ptStateColor}`}>
              {ptStateLabel}
            </p>
          </span>
        </div>

        <hr className="my-2" />
        <CopyableRow
          rowName="App Version"
          rowData={`TODO`}
          disableCopying
          className="pt-2 pb-4"
          rowDataClassName="dark:text-slate-200"
          rowNameClassName="dark:text-slate-200"
        />
      </div>
    </div>
  );
};

export default UserProfileSummary;
