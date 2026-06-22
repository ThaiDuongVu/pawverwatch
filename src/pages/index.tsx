import Link from "next/link";
import NavBar from "@/components/navbar";
import Header from "@/components/header";
import DefaultHead from "@/components/default-head";

const Home = () => {
  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="home" />
      <br />
      <div className="container text-center">
        <Header />
        <hr />
        <h5>Here are some examples:</h5>
        <hr />
        <p>I&apos;ve seen enough, let&apos;s
          <span><Link type="button" className="btn btn-primary ms-2" href="/edit">Edit</Link></span>
        </p>
      </div>
    </div>
  );
}

export default Home;
