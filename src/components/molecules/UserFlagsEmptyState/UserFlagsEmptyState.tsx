import { User } from 'types';

const UserFlagsEmptyState = ({ user }: { user: User }) => (
  <div className="p4">
    <p>No Flags for User: {user.userID}</p>
  </div>
);

export default UserFlagsEmptyState;
