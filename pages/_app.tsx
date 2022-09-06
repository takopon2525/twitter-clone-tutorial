import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import client from "../apollo-client";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import Widget from "../components/WIdget";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <div className="mx-auto max-h-screen lg:max-w-6xl">
          <Toaster />
          <main className="grid grid-cols-9">
            <Sidebar />
            <Component {...pageProps} />
            <Widget />
          </main>
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
