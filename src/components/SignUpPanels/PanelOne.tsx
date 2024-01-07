import Input from "../DesignSystem/Input";
import { PanelProps } from "./types";

const PanelOne = ({ userExists, register, errors }: PanelProps) => {
  return (
    <div className="w-full max-w-md space-y-2">
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

export default PanelOne;
