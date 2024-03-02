import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "~/components/DesignSystem/Button";
import Newsletter from "~/components/InterestList";
import { api } from "~/utils/api";
import PanelOne from "~/components/SignUpPanels/PanelOne";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
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
    const createResponse = await createUser({
      internal: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
      },
    });

    if (createResponse === "user already exists") {
      setUserExists(true);
      return;
    }

    router.push("/signin");
  };

  if (process.env.NEXT_PUBLIC_REGISTRATION_ENABLED === "true") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center justify-center space-y-2">
          <h2 className="mt-6 text-center text-4xl font-bold text-black">
            Create Account
          </h2>
          <form
            className="flex w-full flex-col items-center justify-center space-y-6 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <PanelOne
              userExists={userExists}
              errors={errors}
              register={register}
            />

            <div className="w-full max-w-md">
              <div className="flex w-full max-w-md space-x-2">
                <Button type="submit" className=" w-full bg-green">
                  Submit
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-6 text-center">
            <a
              href="/signin"
              className="text-sm text-gray-700 hover:text-purple"
            >
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="font-2xl flex min-h-screen items-center justify-center px-4 py-12 text-2xl font-bold sm:px-6 lg:px-8">
        <Newsletter />
      </div>
    );
  }
};

export default SignUp;
