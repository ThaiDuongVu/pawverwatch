import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Placeholder from "@/components/placeholder";

const Demo = () => {
  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="demo" />
      <br />

      <div className="container text-center">
        <Placeholder />
      </div>
    </div>
  );
}

export default Demo;
