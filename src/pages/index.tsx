"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Dashboard from "~/components/Dashboard";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="mt-24 flex flex-col items-center ">
        <Dashboard />
      </div>
    );
  } else if (status === "loading") {
    return (
      <div className="font-2xl flex min-h-screen items-center justify-center px-4 py-12 text-2xl font-bold sm:px-6 lg:px-8">
        Loading...
      </div>
    );
  } else {
    router.push("signin");
  }
}
