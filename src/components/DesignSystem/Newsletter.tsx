import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { mutateAsync: signup } = api.user.interestSignup.useMutation();

  const signUpForNewsletter = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await signup({ email });
    if (res.id) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col space-y-6 text-center">
      <h1 className=" z-2 relative text-4xl font-bold">
        Blackbox{" "}
        <span className="absolute bottom-2 right-56 h-[26%] w-[153px] rounded-sm bg-purple opacity-30"></span>
      </h1>
      <p className="text-center text-lg font-light text-gray-700">
        Sign up to be notified when registration goes live.
      </p>
      <form
        onSubmit={signUpForNewsletter}
        className="flex w-min items-center rounded-md border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        role="form"
      >
        <input
          className="w-[30ch] rounded-md p-[10px] outline-none"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button
          className="rounded-e-[5px] border-l-2 border-black bg-[#bc95d4] p-[10px] px-5"
          type="submit"
          aria-label="Submit Newsletter"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
