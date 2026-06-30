import Image from "next/image";
import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";

const Custom404 = () => {
  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="" />
      <br />

      <div className="container text-center">
        <h2><strong>404: Fika ate this page!</strong></h2>
        <p>Naughty fat cat</p>
        <br />
        <Image className="img-fluid w-25" src={"/images/404-cat.png"} alt="404 cat" width={512} height={512} loading="eager" />
      </div>
    </div>
  )
};

export default Custom404;