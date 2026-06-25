import NavBar from "@/components/navbar";
import Image from "next/image";

const Custom404 = () => {
  return (
    <div>
      <NavBar currentPage="" />
      <br />
      <div className="container text-center">
        <h2><strong>404: Fika ate this page!</strong></h2>
        <h5>Naughty fat cat</h5>
        <br />
        <Image src={"/images/404-cat.png"} alt="404 cat" width={256} height={256} loading="eager" />
      </div>
    </div>
  )
};

export default Custom404;