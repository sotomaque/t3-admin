import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon, MoonIcon } from '@heroicons/react/outline';
import { MoonIcon as MoonIconSolid } from '@heroicons/react/solid';
import Image from 'next/image';
import { CommandPalette, Notification } from 'components/atoms';
import { useLayout } from 'store';
import { NavigationRoute, RoutePath } from 'types/routes';

const navigation: NavigationRoute[] = [
  { name: 'Home', href: '/' },
  { name: 'Users', href: '/users' },
  { name: 'Services', href: '/services' },
  { name: 'Repos', href: '/repos' },
  { name: 'Dashboard', href: '/dashboards' },
  { name: 'Feature Flags', href: '/featureFlags' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    searchComponent,
    selectedRoute,
    setShowNotification,
    setShowPopup,
    showNotification,
    showPopup,
  } = useLayout();

  return (
    <>
      <div className={`min-h-screen dark:bg-slate-800`}>
        <Popover as="header" className="pb-24 bg-indigo-600 dark:bg-indigo-900">
          {({ open }) => (
            <>
              <div className="max-w-3xl mx-auto p-4 sm:pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative py-5 flex items-center justify-center lg:justify-between">
                  <Logo />
                  <MenuButton open={open} />
                </div>
                <NavigationRow
                  selectedRoute={selectedRoute}
                  searchComponent={searchComponent}
                />
              </div>

              <MobileMenu />
            </>
          )}
        </Popover>
        <main className="-mt-20 pb-8 ">
          <>
            {children}
            <Notification
              show={showNotification}
              setShow={setShowNotification}
            />
            <CommandPalette show={showPopup} setShow={setShowPopup} />
          </>
        </main>
        <Footer />
      </div>
    </>
  );
}

const NavigationRow = ({
  selectedRoute,
  searchComponent,
}: {
  selectedRoute: RoutePath;
  searchComponent?: React.ReactNode;
}) => {
  return (
    <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
      <div className="grid grid-cols-3 gap-8 items-center">
        <div className="col-span-2">
          <nav className="flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  selectedRoute === item.name
                    ? 'bg-white bg-opacity-10'
                    : 'bg-opacity-0'
                } text-indigo-100 text-sm font-medium rounded-md bg-white px-3 py-2 hover:bg-opacity-10 `}
                aria-current={selectedRoute === item.name ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        {searchComponent && searchComponent}
      </div>
    </div>
  );
};

const MenuButton = ({ open }: { open: boolean }) => {
  const { isDark, toggleIsDark } = useLayout();

  const handleOnToggle = () => {
    toggleIsDark();
  };

  return (
    <>
      <div className="absolute right-0 flex-shrink-0 lg:hidden">
        {/* Mobile menu button */}
        <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
          <span className="sr-only">Open main menu</span>
          {open ? (
            <XIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
          )}
        </Popover.Button>
      </div>
      <div className="absolute right-14 lg:right-0 flex-shrink-0">
        {isDark ? (
          <MoonIconSolid color="white" height={25} onClick={handleOnToggle} />
        ) : (
          <MoonIcon color="white" height={25} onClick={handleOnToggle} />
        )}
      </div>
    </>
  );
};

const Logo = () => {
  const { isDark } = useLayout();
  return (
    <div className="absolute left-0 flex-shrink-0 lg:static">
      <a href="#">
        <span className="sr-only">Eco</span>
        <Image
          height="30"
          width="90"
          src={
            isDark
              ? 'https://eco.github.io/assets/images/eco-logo-white.svg'
              : 'https://eco.github.io/assets/images/eco-logo-color-140.png'
          }
          alt="Eco Admin"
        />
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="dark:bg-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="border-t border-gray-200 dark:border-slate-700 py-8 text-sm text-gray-500 text-center sm:text-left">
          <span className="block sm:inline">&copy; 2022 Eco Inc.</span>{' '}
          <span className="block sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

const MobileMenu = () => {
  return (
    <Transition.Root as={Fragment}>
      <div className="lg:hidden">
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
              <div className="pt-3 pb-2">
                <div className="flex items-center justify-between px-4">
                  <div>
                    <Image
                      height="30"
                      width="85"
                      src="https://eco.github.io/assets/images/eco-logo-color-140.png"
                      alt="Eco Admin"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {navigation.map((item, idx) => (
                    <a
                      href={item.href}
                      key={`${item.name}-mobile-${idx}`}
                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};
