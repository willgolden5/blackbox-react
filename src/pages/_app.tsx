import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ToastProvider } from "~/components/Toast/ToastContext";
import ToastContainer from "~/components/Toast/ToastContainer";
import Head from "next/head";
import Navbar from "~/components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <Head>
          <title>Blackbox</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Analytics />
        <ToastContainer />
      </ToastProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
