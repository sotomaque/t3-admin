import {
  UserProfileSummary,
  SelectedUserTransfersSection,
  SelectedUserReferralsSection,
  UserFlagsCard,
  SelectedUsersBankSection,
} from 'components';
import { User } from 'types';

interface SelectedUserSectionProps {
  user: User;
}

const SelectedUserSection = ({ user }: SelectedUserSectionProps) => {
  return (
    <div>
      {/* Profile / User Flags */}
      <div className="h-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <UserProfileSummary user={user} />
        </div>
        <div className="col-span-1">
          <UserFlagsCard user={user} />
        </div>
      </div>
      {/* Transfers */}
      <div className="h-10" />
      <div className="md:p-4 bg-white dark:bg-slate-800">
        <SelectedUserTransfersSection user={user} />
      </div>
      {/* Referrals */}
      <div className="h-10" />
      <div className="md:p-4 bg-white dark:bg-slate-800">
        <SelectedUserReferralsSection user={user} />
      </div>
      {/* Bank Connection */}
      <div className="h-10" />
      <div className="md:p-4 bg-white dark:bg-slate-800">
        <SelectedUsersBankSection user={user} />
      </div>
    </div>
  );
};

export default SelectedUserSection;
