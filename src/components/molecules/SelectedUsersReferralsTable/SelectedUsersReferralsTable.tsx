import { useUsers } from 'store';
import { Referral } from 'types';
import ReferralsEmptyState from '../ReferralsEmptyState';
import SelectedUserReferralsRow from '../SelectedUserReferralsRow';

interface SelectedUsersReferralsTableProps {
  referrals: [] | Referral[];
}

const SelectedUsersReferralsTable = ({
  referrals,
}: SelectedUsersReferralsTableProps) => {
  const { selectedUser } = useUsers();

  if (referrals.length === 0) {
    return <ReferralsEmptyState userId={selectedUser?.userID} />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      {/* Head */}
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Referral ID
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Referred User - Email
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Referred User - Total Deposited
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Referral State
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Created At
          </th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-200 bg-white">
        {referrals.map((referral, idx) => (
          <tr
            key={`${referral.referralID}-${idx}`}
            className="hover:bg-gray-50"
          >
            <SelectedUserReferralsRow referral={referral} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelectedUsersReferralsTable;
