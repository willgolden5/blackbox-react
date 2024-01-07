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
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-[calc(100% - 2em)] max-w-md space-y-8 rounded-md border-2 border-black p-8 text-center font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
        <div>
          <h1 className="relative text-5xl font-bold">Blackbox</h1>
          <p className="text-md mt-2 text-center font-normal text-gray-700">
            Trade like the wall street pros and state street insiders.
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
            <Button className="w-full bg-purple" type="submit">
              Login
            </Button>
          </div>
        </form>
        <div className="space-y-4mt-6 flex flex-col text-center">
          <a href="#" className="text-sm text-gray-700 hover:text-orange">
            Forgot your password?
          </a>
          <a href="/signup" className="text-sm text-gray-700 hover:text-green">
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
