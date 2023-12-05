"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Dashboard from "~/components/Dashboard";

import { api } from "~/utils/api";

export default function Home() {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/signin");
  }
  return (
    <>
      <Head>
        <title>Blackbox</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-6">
        <button onClick={() => signOut()}>logout</button>
      </nav>
      <main className=" flex min-h-screen flex-col items-center justify-center">
        <Dashboard />
      </main>
    </>
  );
}
