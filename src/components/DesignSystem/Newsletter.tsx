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
    <div className="flex flex-col space-y-8">
      <h1 className="text-center text-2xl font-bold">
        Sign up to be notified when registration goes live.
      </h1>
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
