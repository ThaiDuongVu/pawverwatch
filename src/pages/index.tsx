import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/navbar";
import Header from "@/components/header";
import DefaultHead from "@/components/default-head";
import { useEffect, useRef, useState } from "react";
import { randomIntArray } from "@/helper";

const Home = () => {
  // Load example images
  const [exampleIndices, setExampleIndices] = useState<number[]>([]);
  const examplesLoaded = useRef(false);
  useEffect(() => {
    // Only run on first mount or on remount
    if (!examplesLoaded.current) {
      const exampleCount = 4;
      const minExampleIndex = 1;
      const maxExampleIndex = 44;
      setExampleIndices(randomIntArray(exampleCount, minExampleIndex, maxExampleIndex));
    }
    return () => { examplesLoaded.current = true; }
  }, [exampleIndices]);

  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="home" />
      <br />

      <div className="container text-center">
        <Header />
        <hr />

        <h5>Here are some examples:</h5>
        <div>
          <div className="row">
            {
              exampleIndices.map((index) => {
                return (
                  <div className="col" key={`example${index}`}>
                    <Image className="img-fluid rounded border bg-body-secondary" src={`/images/examples/${index}.png`} alt={`Example ${index}`} width={200} height={0} placeholder="blur" blurDataURL="automatic" />
                  </div>
                )
              })
            }
          </div>
        </div>
        <hr />

        <p>I&apos;ve seen enough, let&apos;s
          <span><Link type="button" className="btn btn-warning ms-2" href="/edit">Edit <i className="bi bi-pencil-fill ms-1"></i></Link></span>
        </p>
      </div>
    </div>
  );
}

export default Home;
