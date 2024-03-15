import { useState } from "react";
import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import TextInput from "~~/components/inputs/TextInput";
import { DeedInfoModel, PropertyDetailsModel } from "~~/models/deed-info.model";
import { LightChangeEvent } from "~~/models/light-change-event";

interface Props {
  propertyDetail: PropertyDetailsModel;
  isOwner: boolean;
  isValidator: boolean;
  onChange?: (ev: LightChangeEvent<DeedInfoModel>) => void;
  refresh: () => void;
  onSave: () => void;
}

const PropertyDetails = ({
  propertyDetail,
  isOwner,
  isValidator,
  onChange,
  refresh,
  onSave,
}: Props) => {
  const [viewMode, setViewMode] = useState(true);
  const handleChange = (ev: LightChangeEvent<PropertyDetailsModel>) => {
    const updatedValue = { ...propertyDetail, [ev.name]: ev.value };
    onChange?.({
      name: "propertyDetails",
      value: updatedValue,
    });
  };

  const handleViewModeToggle = () => {
    setViewMode(isViewMode => {
      if (!isViewMode) {
        onSave();
      }
      return !isViewMode;
    });
  };

  return (
    <>
      {propertyDetail && (
        <div className="border-2">
          <div className="flex flex-row justify-between items-center px-2 pt-2">
            <div className="pl-4">Property Details</div>
            {(isOwner || isValidator) && (
              <button className="btn btn-link" onClick={handleViewModeToggle}>
                {viewMode ? (
                  <PencilIcon className="w-4" />
                ) : (
                  <CheckIcon className="w-4"></CheckIcon>
                )}
              </button>
            )}
          </div>
          <div className="flex flex-row justify-between w-full gap-6 p-6 flex-wrap">
            {/* First col */}
            <div className="flex flex-col flex-grow gap-4">
              <div className="flex flex-row gap-2 items-center">
                <div className="text-secondary w-1/2">Bed / Bath: </div>
                <div className="">
                  {viewMode ? (
                    <>
                      <TextInput
                        className="input-sm"
                        name="propertyBedrooms"
                        value={`${propertyDetail.propertyBedrooms ?? 0} Bed / ${
                          propertyDetail.propertyBathrooms ?? 0
                        } Bath`}
                        placeholder="0"
                        onChange={handleChange}
                        readOnly
                      ></TextInput>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <TextInput
                        className="input-sm"
                        name="propertyBedrooms"
                        value={propertyDetail.propertyBedrooms}
                        placeholder="0"
                        onChange={handleChange}
                      ></TextInput>
                      <TextInput
                        className="input-sm"
                        name="propertyBathrooms"
                        value={propertyDetail.propertyBathrooms}
                        placeholder="0"
                        onChange={handleChange}
                      ></TextInput>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="text-secondary w-1/2">Lot size:</div>
                <TextInput
                  className="input-sm"
                  name="propertySize"
                  value={propertyDetail.propertySize}
                  readOnly={viewMode}
                  onChange={handleChange}
                ></TextInput>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="text-secondary w-1/2">Square footage:</div>
                <TextInput
                  className="input-sm"
                  name="propertySquareFootage"
                  value={propertyDetail.propertySquareFootage}
                  readOnly={viewMode}
                  onChange={handleChange}
                ></TextInput>
              </div>
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex flex-row gap-2 items-center">
                <div className="text-secondary w-1/2">Build Year:</div>
                <TextInput
                  className="input-sm"
                  name="propertyBuildYear"
                  value={propertyDetail.propertyBuildYear}
                  readOnly={viewMode}
                  onChange={handleChange}
                ></TextInput>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="text-secondary w-1/2">Location:</div>
                <TextInput
                  className="input-sm"
                  name="propertyCity"
                  value={propertyDetail.propertyCity}
                  readOnly={viewMode}
                  onChange={handleChange}
                ></TextInput>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="text-secondary w-1/2">Property Type:</div>
                <TextInput
                  className="input-sm"
                  name="propertyHouseType"
                  value={propertyDetail.propertyHouseType}
                  readOnly={viewMode}
                  onChange={handleChange}
                ></TextInput>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <button className="btn btn-link no-underline font-normal text-secondary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2054_765)">
                  <path
                    d="M9 17.5C13.6944 17.5 17.5 13.6944 17.5 9C17.5 4.30558 13.6944 0.5 9 0.5C4.30558 0.5 0.5 4.30558 0.5 9C0.5 13.6944 4.30558 17.5 9 17.5Z"
                    stroke="#A0A0A0"
                  />
                  <path d="M6.5 7.57227V14.0006" stroke="#A0A0A0" />
                  <path d="M9.19922 5.5V11.9284" stroke="#A0A0A0" />
                  <path d="M11.9004 4V10.4284" stroke="#A0A0A0" />
                </g>
                <defs>
                  <clipPath id="clip0_2054_765">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>MLS Data</div>
            </button>
            <button className="btn btn-link no-underline font-normal text-secondary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2054_776)">
                  <path
                    d="M1.70557 4.78867L8.9998 0.577351L16.294 4.78867V13.2113L8.9998 17.4227L1.70557 13.2113V4.78867Z"
                    stroke="#A0A0A0"
                  />
                  <path
                    d="M5.16992 11.2113V6.78863L9.00005 4.5773L12.8302 6.78863V11.2113L9.00005 13.4226L5.16992 11.2113Z"
                    stroke="#A0A0A0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2054_776">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>Disclosure</div>
            </button>
            <button className="btn btn-link no-underline font-normal text-secondary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2054_786)">
                  <path d="M2 4.5L9 7.5L16 4.5" stroke="#A0A0A0" />
                  <path d="M9 7V17" stroke="#A0A0A0" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 13.8L9 17L2 13.8V4.2L9 1L16 4.2V13.8Z"
                    stroke="#A0A0A0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2054_786">
                    <rect width="16" height="18" fill="white" transform="translate(1)" />
                  </clipPath>
                </defs>
              </svg>
              <div>Proof of title</div>
            </button>
            <button
              className="btn btn-link no-underline font-normal text-secondary"
              onClick={refresh}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.39 9.82125C15.39 13.05 12.6337 15.8062 9.24748 15.8062C5.86123 15.8062 3.10498 13.05 3.10498 9.82125C3.10498 6.51375 5.86123 3.83625 9.24748 3.83625H12.0037"
                  stroke="#A0A0A0"
                  strokeWidth="0.7875"
                />
                <path
                  d="M8.91016 1.15875L12.6902 3.915L8.91016 6.67125"
                  stroke="#A0A0A0"
                  strokeWidth="0.7875"
                />
              </svg>

              <div>Refresh Metadata</div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;