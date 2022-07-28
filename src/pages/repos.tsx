/* eslint-disable @next/next/no-img-element */
import { SingleColumnContentWrapper } from 'components';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useLayout } from 'store';

const repos = [
  {
    name: 'Swift App',
    language: 'Swift',
    url: 'https://github.com/eco/ecoSwiftUI',
    imageUrl: '/swiftui.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Backend',
    language: 'Typescript',
    url: 'https://github.com/eco/eco-server',
    imageUrl: '/typescript.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Currency',
    language: 'Javascript / Solidity',
    url: 'https://github.com/eco/currency',
    imageUrl: '/javascript.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Eco.com',
    language: 'Javascript',
    url: 'https://github.com/eco/corpsite',
    imageUrl: '/javascript.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Unbank',
    language: 'Javascript',
    url: 'TOOD',
    imageUrl: '/javascript.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'App Terms',
    language: 'HTML',
    url: 'https://github.com/eco/app_terms',
    imageUrl: '/html.png',
    imageStyles: 'w-8 h-8',
  },
  {
    name: 'Assets',
    url: 'https://github.com/eco/assets',
    imageUrl: '/favicon.ico',
    imageStyles: 'w-8 h-8',
  },
];

const ReposPage: NextPage = () => {
  const { setSelectedRoute } = useLayout();

  useEffect(() => {
    setSelectedRoute('Repos');
  }, [setSelectedRoute]);

  return (
    <SingleColumnContentWrapper>
      <div className="p-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
              Repos
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden md:rounded-lg">
                <ReposGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleColumnContentWrapper>
  );
};

const ReposGrid = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {repos.map((repo, idx) => (
        <li
          key={`${repo.name}-${idx}`}
          className="col-span-1 bg-white dark:bg-slate-700 rounded-lg shadow divide-y divide-gray-200 dark:divide-slate-500"
        >
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 dark:text-slate-200 text-sm font-medium truncate">
                  {repo.name}
                </h3>
              </div>
              <p className="mt-1 text-gray-500 dark:text-slate-400 text-sm truncate">
                {repo.language}
              </p>
            </div>
            <img
              className={`${repo.imageStyles} flex-shrink-0`}
              src={repo.imageUrl}
              alt={`${repo.name}-logo`}
            />
          </div>
          <div>
            <div className="-mt-px flex">
              <div className="-ml-px w-0 flex-1 flex">
                <a
                  href={repo.url}
                  target="_blank"
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-slate-300 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:hover:text-slate-100"
                  rel="noreferrer"
                >
                  <span className="ml-3">Go</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReposPage;
