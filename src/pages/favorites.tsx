import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Placeholder from "@/components/placeholder";

const Favorites = () => {
  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="favorites" />
      <br />

      <div className="container text-center">
        <Placeholder />
      </div>
    </div>
  );
}

export default Favorites;
