import { Switch } from '@headlessui/react';
import { useState } from 'react';

const FeatureFlagToggleList = ({
  label,
  description,
  isEnabled = false,
}: {
  label: string;
  description: string;
  isEnabled?: boolean;
}) => {
  const [enabled, setEnabled] = useState(isEnabled);

  return (
    <Switch.Group as="div" className="flex items-center justify-between pb-6">
      <span className="flex-grow flex flex-col">
        <Switch.Label
          as="span"
          className="text-sm font-medium text-gray-900"
          passive
        >
          {label}
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          {description}
        </Switch.Description>
      </span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`
          ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span
          aria-hidden="true"
          className={`
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
          `}
        />
      </Switch>
    </Switch.Group>
  );
};

export default FeatureFlagToggleList;
