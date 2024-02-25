import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useToast } from "~/hooks/useToast";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();
  const logout = () => {
    toast("👋 Goodbye!", `See you next time ${session?.user.name}.`, "info");
    signOut({ redirect: false });
    router.push("/signin");
  };
  return (
    <nav className="fixed left-0 top-0 z-10 mx-auto flex h-20 w-full items-center border-b-4 border-black bg-white px-5 m500:h-16">
      <div className="mx-auto flex w-full max-w-full items-center justify-between">
        <div
          onClick={() => router.push("/")}
          className="flex cursor-pointer items-center space-x-1 align-middle md:space-x-2"
        >
          <img className="h-[30px] md:h-[50px]" src="/cubeLogo.png" />
          <img className="h-[20px] md:h-[30px]" src="/navLogo.png" />
        </div>
        <div className="flex space-x-8 px-8">
          {session?.user && (
            <>
              <p
                onClick={() => router.push("/strategies")}
                className="flex cursor-pointer items-center justify-center text-xl font-bold m500:text-xl"
              >
                Strategies
              </p>
              <p
                onClick={() => logout()}
                className="flex cursor-pointer items-center justify-center text-xl font-bold m500:text-xl"
              >
                Logout
              </p>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
