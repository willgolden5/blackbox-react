import Input from "../DesignSystem/Input";
import { PanelProps } from "./types";

const PanelThree = ({ register, errors }: PanelProps) => {
  return (
    <div className="w-full max-w-md space-y-2">
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

export default PanelThree;
