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

type PanelOneProps = {
  userExists: boolean;
  register: any;
  errors: any;
};

const PanelOne = ({ userExists, register, errors }: PanelOneProps) => {
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
  // for now return a div with centered text saying Coming Soon!
  // return (
  //   <div className="font-2xl flex min-h-screen items-center justify-center px-4 py-12 text-2xl font-bold sm:px-6 lg:px-8">
  //     Coming Soon!
  //   </div>
  // );

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-4xl font-bold text-black">
          Sign Up
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {currentPanel === 0 && <PanelZero />}
          {currentPanel === 1 && (
            <PanelOne userExists errors={errors} register={register} />
          )}
          <div>
            {currentPanel === 5 ? (
              <Button type="submit" className=" w-full bg-green">
                Submit
              </Button>
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
