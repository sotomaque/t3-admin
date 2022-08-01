import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useEffect, useMemo, useState } from 'react';
import { useLayout, useUsers } from 'store';
import { User } from 'types';
import { trpc } from 'utils/trpc';

const CreateCustomTransferForm = ({ user }: { user: User }) => {
  // State
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Effect(s)
  const { isDark, setShowPopup, clearPopupComponent } = useLayout();
  const {
    selectedUserBankConnections,
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

  // Function(s)
  const validateUserInput = () => {
    if (userInput === '') return false;
    var pattern = /^\d{0,4}(\.\d{0,2})?$/i;
    if (pattern.test(userInput)) {
      return true;
    } else {
      false;
    }
  };
  const handleOnCancel = () => {
    setShowPopup(false);
    clearPopupComponent();
  };
  const handleOnCreateCustomTransfer = async () => {
    if (userInput === '') return;
    if (!validateUserInput()) {
      setError(true);
      return false;
    }
    if (!selectedUserBankSubaccounts.length) return;
    if (!selectedUserPlaidId) return;
    let ptPlaidAccountID = selectedUserPlaidId;
    await mutateAsync({
      ptPlaidAccountID,
      userID: user.userID,
      amount: userInput,
    });
  };

  const showDarkModeError = useMemo(() => {
    return isDark && isError;
  }, [isDark, isError]);

  const showLightModeError = useMemo(() => {
    return !isDark && isError;
  }, [isDark, isError]);

  const isCreateTransferEnabled = useMemo(() => {
    return Boolean(
      selectedUserBankConnections?.length > 0 &&
        selectedUserBankConnections[0]?.itemID &&
        selectedUserBankConnections[0]?.linkStatus === 'LINK_OK' &&
        selectedUserBankSubaccounts?.length > 0
    );
  }, [selectedUserBankConnections, selectedUserBankSubaccounts]);

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
          Create a Custom Transfer for
        </h3>
        <h4
          className={`${
            isDark ? 'text-slate-400' : 'text-gray-700'
          } text-sm leading-6 font-medium pt-2`}
        >
          {' '}
          {user.userID}
        </h4>
        <div className="mt-4">
          <label
            htmlFor="amount"
            className={`${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }  block text-sm font-medium`}
          >
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="email"
              name="email"
              id="email"
              className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md p-2 
              ${isDark ? 'bg-slate-600 text-slate-300' : 'bg-white text-black'} 
              ${
                showLightModeError &&
                'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              }
              ${
                showDarkModeError &&
                'border-red-300 text-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              }`}
              placeholder="25.00"
              defaultValue="25.00"
              aria-invalid="true"
              aria-describedby="email-error"
              onChange={(e) => {
                if (isError) {
                  setError(false);
                }
                setUserInput(e.target.value);
              }}
            />
            {isError && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          {isError && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              Please enter a valid amount (only numbers and up to two decimals
              are allowed)
            </p>
          )}
        </div>
        <div className="mt-5 flex justify-between pt-4">
          <button
            disabled={isLoading || loading}
            onClick={() => handleOnCancel()}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Cancel
          </button>
          <button
            disabled={isLoading || loading || !isCreateTransferEnabled}
            onClick={() => handleOnCreateCustomTransfer()}
            type="button"
            className={`text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500 ${
              !isCreateTransferEnabled && 'opacity-50 cursor-not-allowed'
            }
                         inline-flex items-center justify-center px-4 py-2 border border-transparent
                         font-medium rounded-mdfocus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
          >
            {isLoading || loading ? 'Creating Transfer...' : 'Create Transfer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomTransferForm;
