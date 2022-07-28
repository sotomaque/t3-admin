/* eslint-disable @next/next/no-img-element */
import { SingleColumnContentWrapper } from 'components';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useLayout } from 'store';
import { ServiceType } from 'types';

const services: ServiceType[] = [
  {
    name: 'Github',
    function: 'Source Control',
    url: 'https://github.com/eco',
    imageUrl: '/github.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Launch Darkly',
    function: 'Feature Flags',
    adminEmail: 'kevin@eco.com',
    url: 'https://app.launchdarkly.com/default/production/features',
    imageUrl: '/launchDarkly.png',
    imageStyles: 'w-18 h-14',
  },
  {
    name: 'Auth0',
    function: 'Authentication',
    adminEmail: 'kevin@eco.com',
    url: 'https://manage.auth0.com/dashboard/us/dev-zxw62lsu/',
    imageUrl: '/auth0.png',
    imageStyles: 'w-5 h-6',
  },
  {
    name: 'Postman',
    function: 'API Testing',
    adminEmail: 'satish@eco.com',
    url: 'https://beamlabs.postman.co/workspace/Eco-App~86707592-db09-4d99-9134-27b8a6230cfe/overview',
    imageUrl: '/postman.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Figma',
    function: 'Design / Prototyping',
    adminEmail: 'kevin@eco.com',
    url: 'https://www.figma.com/files/team/739269891697581784/Eco?fuid=974789030792642477',
    imageUrl: '/figma.png',
    imageStyles: 'w-10 h-10',
  },
  {
    name: 'Lucid.app',
    function: 'Flowchart / Documentation',
    adminEmail: 'kevin@eco.com',
    url: 'https://lucid.app/documents',
    imageUrl: '/lucid.png',
    imageStyles: 'w-14 h-14',
  },
  {
    name: 'Confluence',
    function: 'Documentation',
    adminEmail: 'kevin@eco.com',
    url: 'https://eco.atlassian.net/wiki/home',
    imageUrl: '/confluence.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Jira',
    function: 'Project Managment',
    adminEmail: 'kevin@eco.com',
    url: 'https://eco.atlassian.net/jira/software/c/projects/SA/boards/13',
    imageUrl: '/jira.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Apple App Store Connect',
    function: 'App Store Managment',
    adminEmail: 'kevin@eco.com',
    url: 'https://appstoreconnect.apple.com/',
    imageUrl: '/connect.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'CircleCI',
    function: 'CI/CD',
    adminEmail: 'kevin@eco.com',
    url: 'https://app.circleci.com/pipelines/github/eco?filter=all',
    imageUrl: '/circle.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Unbank',
    function: 'Production Admin Tool',
    adminEmail: 'fransisco@eco.com',
    url: 'https://unbank.eco.com/',
    imageUrl: '/eco.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Mixpanel',
    function: 'Analytics',
    adminEmail: 'ashlee@eco.com',
    url: 'https://unbank.eco.com/',
    imageUrl: '/mixpanel.png',
    imageStyles: 'w-8 h-8 rounded-full ',
  },
  {
    name: 'Firebase',
    function: 'Crash Reports',
    adminEmail: 'kevin@eco.com',
    url: 'https://unbank.eco.com/',
    imageUrl: '/firebase.png',
    imageStyles: 'w-6 h-8',
  },
  {
    name: 'Slack',
    function: 'Internal Messeging',
    imageUrl: '/slack.png',
    url: 'eco-pay.slack.com',
    imageStyles: 'w-6 h-6 ',
  },
  {
    name: 'Zoom',
    function: 'Video Conferencing',
    imageUrl: '/zoom.png',
    url: 'https://us02web.zoom.us/profile?from=client',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Cognito',
    function: 'KYC',
    adminEmail: 'charlie@eco.com',
    url: 'https://playground.cognitohq.com/login',
    imageUrl: '/cognito.png',
    imageStyles: 'w-6 h-6',
  },
  {
    name: 'Pinwheel',
    function: 'Payroll Deposits',
    adminEmail: 'charlie@eco.com',
    imageUrl: '/pinwheel.png',
    url: 'https://docs.pinwheelapi.com/docs/getting-started',
    imageStyles: 'w-6 h-6',
  },
  {
    name: 'Papaya',
    function: 'Bill Pay',
    adminEmail: 'charlie@eco.com',
    imageUrl: '/papaya.png',
    url: 'https://billpay.papayapay.com/docs/',
    imageStyles: 'w-10 h-4',
  },
  {
    name: 'Lithic',
    function: 'Debit Card Issuer',
    imageUrl: '/lithic.png',
    url: 'https://docs.lithic.com/docs',
    imageStyles: 'w-10 h-10',
  },
  {
    name: 'Zendesk',
    function: 'Customer Support',
    adminEmail: 'tyler@eco.com',
    url: 'www.zendesk.com',
    imageUrl: '/zendesk.png',
    imageStyles: 'w-11 h-8',
  },
];

const ServicesPage: NextPage = () => {
  const { setSelectedRoute } = useLayout();

  useEffect(() => {
    setSelectedRoute('Services');
  }, [setSelectedRoute]);

  return (
    <SingleColumnContentWrapper>
      <div className="p-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
              Services
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden md:rounded-lg">
                <ServicesGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleColumnContentWrapper>
  );
};

const ServicesGrid = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-4"
    >
      {services.map((service, idx) => (
        <li
          key={`${service.name}-${idx}`}
          className="col-span-1 bg-white dark:bg-slate-700 rounded-lg shadow divide-y divide-gray-200 dark:divide-slate-500"
        >
          <div className="w-full flex items-center p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 dark:text-slate-200 text-sm font-medium truncate">
                  {service.name}
                </h3>
              </div>
              <p className="mt-1 text-gray-500 dark:text-slate-400 text-sm truncate">
                {service.function}
              </p>
            </div>
            <img
              className={`${service.imageStyles} flex-shrink-0`}
              src={service.imageUrl}
              alt={`${service.name}-logo`}
            />
          </div>
          <div>
            <div className="flex divide-x divide-gray-200 dark:divide-slate-500">
              {service.adminEmail && (
                <div className="flex-1 flex">
                  <a
                    href={`mailto:${service.adminEmail}`}
                    className="relative p-4 flex-1 inline-flex justify-center text-sm text-gray-700 dark:text-slate-300 font-medium rounded-bl-lg hover:text-gray-500 dark:hover:text-slate-100"
                  >
                    <span>Request Access</span>
                  </a>
                </div>
              )}
              <div className="flex-1 flex">
                <a
                  href={service.url}
                  target="_blank"
                  className="relative p-4 flex-1 inline-flex justify-center text-sm text-gray-700 dark:text-slate-300 font-medium rounded-br-lg hover:text-gray-500 dark:hover:text-slate-100"
                  rel="noreferrer"
                >
                  <span>Go</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ServicesPage;
