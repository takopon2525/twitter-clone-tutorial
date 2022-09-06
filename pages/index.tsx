import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Twitter Clone Tutorial Apps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed />
    </div>
  );
};

export default Home;
