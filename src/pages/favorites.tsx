import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";

const Favorites = () => {
  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="favorites" />
      <br />

      <div className="container text-center">
      </div>
    </div>
  );
}

export default Favorites;
