import { CheckIcon } from '@heroicons/react/solid';
import { TaskStatusType } from 'pages/users/new-user';
import { useUsers } from 'store';

export type StepStatusType = 'complete' | 'current' | 'upcoming';

export type UserRegistrationProgressType = {
  id: number;
  name: string;
  description: string;
  transferState: TaskStatusType[];
  status: StepStatusType;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const UserRegistrationProgress = () => {
  const { userRegistrationSteps } = useUsers();

  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {userRegistrationSteps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== userRegistrationSteps.length - 1 ? 'pb-10' : '',
              'relative'
            )}
          >
            {step.status === 'complete' ? (
              <>
                {stepIdx !== userRegistrationSteps.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start group">
                  <span className="h-9 flex items-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                      <CheckIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </div>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== userRegistrationSteps.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <div
                  className="relative flex items-start group"
                  aria-current="step"
                >
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                      <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-indigo-600">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {stepIdx !== userRegistrationSteps.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start group">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default UserRegistrationProgress;
