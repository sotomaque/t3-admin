import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { useLayout } from 'store';

interface SidebarProps {
  children: React.ReactNode;
  onClick: () => void;
  onClose: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  title: string;
}

const Sidebar = ({ show, onClose, title, onClick, children }: SidebarProps) => {
  const { isDark } = useLayout();

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-40 " onClose={onClose}>
        {/* Opacity Over Non-Sidebar Area */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 ${
              isDark ? 'bg-slate-800' : 'bg-black'
            } bg-opacity-25`}
          />
        </Transition.Child>

        {/* Sidebar */}
        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              className={`ml-auto relative max-w-xs w-full h-full ${
                isDark ? 'bg-slate-900' : 'bg-white'
              } shadow-xl py-4 pb-12 flex flex-col overflow-y-auto`}
            >
              <div className="px-4 flex items-center justify-between">
                <h2
                  className={`text-lg font-medium ${
                    isDark ? 'text-slate-200' : 'text-gray-900'
                  }`}
                >
                  {title}
                </h2>
                <button
                  type="button"
                  className={`-mr-2 w-10 h-10 ${
                    isDark
                      ? 'bg-slate-900 text-slate-400'
                      : 'bg-white text-gray-400'
                  } p-2 rounded-md flex items-center justify-center`}
                  onClick={() => onClick()}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;
