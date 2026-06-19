import Head from "next/head";
import NavBar from "@/components/navbar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Head>
        <title>Pawverwatch</title>
        <meta name="description" content="Turn you pets into Overwatch heroes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export default Home;
