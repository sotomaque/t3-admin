import { UserProfileSummary } from 'components/molecules';
import { Dispatch, SetStateAction } from 'react';
import { User } from 'types';

interface SelectedUserSectionProps {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
}

const SelectedUserSection = ({
  user,
  setSelectedUser,
}: SelectedUserSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-1 bg-white">
        <UserProfileSummary user={user} setSelectedUser={setSelectedUser} />
      </div>
      <div className="col-span-1 bg-white">
        <div>TODO: User Flags</div>
      </div>
    </div>
  );
};

export default SelectedUserSection;
