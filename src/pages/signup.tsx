import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "~/components/DesignSystem/Button";
import Newsletter from "~/components/InterestList";
import { api } from "~/utils/api";
import AboutPanel from "~/components/SignUpPanels/AboutPanel";
import PanelOne from "~/components/SignUpPanels/PanelOne";
import PanelTwo from "~/components/SignUpPanels/PanelTwo";
import PanelThree from "~/components/SignUpPanels/PanelThree";
import PanelFour from "~/components/SignUpPanels/PanelFour";

const DisclosuresPanel = dynamic(
  () => import("../components/SignUpPanels/Agreements"),
  {
    ssr: false,
  },
);

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  streetAddress: string[];
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  taxId: string;
  taxIdType: string;
  countryOfTaxResidence: string;
  fundingSource: string[];
  employmentStatus: string;
  employerName: string;
  employmentPosition: string;
  isControlPerson: boolean;
  isAffiliatedExchangeOrFinra: boolean;
  isPoliticallyExposed: boolean;
  immediateFamilyExposed: boolean;
  customerAgreementConsent: boolean;
}

const SignUp = () => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [userExists, setUserExists] = useState(false);
  const [alpacaCreateIssue, setAlpacaCreateIssue] = useState<boolean>(false); // Default to SSN
  const router = useRouter();
  const { mutateAsync: createUser } = api.user.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    const ipAddressResponse = await fetch("/api/get-ip-address");
    const ipAddressData = await ipAddressResponse.json();
    const ipAddress = ipAddressData.ip;
    const currentDate = new Date().toISOString();

    const alpacaCreateSchema = {
      contact: {
        email_address: formData.email,
        phone_number: formData.phoneNumber,
        street_address: formData.streetAddress,
        unit: formData.streetAddress[1] || "",
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
      },
      identity: {
        tax_id_type: formData.taxIdType,
        given_name: formData.firstName,
        family_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        tax_id: formData.taxId,
        country_of_citizenship: formData.countryOfTaxResidence, // Assuming citizenship is the same as tax residence
        country_of_birth: formData.countryOfTaxResidence, // Assuming birth country is the same as tax residence
        country_of_tax_residence: formData.countryOfTaxResidence,
        funding_source: formData.fundingSource,
      },
      disclosures: {
        is_control_person: formData.isControlPerson,
        is_affiliated_exchange_or_finra: formData.isAffiliatedExchangeOrFinra,
        is_politically_exposed: formData.isPoliticallyExposed,
        immediate_family_exposed: formData.immediateFamilyExposed,
      },
      agreements: [
        {
          agreement: "margin_agreement",
          signed_at: currentDate,
          ip_address: ipAddress,
        },
        {
          agreement: "account_agreement",
          signed_at: currentDate,
          ip_address: ipAddress,
        },
        {
          agreement: "customer_agreement",
          signed_at: currentDate,
          ip_address: ipAddress,
        },
      ],
      enabled_assets: ["us_equity"], // Assuming default asset
    };

    const createResponse = await createUser({
      internal: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
      },
      alpaca: alpacaCreateSchema,
    });

    if (createResponse === "user already exists") {
      setUserExists(true);
      return;
    }
    if (createResponse === "alpaca create error") {
      setAlpacaCreateIssue(true);
      return;
    }

    router.push("/signin");
  };

  if (process.env.NEXT_PUBLIC_REGISTRATION_ENABLED === "true") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center justify-center space-y-2">
          <h2 className="mt-6 text-center text-4xl font-bold text-black">
            Blackbox Account Setup
          </h2>
          <form
            className="flex w-full flex-col items-center justify-center space-y-6 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            {currentPanel === 0 && <AboutPanel />}
            {currentPanel === 1 && (
              <PanelOne
                userExists={userExists}
                errors={errors}
                register={register}
              />
            )}
            {currentPanel === 2 && (
              <PanelTwo
                userExists={userExists}
                errors={errors}
                register={register}
              />
            )}
            {currentPanel === 3 && (
              <PanelThree
                userExists={userExists}
                errors={errors}
                register={register}
              />
            )}
            {currentPanel === 4 && (
              <PanelFour
                userExists={userExists}
                errors={errors}
                register={register}
              />
            )}
            {currentPanel === 5 && (
              <DisclosuresPanel
                control={control}
                errors={errors}
                register={register}
              />
            )}
            <div className="w-full max-w-md">
              {currentPanel === 5 && (
                <div className="flex w-full max-w-md space-x-2">
                  {currentPanel > 0 && (
                    <Button
                      onClick={() => setCurrentPanel(currentPanel - 1)}
                      className=" w-[33%] bg-orange"
                    >
                      Back
                    </Button>
                  )}
                  <Button type="submit" className=" w-full bg-green">
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </form>
          {currentPanel < 5 && (
            <div className="flex w-full max-w-md space-x-2">
              {currentPanel > 0 && (
                <Button
                  onClick={() => setCurrentPanel(currentPanel - 1)}
                  className=" w-[33%] bg-orange"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={() => setCurrentPanel(currentPanel + 1)}
                className=" w-full bg-green"
              >
                Next
              </Button>
            </div>
          )}
          <div className="mt-6 text-center">
            <a
              href="/signin"
              className="text-sm text-gray-700 hover:text-purple"
            >
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="font-2xl flex min-h-screen items-center justify-center px-4 py-12 text-2xl font-bold sm:px-6 lg:px-8">
        <Newsletter />
      </div>
    );
  }
};

export default SignUp;
