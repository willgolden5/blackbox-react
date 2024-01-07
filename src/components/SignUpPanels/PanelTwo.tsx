import { stateAbbreviations } from "~/utils/stateToAbbreviation";
import Select from "../DesignSystem/Select";
import Input from "../DesignSystem/Input";
import { PanelProps } from "./types";

const PanelTwo = ({ register, errors }: PanelProps) => {
  return (
    <div className="w-full max-w-md space-y-2">
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
        <Select
          id="state"
          {...register("state", { required: "State is required" })}
          items={Object.entries(stateAbbreviations).map(([name, value]) => ({
            name: value,
            value: name,
          }))}
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

export default PanelTwo;
