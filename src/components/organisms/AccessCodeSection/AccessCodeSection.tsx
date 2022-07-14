import { TaskStatusType } from 'pages/users/new-user';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { trpc } from 'utils/trpc';

type AccessCodeErrror = 'Invalid Access Code' | 'Locked Account';

type AccessCodeSectionProps = {
  email: string;
  setBearerToken: Dispatch<SetStateAction<string>>;
  setTaskStatus: Dispatch<SetStateAction<TaskStatusType | null>>;
};

const AccessCodeSection = ({
  email,
  setBearerToken,
  setTaskStatus,
}: AccessCodeSectionProps) => {
  const [accessCode, setAccessCode] = useState('');
  const {
    mutateAsync,
    error: mutationError,
    data,
    isLoading,
    isSuccess,
  } = trpc.useMutation(['registration.validateOTP']);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<AccessCodeErrror | null>(null);

  const verifyOTP = async () => {
    if (!accessCode) return;
    setTaskStatus('Verifying OTP');
    mutateAsync({ email, otp: accessCode });
    setHasSubmitted(true);
  };

  useEffect(() => {
    if (mutationError) {
      if (mutationError.message === 'Invalid Access Code') {
        setError('Invalid Access Code');
        setTaskStatus('OTP Verification Failed');
      } else if (mutationError.message === 'Locked Account') {
        setError('Locked Account');
        setTaskStatus('OTP Verification Failed');
      }
    }
  }, [mutationError, setTaskStatus]);

  useEffect(() => {
    if (data && data.token) {
      setBearerToken(data.token);
    }
  }, [data, setBearerToken]);

  useEffect(() => {
    if (isSuccess) {
      setTaskStatus('OTP Verified');
    }
  }, [isSuccess, setTaskStatus]);

  const isVerifyAccessCodeDisabled = useMemo(
    () => !email || !accessCode || isLoading || hasSubmitted,
    [email, accessCode, isLoading, hasSubmitted]
  );

  const accessCodeButtonLabel = useMemo(() => {
    if (isLoading)
      return (
        <>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          Processing...
        </>
      );
    else if (isSuccess) {
      return 'Success';
    } else if (error) {
      return `${error}`;
    } else {
      return 'Submit';
    }
  }, [isLoading, isSuccess, error]);

  return (
    <div className="my-6 p-4 sm:my-5 space-y-6 sm:space-y-5">
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          Enter Access Code
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex rounded-md ">
            <div className="mt-1 flex flex-col">
              <input
                type="text"
                name="accessCode"
                id="accessCode"
                className={`rounded 
                  border-2 
                  border-gray-300 
                  focus:border-indigo-500 
                  focus:ring-indigo-500                
                  flex-1
                  w-full              
                  min-w-0
                  sm:text-sm 
                  px-2
                  `}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </div>
            <button
              role="button"
              disabled={isVerifyAccessCodeDisabled}
              onClick={(e) => {
                e.preventDefault();
                verifyOTP();
              }}
              className={`
                  ml-2 
                  sm:ml-6 
                  ${
                    hasSubmitted
                      ? error
                        ? 'bg-red-500'
                        : 'bg-green-500'
                      : ' bg-indigo-500'
                  }
                  ${
                    !isVerifyAccessCodeDisabled &&
                    !hasSubmitted &&
                    !error &&
                    'hover:bg-indigo-700'
                  }
                  transition 
                  duration-150 
                  ease-in-out 
                  focus:outline-none 
                  rounded 
                  text-white 
                  px-5 
                  h-8 
                  flex 
                  items-center 
                  text-xs`}
            >
              {accessCodeButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessCodeSection;
