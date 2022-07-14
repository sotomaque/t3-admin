import { TaskStatusType } from 'pages/users/new-user';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

type EmailSectionProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  hasSubmittedEmail: boolean;
  setHasSubmittedEmail: Dispatch<SetStateAction<boolean>>;
  setTaskStatus: Dispatch<SetStateAction<TaskStatusType | null>>;
};

const EmailSection = ({
  email,
  setEmail,
  hasSubmittedEmail,
  setHasSubmittedEmail,
  setTaskStatus,
}: EmailSectionProps) => {
  const [loading, setLoading] = useState(false);
  const isSendVerficationEmailDisabled = useMemo(
    () => !email || loading || hasSubmittedEmail,
    [email, hasSubmittedEmail, loading]
  );

  const startPasswordlessFlow = async () => {
    if (!email) return;
    setLoading(true);
    setTaskStatus('Sending Verification Email');
    const url = 'api/users/registration/sendOTP';
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (response && response.status === 200) {
      setTaskStatus('Verification Email Sent');
      setHasSubmittedEmail(true);
    }
    setLoading(false);
  };

  return (
    <div className="mb-6 p-4 sm:mb-5 space-y-6 sm:space-y-5">
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Unique email <br />
          <pre className="text-xs "> i.e. albert+10001@eco.com</pre>
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex rounded-md ">
            <div className="mt-1 flex flex-col">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className={`
                rounded 
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="button"
              disabled={isSendVerficationEmailDisabled}
              onClick={(e) => {
                e.preventDefault();
                startPasswordlessFlow();
              }}
              className={`
            ml-2 
            sm:ml-6 
            ${!hasSubmittedEmail ? 'bg-indigo-500' : 'bg-green-500'}
            
            transition 
            duration-150 
            ease-in-out 
            focus:outline-none
            ${
              !isSendVerficationEmailDisabled &&
              !hasSubmittedEmail &&
              'hover:bg-indigo-600'
            }
            rounded 
            text-white 
            px-5
            h-8 
            flex 
            items-center 
            text-xs`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  ></svg>
                  Processing...
                </>
              ) : hasSubmittedEmail ? (
                'Success'
              ) : (
                'Send Verificaiton Email'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSection;
