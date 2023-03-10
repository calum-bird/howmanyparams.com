function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [{ name: "Params" }, { name: "FLOPs" }, { name: "Loss" }];

export default function ModelSelector({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (mode: string) => void;
}) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-300 focus:outline-none focus:ring-blue-300 sm:text-sm"
          onChange={(e) => {
            setSelected(e.target.value);
          }}
          value={selected}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
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
                    ? "text-blue-400"
                    : "border-transparent text-gray-200 hover:text-gray-300 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 font-medium text-sm cursor-pointer"
                )}
                onClick={() => {
                  setSelected(tab.name);
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
