import { useEffect, useState } from 'react';
import { useLayout, useUsers } from 'store';
import { User } from 'types';
import { trpc } from 'utils/trpc';
import CreateCustomTransferForm from '../CreateCustomTransferForm';

const CreateQuickTransferForm = ({ user }: { user: User }) => {
  // State
  const [loading, setLoading] = useState(false);

  // Effect(s)
  const { isDark, setShowPopup, setPopupComponent, clearPopupComponent } =
    useLayout();
  const {
    selectedUserBankSubaccounts,
    selectedUserPlaidId,
    setSelectedUserTransactions,
  } = useUsers();
  const { mutateAsync, isLoading } = trpc.useMutation(
    'transfer.createQuickTransfer',
    {
      onMutate() {
        setLoading(true);
      },
      onSuccess() {
        setShowPopup(false);
      },
      onSettled() {
        setTimeout(() => {
          refetchTransfersByUserId();
          setLoading(false);
        }, 1500);
      },
    }
  );
  const { refetch: refetchTransfersByUserId } = trpc.useQuery(
    [
      'transfer.transfersByUserId',
      {
        userId: user.userID,
      },
    ],
    {
      retryOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      enabled: true,
      onSuccess(data) {
        setSelectedUserTransactions(data.transfers);
      },
    }
  );
  useEffect(() => {
    return () => {
      clearPopupComponent();
    };
  }, [clearPopupComponent]);

  // Function(s)
  const handleOnCancel = () => {
    setShowPopup(false);
  };
  const handleOnCreateCustomTransfer = async () => {
    setShowPopup(false);
    setPopupComponent(<CreateCustomTransferForm user={user} />);

    setTimeout(() => {
      setShowPopup(true);
    }, 500);
  };
  const handleOnCreateQuickTranser = async () => {
    if (!selectedUserBankSubaccounts.length) return;
    if (!selectedUserPlaidId) return;
    let ptPlaidAccountID = selectedUserPlaidId;

    await mutateAsync({ ptPlaidAccountID, userID: user.userID });
  };

  return (
    <div
      className={`${isDark ? 'bg-slate-900' : 'bg-white'} shadow sm:rounded-lg`}
    >
      <div className="px-4 py-5 sm:p-6">
        <h3
          className={`${
            isDark ? 'text-slate-200' : 'text-gray-900'
          } text-lg leading-6 font-medium`}
        >
          Create a Transfer for
        </h3>
        <h4
          className={`${
            isDark ? 'text-slate-400' : 'text-gray-700'
          } text-sm leading-6 font-medium pt-2`}
        >
          {' '}
          {user.userID}
        </h4>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Clicking Create will create a $25 Deposit using this users existing
            bank connection.
          </p>
        </div>
        <div className="mt-5 flex justify-between pt-4 ">
          <button
            disabled={isLoading || loading}
            onClick={() => handleOnCancel()}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Cancel
          </button>
          <div className="space-x-4">
            <button
              disabled={isLoading || loading}
              onClick={() => handleOnCreateCustomTransfer()}
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
            >
              Create Custom Transfer
            </button>
            <button
              disabled={isLoading || loading}
              onClick={() => handleOnCreateQuickTranser()}
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            >
              {isLoading || loading
                ? 'Creating Transfer...'
                : 'Create Quick Transfer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuickTransferForm;
