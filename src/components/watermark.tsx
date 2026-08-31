import { Text as KonvaText } from "react-konva";

const Watermark = () => {
  return (
    <KonvaText
      x={5}
      y={5}
      align="center"
      text="made with pawverwatch"
      fontSize={15}
      fontFamily="Helvetica"
      fill="white"
    />
  )
};

export default Watermark;