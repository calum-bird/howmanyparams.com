function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Modalities({
  modalities,
  modality,
  setModality,
}: {
  modalities: string[];
  modality: string;
  setModality: (modality: string) => void;
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
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-300 focus:outline-none focus:ring-indigo-300 sm:text-sm"
          onChange={(e) => {
            setModality(e.target.value);
          }}
          value={(modality = "")}
        >
          {modalities.map((mp_modality) => (
            <option key={mp_modality} value={mp_modality}>
              {mp_modality}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {modalities.map((mp_modality) => (
              <a
                key={mp_modality}
                className={classNames(
                  modality === mp_modality
                    ? "text-blue-400"
                    : "border-transparent text-gray-200 hover:text-gray-300 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 font-medium text-sm cursor-pointer"
                )}
                onClick={() => {
                  setModality(mp_modality);
                }}
                aria-current={modality === mp_modality ? "page" : undefined}
              >
                {mp_modality}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
