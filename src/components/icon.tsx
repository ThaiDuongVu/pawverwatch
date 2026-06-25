import Image from "next/image";

interface IconProps {
  size: number;
}

const Icon = ({size}: IconProps) => {
  return <Image className="img-fluid rounded ms-2" src="/icon/icon.png" alt="Icon" width={size} height={size} />
};

export default Icon;
