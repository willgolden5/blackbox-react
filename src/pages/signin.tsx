import { signIn } from "next-auth/react";

const SignIn = () => {
  const click = async () => {
    signIn("credentials", {
      email: "wtgolden5@gmail.com",
      password: "",
      callbackUrl: "http://localhost:3000",
    });
  };
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        click();
      }}
    >
      Login
    </button>
  );
};

export default SignIn;
