import Link from "next/link";
import OtherInformations from "./OtherInformations";
import OwnerInformation from "./OwnerInformation";
import PropertyDetails from "./PropertyDetails";
import { NextPage } from "next";

const RegistrationForm: NextPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="container pt-10">
      <div className="flex flex-row flex-wrap-reverse gap-8 lg:flex-nowrap lg:justify-evenly w-full px-8 xl:px-32">
        <div className="flex flex-col w-full lg:w-fit">
          <div className="text-3xl font-normal font-['KronaOne']">
            First, we’ll need to <br />
            collect some information
          </div>
          <div className="text-base font-normal font-['Montserrat'] mt-3">
            You’ll need to complete the form below in order to register, transfer and mint the new
            <br />
            Digital Deed that will now represent your property.&nbsp;
            <Link
              className="text-accent"
              href="https://docs.deedprotocol.org/how-it-works/property-registration-guide"
              target="_blank"
            >
              Learn about Property Registration.
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <OwnerInformation />
            <PropertyDetails />
            <OtherInformations />
          </form>
        </div>
        <div className="bg-base-100 p-9 w-full lg:w-96 h-fit relative lg:sticky lg:top-32 lg:max-h-[75vh] overflow-y-auto">
          <div className="text-base font-bold font-['Montserrat'] leading-normal">
            After your registration is validated you’ll be able to:
          </div>
          <div className="flex flex-row gap-2 my-2">
            <div className="h-6 p-3 rounded-full bg-secondary opacity-10 mt-1"></div>
            <div className="flex flex-col">
              <div>Manage your property</div>
              <div className="text-secondary-content">
                Update property details, view earnings, add managers and etc.
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 my-2">
            <div className="h-6 p-3 rounded-full bg-secondary opacity-10 mt-1"></div>
            <div className="flex flex-col">
              <div>Sell or Lease your Property</div>
              <div className="text-secondary-content">
                Accept offers, stage auctions and lease properties all in one place.
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 my-2">
            <div className="h-6 p-3 rounded-full bg-secondary opacity-10 mt-1"></div>
            <div className="flex flex-col">
              <div>Advertise your Property</div>
              <div className="text-secondary-content">
                Customize your pages by adding photos, videos and renderings.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
