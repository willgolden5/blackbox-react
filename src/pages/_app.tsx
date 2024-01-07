import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ToastProvider } from "~/components/Toast/ToastContext";
import ToastContainer from "~/components/Toast/ToastContainer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <Component {...pageProps} />
        <Analytics />
        <ToastContainer />
      </ToastProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
