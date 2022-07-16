import { Referral, Transaction } from 'types';

interface SelectedUserReferralsRowProps {
  referral: Referral;
}

const SelectedUserReferralsRow = ({
  referral,
}: SelectedUserReferralsRowProps) => {
  return (
    <>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {referral.referralID}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {referral.referredUser.email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        ${parseFloat(referral.referredUser.totalDeposited).toFixed(2)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {referral.referralState}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Date(referral.createdAt).toLocaleDateString()}
      </td>
    </>
  );
};

export default SelectedUserReferralsRow;
