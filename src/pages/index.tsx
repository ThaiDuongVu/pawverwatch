import NavBar from "@/components/navbar";
import Header from "@/components/header";
import DefaultHead from "@/components/default-head";

const Home = () => {
  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="home" />
      <Header />
    </div>
  );
}

export default Home;
