import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="mx-auto max-h-screen lg:max-w-6xl">
        <main className="grid grid-cols-9">
          <Sidebar />
          <Component {...pageProps} />
          {/* Widget */}
        </main>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
