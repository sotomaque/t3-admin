import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useLayout } from 'store';

const SingleColumnContentWrapper = dynamic(
  () =>
    import(
      'components/layout/LayoutContentWrappers/SingleColumnContentWrapper'
    ),
  { ssr: false }
);

const DashboardPage: NextPage = () => {
  const { setSelectedRoute } = useLayout();

  useEffect(() => {
    setSelectedRoute('Dashboard');
  }, [setSelectedRoute]);

  return (
    <SingleColumnContentWrapper>
      <div className="p-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden md:rounded-lg">
                <DashboardPlaceholder />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleColumnContentWrapper>
  );
};

export default DashboardPage;

//
/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';

const stats = [
  {
    name: 'Total Users',
    stat: '2,897',
    previousStat: '2,621',
    change: '11%',
    changeType: 'increase',
  },
  {
    name: 'Total Registrations',
    stat: '16',
    previousStat: '18',
    change: '1.11%',
    changeType: 'decrease',
  },
  {
    name: 'Total Deposited',
    stat: '$25,043',
    previousStat: '25,742',
    change: '1.16%',
    changeType: 'decrease',
  },
];

const DashboardPlaceholder = () => {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>

            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from {item.previousStat}
                </span>
              </div>

              <div
                className={`${
                  item.changeType === 'increase'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                } inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0`}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'}{' '}
                  by
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
