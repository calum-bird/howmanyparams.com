import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Optimal (new)", mode: "optimal" },
  { name: "Compute cost", mode: "cost" },
];

export default function ModelSelector({
  setMode,
}: {
  setMode: (mode: string) => void;
}) {
  const [selected, setSelected] = useState(tabs[0].name);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-300 focus:outline-none focus:ring-indigo-300 sm:text-sm"
          onChange={(e) => {
            setSelected(e.target.value);

            let mode = tabs.find((tab) => tab.name === e.target.value)?.mode;
            if (mode) setMode(mode);
          }}
          value={selected}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.mode}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                className={classNames(
                  selected === tab.name
                    ? "border-indigo-300 text-indigo-400"
                    : "border-transparent text-gray-200 hover:text-gray-300 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                )}
                onClick={() => {
                  setSelected(tab.name);
                  setMode(tab.mode);
                }}
                aria-current={selected === tab.name ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
