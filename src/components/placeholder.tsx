import Image from "next/image";

const Placeholder = () => {
  return (
    <div>
      <h2><strong>Coming soon!</strong></h2>
        <p>Brig is working on it</p>
        <br />
        <Image className="img-fluid w-50" src="/images/brig.png" alt="Working brig" width={512} height={512} loading="eager" />
    </div>
  )
};

export default Placeholder;
