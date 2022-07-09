import { Transaction } from 'types';

interface SelectedUsersTransfersTableProps {
  transfers: [] | Transaction[];
}

const SelectedUsersTransfersTable = ({
  transfers,
}: SelectedUsersTransfersTableProps) => {
  console.log({ transfers });
  return <div>SelectedUsersTransfersTable</div>;
};

export default SelectedUsersTransfersTable;
