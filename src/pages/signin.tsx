import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "~/components/DesignSystem/Button";
import Input from "~/components/DesignSystem/Input";
import { useToast } from "~/hooks/useToast";

const SignIn = () => {
  const toast = useToast();
  const router = useRouter();
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
      redirect: false,
    }).then((res) => {
      if (res?.status === 401) {
        toast("Error", "The login you've provided is invalid.", "error");
      }
      if (res?.status === 200) {
        toast(
          "Successful Login! 🎉",
          "It's great to see you again!",
          "success",
        );
        router.push("/");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[95%] max-w-md space-y-8 rounded-md border-2 border-black p-8 text-center font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none md:w-[600px]">
        <div>
          <img src="/logo.png" className="ml-auto mr-auto w-[60%] md:w-[75%]" />
          {/* <p className="text-md mt-2 text-center font-normal text-gray-700">
            Trade like the insiders.
          </p> */}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full space-y-4">
            <div className="w-full ">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="font-xs w-full p-1 pl-2 text-left font-light text-red-600">
                  {/* @ts-ignore */}
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full ">
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="font-xs w-full p-1 pl-2 text-left font-light text-red-600">
                  {/* @ts-ignore */}
                  {errors.password.message}
                </p>
              )}
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
