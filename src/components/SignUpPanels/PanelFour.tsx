import Input from "../DesignSystem/Input";
import Select from "../DesignSystem/Select";
import { PanelProps } from "./types";

const PanelFour = ({ register, errors }: PanelProps) => {
  return (
    <div className="w-full max-w-md space-y-2">
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

export default PanelFour;
