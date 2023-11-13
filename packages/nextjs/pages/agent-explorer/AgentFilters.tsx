import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ExplorerLinks from "../property-explorer/ExplorerLinks";
import { MapIcon } from "@heroicons/react/24/outline";
import { MapIcon as MapIconSolid } from "@heroicons/react/24/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import useDebouncer from "~~/hooks/useDebouncer";
import { useKeyboardShortcut } from "~~/hooks/useKeyboardShortcut";
import { AgentModel } from "~~/models/agent.model";

interface FilterModel {
  search?: string;
}

interface Props {
  onFilter: (filter?: FilterModel) => void;
  agents: AgentModel[];
}

const AgentFilters = ({ onFilter, agents }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [mapOpened, setMapOpened] = useState(false);
  const [filter, setFilter] = useState<FilterModel>();
  const [search, setSearch] = useState<string | undefined>();
  const debouncedSearch = useDebouncer(search, 500);

  const Map = useMemo(
    () =>
      dynamic(() => import("~~/components/Map"), {
        loading: () => (
          <div className="w-full flex flex-row justify-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ),
        ssr: false,
      }),
    [agents],
  );

  useEffect(() => {
    if (debouncedSearch) {
      applyFilter({ search: debouncedSearch });
    }
  }, [debouncedSearch]);

  const applyFilter = (partialFilter: Partial<FilterModel>) => {
    const newFilter = { ...filter, ...partialFilter };
    setFilter(newFilter);
    onFilter(newFilter);
  };

  useKeyboardShortcut(["/"], ev => {
    if (ev.target === searchRef.current) return;
    searchRef.current?.focus();
    ev.preventDefault();
  });

  useKeyboardShortcut(["Enter"], () => {
    onFilter(filter);
  });

  return (
    <div className="Wrapper flex flex-col w-full mb-8">
      <ExplorerLinks />
      <div className="filters">
        <div className="flex flex-wrap justify-evenly items-center gap-8 w-full ">
          <button className="btn btn-lg btn-outline">
            <AdjustmentsHorizontalIcon className="w-4" />
            More filters
          </button>
          <div className="flex-grow flex items-center">
            <input
              ref={searchRef}
              className="input input-lg input-bordered border-1 w-full"
              placeholder="Agent name or username"
              onChange={() => setSearch(searchRef.current?.value)}
              value={search}
            />
            <kbd className="bd bg-neutral-focus -ml-14 flex justify-center items-center w-10 h-10 rounded-xl">
              /
            </kbd>
          </div>
          <div className="join">
            <button className="join-item btn btn-square btn-outline">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.75 0.242325C7.92155 0.242325 7.25 0.913897 7.25 1.74232V3.99233C7.25 4.82078 7.92155 5.49233 8.75 5.49233H11C11.8285 5.49233 12.5 4.82078 12.5 3.99233V1.74232C12.5 0.913897 11.8285 0.242325 11 0.242325H8.75ZM8.75 6.99232C7.92155 6.99232 7.25 7.66387 7.25 8.49232V10.7423C7.25 11.5708 7.92155 12.2423 8.75 12.2423H11C11.8285 12.2423 12.5 11.5708 12.5 10.7423V8.49232C12.5 7.66387 11.8285 6.99232 11 6.99232H8.75ZM0.5 8.49232C0.5 7.66387 1.17157 6.99232 2 6.99232H4.25C5.07845 6.99232 5.75 7.66387 5.75 8.49232V10.7423C5.75 11.5708 5.07845 12.2423 4.25 12.2423H2C1.17157 12.2423 0.5 11.5708 0.5 10.7423V8.49232ZM2 0.242325C1.17157 0.242325 0.5 0.913897 0.5 1.74232V3.99233C0.5 4.82078 1.17157 5.49233 2 5.49233H4.25C5.07845 5.49233 5.75 4.82078 5.75 3.99233V1.74232C5.75 0.913897 5.07845 0.242325 4.25 0.242325H2Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              className="join-item btn btn-square btn-outline"
              onClick={() => setMapOpened(!mapOpened)}
            >
              {mapOpened ? <MapIconSolid className="w-4" /> : <MapIcon className="w-4" />}
            </button>
          </div>
        </div>
      </div>
      {mapOpened && <Map markers={agents} />}
    </div>
  );
};
export default AgentFilters;
