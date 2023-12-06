import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "~/components/DesignSystem/Button";
import Input from "~/components/DesignSystem/Input";
import { api } from "~/utils/api";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const SignUp = () => {
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
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-bold text-black">
            Sign Up
          </h2>
          <p className="font-md mt-2 text-center text-black">
            Please create an account to use Blackbox.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                <p className="text-xs italic text-red-500">
                  {errors.email.message}
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
            {userExists && (
              <p className="px-2 text-red-600">This user already exists.</p>
            )}
          </div>
          <div>
            <Button type="submit" className=" w-full">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <a href="/signin" className="hover:text-purple text-sm text-gray-700">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
