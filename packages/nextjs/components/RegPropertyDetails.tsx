import React from "react";
import Link from "next/link";
import { FileUploaderInput } from "~~/components/inputs/FileUploaderInput";
import { RadioBoxesInput } from "~~/components/inputs/RadioBoxesInput";
import { SelectInput } from "~~/components/inputs/SelectInput";
import TextInput from "~~/components/inputs/TextInput";
import {
  PropertySubtypeOptions,
  PropertyTypeOptions,
  PropertyZoningOptions,
  StateOptions,
} from "~~/constants";
import { DeedInfoModel, PropertyDetailsModel } from "~~/models/deed-info.model";
import { LightChangeEvent } from "~~/models/light-change-event";

interface Props {
  value?: PropertyDetailsModel;
  onChange?: (ev: LightChangeEvent<DeedInfoModel>) => void;
  readOnly?: boolean;
  isDraft?: boolean;
}

const PropertyDetails = ({ value, onChange, readOnly, isDraft = false }: Props) => {
  const handleChange = (ev: LightChangeEvent<PropertyDetailsModel>) => {
    const updatedValue = { ...value, [ev.name]: ev.value };
    onChange?.({
      name: "propertyDetails",
      value: updatedValue,
    });
  };
  return (
    <div className="flex flex-col mt-6 gap-6">
      <div className="text-4xl font-['Coolvetica'] font-condensed uppercase">
        2. Property Details
      </div>
      <RadioBoxesInput
        name="propertyType"
        label="Select Property Type"
        description={
          <>
            <Link
              href="https://docs.deedprotocol.org/how-it-works/property-registration-guide#step-2-submit-property-details"
              target="_blank"
            >
              Learn more
            </Link>
            &nbsp; about Property Types.
          </>
        }
        info
        options={PropertyTypeOptions}
        optionsClassName="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 items-start justify-start"
        onChange={handleChange}
        value={value?.propertyType}
        readOnly={readOnly}
      />
      <div className="flex flex-row flex-wrap gap-3 justify-start w-full">
        <TextInput
          name="propertyAddress"
          label="APN #, Street Address and Zip Code"
          info
          placeholder="e.g. 123 Main Street, US 92346"
          value={value?.propertyAddress}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <TextInput
          name="propertyCity"
          label="City or Region"
          placeholder="e.g. San Bernardino"
          value={value?.propertyCity}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <SelectInput
          name="propertyState"
          label="State or Region"
          placeholder="Select State"
          options={StateOptions}
          value={value?.propertyState}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-5 justify-start w-full">
        <TextInput
          name="propertySize"
          label="Lot Size"
          optional
          placeholder="e.g. 3500 sqft"
          value={value?.propertySize}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <SelectInput
          name="propertySubType"
          label="Sub-Type"
          options={PropertySubtypeOptions}
          optional
          placeholder="Select Sub-Type"
          value={value?.propertySubType}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <SelectInput
          name="propertyZoning"
          label="Zoning"
          optional
          options={PropertyZoningOptions}
          placeholder="Select Zoning"
          value={value?.propertyZoning}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </div>
      <div>
        <div className="justify-start items-center inline-flex mt-3">
          <div className="text-base font-bold leading-normal">Property Image</div>
          <div className="text-center text-xs font-['Inter'] leading-none ml-1">info</div>
        </div>
        <div className="text-secondary">
          Upload image -&nbsp;
          <Link href="w" target="_blank">
            Learn more
          </Link>
        </div>
        <FileUploaderInput
          name="propertyImages"
          label="Property Image"
          subtitle="You may change this after registering your property"
          optional
          multiple
          value={value?.propertyImages}
          onChange={handleChange}
          readOnly={readOnly}
          isRestricted={isDraft}
        />
      </div>
      <div className="flex flex-col">
        <div className="justify-start items-center inline-flex mt-3">
          <div className="text-base font-bold leading-normal">Proof of Ownership</div>
          <div className="text-center text-xs font-['Inter'] leading-none ml-1">info</div>
        </div>
        <div className="text-secondary">
          <Link
            href="https://docs.deedprotocol.org/how-it-works/property-registration-guide#step-3-provide-proof-of-ownership"
            target="_blank"
          >
            Learn more
          </Link>
          &nbsp;about property ownership validation.
        </div>
        <FileUploaderInput
          name="propertyDeedOrTitle"
          label="Deed or Title"
          subtitle="This document is stored securely on-chain via IPFS."
          value={value?.propertyDeedOrTitle}
          onChange={handleChange}
          readOnly={readOnly}
          isRestricted={true}
        />
        <FileUploaderInput
          name="propertyPurchaseContract"
          label="Purchase Contract"
          subtitle="This document is stored securely on-chain via IPFS."
          optional
          value={value?.propertyPurchaseContract}
          onChange={handleChange}
          readOnly={readOnly}
          isRestricted={true}
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
