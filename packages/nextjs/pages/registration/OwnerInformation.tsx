import React from "react";
import Link from "next/link";
import { FileUploaderInput } from "~~/components/inputs/FileUploaderInput";
import { RadioBoxesInput } from "~~/components/inputs/RadioBoxesInput";
import { SelectInput } from "~~/components/inputs/SelectInput";
import TextInput from "~~/components/inputs/TextInput";
import { EntityTypeOptions, OwnerTypeOptions } from "~~/constants";
import { DeedInfoModel, OwnerInformationModel } from "~~/models/deed-info.model";
import { LightChangeEvent } from "~~/models/light-change-event";

interface Props {
  value?: OwnerInformationModel;
  onChange?: (ev: LightChangeEvent<DeedInfoModel>) => void;
  readOnly?: boolean;
}

const OwnerInformation = ({ value, onChange, readOnly }: Props) => {
  const handleChange = (ev: LightChangeEvent<OwnerInformationModel>) => {
    const updatedValue = { ...value, [ev.name]: ev.value };
    onChange?.({ name: "ownerInformation", value: updatedValue });
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="text-2xl font-['KronaOne'] leading-10">1. Owner Information</div>
      <RadioBoxesInput
        name="ownerType"
        options={OwnerTypeOptions}
        optionsClassName="w-[180px] h-[180px]"
        label="Current Owner Type"
        info
        onChange={handleChange}
        value={value?.ownerType}
        readOnly={readOnly}
      ></RadioBoxesInput>
      <div className="flex flex-row flex-wrap gap-3 justify-start w-full">
        {value?.ownerType === "legal" && (
          <TextInput
            name="entityName"
            label="Entity Name"
            info
            placeholder="e.g. My Business Name, LLC."
            value={value?.entityName}
            onChange={handleChange}
            readOnly={readOnly}
          />
        )}
        <TextInput
          name="ownerName"
          label="First & Last Name"
          info
          placeholder="e.g. Johnny Appleseed"
          value={value?.ownerName}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <TextInput
          name="ownerSuffix"
          label="Suffix"
          optional
          placeholder="e.g. Jr. or Sr."
          value={value?.ownerSuffix}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </div>
      {value?.ownerType === "legal" && (
        <div className="flex flex-row flex-wrap gap-3 justify-start w-full">
          <TextInput
            name="ownerPosition"
            label="Position"
            placeholder="e.g. CEO"
            value={value?.ownerPosition}
            onChange={handleChange}
            readOnly={readOnly}
          />
          <SelectInput
            name="ownerEntityType"
            label="Entity Type"
            options={EntityTypeOptions}
            placeholder="e.g. LLC, Corporation, etc."
            value={value?.ownerEntityType}
            onChange={handleChange}
            readOnly={readOnly}
          />
        </div>
      )}
      <div className="mt-8">
        <label className="justify-start items-center inline-flex mb-3">
          <div className="text-base font-bold font-['Montserrat']">Identity Verification</div>
          <span className="text-center text-xs font-normal font-['Inter'] leading-none ml-1">
            info
          </span>
        </label>
        <div>
          <Link
            className="link link-accent"
            href="https://docs.deedprotocol.org/legal-framework/identity-verification#organizations-traditional-or-hybrid"
            target="_blank"
          >
            Learn more
          </Link>
          &nbsp;about Identity Verification.
        </div>
        <FileUploaderInput
          name="ids"
          label="ID or Passport"
          subtitle="This document is submited securely off-chain."
          value={value?.ids}
          onChange={handleChange}
          readOnly={readOnly}
          isRestricted={true}
        />
        <FileUploaderInput
          name="proofBill"
          label="Utility Bill or Other Document"
          subtitle="This document is submited securely off-chain."
          optional
          value={value?.proofBill}
          onChange={handleChange}
          readOnly={readOnly}
          isRestricted={true}
        />
      </div>
      <div className="mt-8">
        <label className="justify-start items-center inline-flex mb-3">
          <div className="text-base font-bold font-['Montserrat']">Entity Verification</div>
          <span className="text-center text-xs font-normal font-['Inter'] leading-none ml-1">
            info
          </span>
        </label>
        <div>
          <Link
            className="link link-accent"
            href="https://docs.deedprotocol.org/legal-framework/identity-verification"
            target="_blank"
          >
            Learn more
          </Link>
          &nbsp;about Entity Verification.
        </div>
        <FileUploaderInput
          name="articleIncorporation"
          label="Articles of Incorporation"
          subtitle="This document is submited securely off-chain."
          value={value?.articleIncorporation}
          onChange={handleChange}
          readOnly={readOnly}
          isRestricted={true}
        />
        <FileUploaderInput
          name="operatingAgreement"
          label="Operating Agreement"
          subtitle="This document is submited securely off-chain."
          optional
          value={value?.operatingAgreement}
          onChange={handleChange}
          readOnly={readOnly}
          isRestricted={true}
        />
        <FileUploaderInput
          name="supportingDoc"
          label="Any other Supporting Documents"
          subtitle="This document is submited securely off-chain."
          optional
          multiple
          value={value?.supportingDoc}
          onChange={handleChange}
          readOnly={readOnly}
          isRestricted={true}
        />
      </div>
    </div>
  );
};

export default OwnerInformation;