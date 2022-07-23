import { SelectedUsersReferralsTable, Spinner } from 'components';
import { useEffect, useState } from 'react';
import { Referral, User } from 'types';
import { trpc } from 'utils/trpc';

const SelectedUserReferralsSection = ({ user }: { user: User }) => {
  const [referrals, setReferrals] = useState<Referral[] | []>([]);
  const { data, isLoading } = trpc.useQuery([
    'user.referralsByUserId',
    { userId: user.userID },
  ]);

  useEffect(() => {
    if (data && data.referrals) {
      setReferrals(data.referrals);
    }
  }, [data]);

  return (
    <div className="p-4 sm:px-6 lg:px-8 dark:bg-slate-700 rounded-xl">
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
            Referrals
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-slate-200">
            {user.userID}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black dark:ring-slate-600 ring-opacity-5 md:rounded-lg">
              {isLoading && (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              )}
              {referrals && !isLoading && (
                <SelectedUsersReferralsTable referrals={referrals} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedUserReferralsSection;
