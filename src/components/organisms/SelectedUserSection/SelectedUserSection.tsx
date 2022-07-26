import {
  UserProfileSummary,
  SelectedUserTransfersSection,
  SelectedUserReferralsSection,
  UserFlagsCard,
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
      <div className="p-4 bg-white dark:bg-slate-800">
        <SelectedUserTransfersSection userId={user.userID} />
      </div>
      {/* Referrals */}
      <div className="h-10" />
      <div className="p-4 bg-white dark:bg-slate-800">
        <SelectedUserReferralsSection user={user} />
      </div>
    </div>
  );
};

export default SelectedUserSection;
