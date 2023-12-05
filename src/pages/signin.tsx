import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "~/components/DesignSystem/Button";
import Input from "~/components/DesignSystem/Input";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;
    await signIn("credentials", {
      email,
      password,
      callbackUrl: `/`,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-md border-2 border-black p-8 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-black">
            Blackbox
          </h2>
          <p className="text-md mt-2 text-center text-black">
            Welcome to the Blackbox. Please login to continue.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full space-y-4">
            <div className="w-full ">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div className="w-full ">
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
          </div>

          <div className="w-full">
            <Button className="bg-green w-full" type="submit">
              Login
            </Button>
          </div>
        </form>
        <div className="space-y-4mt-6 flex flex-col text-center">
          <a href="#" className="hover:text-orange text-sm text-gray-700">
            Forgot your password?
          </a>
          <a href="/signup" className="hover:text-purple text-sm text-gray-700">
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
