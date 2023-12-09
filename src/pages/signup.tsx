import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "~/components/DesignSystem/Button";
import Input from "~/components/DesignSystem/Input";
import Select from "~/components/DesignSystem/Select";
import { api } from "~/utils/api";

const DisclosuresPanel = dynamic(
  () => import("../components/SignUpPanels/Disclosures"),
  {
    ssr: false,
  },
);

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const PanelZero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-md mt-2 text-center text-black">
        Please create an account to use Blackbox. We use Alpaca.markets under
        the hood as our brokerage partner and will be asking you some questions
        to get you approved for a brokerage account.
      </p>
    </div>
  );
};

type PanelProps = {
  userExists: boolean;
  register: any;
  errors: any;
};

const PanelOne = ({ userExists, register, errors }: PanelProps) => {
  return (
    <div className="space-y-2">
      <div className="p-2">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <Input
          id="firstName"
          type="text"
          required
          placeholder="John"
          {...register("firstName", {
            required: "First name is required",
          })}
        />
        {errors.firstName && (
          <p className="text-xs italic text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div className="p-2">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <Input
          id="lastName"
          type="text"
          required
          placeholder="Doe"
          {...register("lastName", { required: "Last name is required" })}
        />
        {errors.lastName && (
          <p className="text-xs italic text-red-500">
            {errors.lastName.message}
          </p>
        )}
      </div>
      <div className="p-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <Input
          id="email"
          type="email"
          required
          placeholder="john.doe@example.com"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-xs italic text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="p-2">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          required
          placeholder="(555) 555-5555"
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
        />
        {errors.phoneNumber && (
          <p className="text-xs italic text-red-500">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
      <div className="p-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          required
          placeholder="••••••••"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-xs italic text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {userExists && (
        <p className="px-2 text-red-600">This user already exists.</p>
      )}
    </div>
  );
};

const PanelTwo = ({ register, errors }: PanelProps) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 2 }, (_, index) => (
        <div className="p-2" key={index}>
          <label
            htmlFor={`streetAddress${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Street Address {index + 1}
          </label>
          <Input
            id={`streetAddress${index}`}
            type="text"
            {...register(`streetAddress[${index}]`)}
          />
          {errors.streetAddress && errors.streetAddress[index] && (
            <p className="text-xs italic text-red-500">
              {errors.streetAddress[index].message}
            </p>
          )}
        </div>
      ))}
      <div className="p-2">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <Input
          id="city"
          type="text"
          required
          {...register("city", { required: "City is required" })}
        />
        {errors.city && (
          <p className="text-xs italic text-red-500">{errors.city.message}</p>
        )}
      </div>
      <div className="p-2">
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700"
        >
          State
        </label>
        <Input
          id="state"
          type="text"
          required
          {...register("state", { required: "State is required" })}
        />
        {errors.state && (
          <p className="text-xs italic text-red-500">{errors.state.message}</p>
        )}
      </div>
      <div className="p-2">
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium text-gray-700"
        >
          Postal Code
        </label>
        <Input
          id="postalCode"
          type="text"
          required
          {...register("postalCode", { required: "Postal code is required" })}
        />
        {errors.postalCode && (
          <p className="text-xs italic text-red-500">
            {errors.postalCode.message}
          </p>
        )}
      </div>
    </div>
  );
};

const PanelThree = ({ register, errors }: PanelProps) => {
  return (
    <div className="space-y-2">
      <div className="p-2">
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <Input
          id="dateOfBirth"
          type="date"
          required
          {...register("dateOfBirth", {
            required: "Date of birth is required",
          })}
        />
        {errors.dateOfBirth && (
          <p className="text-xs italic text-red-500">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>
      <div className="p-2">
        <label
          htmlFor="taxId"
          className="block text-sm font-medium text-gray-700"
        >
          Social Security Number (SSN)
        </label>
        <Input
          id="taxId"
          type="text"
          required
          {...register("taxId", { required: "SSN is required" })}
        />
        {errors.taxId && (
          <p className="text-xs italic text-red-500">{errors.taxId.message}</p>
        )}
      </div>
      <input type="hidden" value="USA_SSN" {...register("taxIdType")} />
      <input type="hidden" value="USA" {...register("countryOfTaxResidence")} />
      <div className="p-2">
        <label className="block text-sm font-medium text-gray-700">
          Funding Source
        </label>
        {[
          "employment_income",
          "investments",
          "inheritance",
          "business_income",
          "savings",
          "family",
        ].map((source) => (
          <div key={source}>
            <input
              type="checkbox"
              id={source}
              {...register("fundingSource")}
              value={source}
            />
            <label htmlFor={source} className="ml-2 text-sm text-gray-700">
              {source
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const PanelFour = ({ register, errors }: PanelProps) => {
  return (
    <div className="space-y-2">
      {/* ... other fields ... */}

      <div className="p-2">
        <label
          htmlFor="employmentStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Employment Status
        </label>
        <Select
          id="employmentStatus"
          {...register("employmentStatus", {
            required: "Employment status is required",
          })}
          items={[
            { name: "Employed", value: "employed" },
            { name: "Unemployed", value: "unemployed" },
            { name: "Retired", value: "retired" },
            { name: "Student", value: "student" },
          ]}
          className="w-full"
        />
        {errors.employmentStatus && (
          <p className="text-xs italic text-red-500">
            {errors.employmentStatus.message}
          </p>
        )}
      </div>

      {/* Employer Name Field */}
      <div className="p-2">
        <label
          htmlFor="employerName"
          className="block text-sm font-medium text-gray-700"
        >
          Employer Name
        </label>
        <Input id="employerName" type="text" {...register("employerName")} />
      </div>
      <div className="p-2">
        <label
          htmlFor="employmentPosition"
          className="block text-sm font-medium text-gray-700"
        >
          Employment Position
        </label>
        <Input
          id="employmentPosition"
          type="text"
          {...register("employmentPosition")}
        />
      </div>
      <p>Check all that apply:</p>
      <div className="p-2">
        <label htmlFor="isControlPerson" className="flex items-center">
          <input
            type="checkbox"
            id="isControlPerson"
            {...register("isControlPerson")}
          />
          <span className="ml-2 text-sm text-gray-700">
            You hold a controlling position in a publicly traded company.
          </span>
        </label>
      </div>
      <div className="p-2">
        <label
          htmlFor="isAffiliatedExchangeOrFinra"
          className="flex items-center"
        >
          <input
            type="checkbox"
            id="isAffiliatedExchangeOrFinra"
            {...register("isAffiliatedExchangeOrFinra")}
          />
          <span className="ml-2 text-sm text-gray-700">
            You are affiliated with any Financial Exchanges or FINRA.
          </span>
        </label>
      </div>
      <div className="p-2">
        <label htmlFor="isPoliticallyExposed" className="flex items-center">
          <input
            type="checkbox"
            id="isPoliticallyExposed"
            {...register("isPoliticallyExposed")}
          />
          <span className="ml-2 text-sm text-gray-700">
            You are a politically exposed person.
          </span>
        </label>
      </div>
      <div className="p-2">
        <label htmlFor="immediateFamilyExposed" className="flex items-center">
          <input
            type="checkbox"
            id="immediateFamilyExposed"
            {...register("immediateFamilyExposed")}
          />
          <span className="ml-2 text-sm text-gray-700">
            You have an immediate family member that holds a controlling
            position in a publicly traded company or is a politically exposed
            person.
          </span>
        </label>
      </div>
    </div>
  );
};

const SignUp = () => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [userExists, setUserExists] = useState(false);
  const router = useRouter();
  const { mutateAsync: createUser } = api.user.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    const createData = await createUser({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      phone: formData.phoneNumber,
    });
    if (createData === "user already exists") {
      setUserExists(true);
    } else {
      router.push("/signin");
    }
    console.log(createData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-2">
        <h2 className="mt-6 text-center text-4xl font-bold text-black">
          Blackbox Account Setup
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {currentPanel === 0 && <PanelZero />}
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
              userExists={userExists}
              errors={errors}
              register={register}
            />
          )}
          <div>
            {currentPanel === 6 ? (
              <div className="4 flex space-x-2">
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
            ) : (
              <div className="4 flex space-x-2">
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
          </div>
        </form>
        <div className="mt-6 text-center">
          <a href="/signin" className="text-sm text-gray-700 hover:text-purple">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
