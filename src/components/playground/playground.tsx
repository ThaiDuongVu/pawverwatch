import { Stage, Layer } from "react-konva";
import { useEffect, useState, useRef } from "react";
import ImageItem from "./image-item";
import { KonvaEventObject } from "konva/lib/Node";

interface PlaygroundProps {
  baseImageURL: string
}

const Playground = ({ baseImageURL }: PlaygroundProps) => {
  // Handle window size
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!containerRef.current) return;
    // Monitor container bounds automatically
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Handle item selection
  const initImages = [
    {
      src: baseImageURL,
      x: 0,
      y: 0,
      id: "baseImg"
    },
    {
      src: "/images/404-cat.png",
      x: 200,
      y: 200,
      id: "cat"
    }
  ];
  const [images, setImages] = useState(initImages);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const checkDeselect = (event: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    // Deselect when clicked on empty area
    const clickedOnEmpty = event.target === event.target.getStage();
    if (clickedOnEmpty) setSelectedId(null);
  };

  return (
    <div className="row vh-75">
      <div className="col"></div>
      <div className="col-10 border border-warning border-4 rounded" ref={containerRef}>
        <Stage width={dimensions.width} height={dimensions.height} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
          <Layer>
            {
              // Draw all images in array
              images.map((img, index) => {
                return (
                  <ImageItem
                    key={index}
                    src={img.src}
                    alt="Image"
                    imgProps={img}
                    isSelected={selectedId === img.id}
                    onSelect={() => { setSelectedId(img.id) }}
                    onChange={(newImg: HTMLImageElement) => {
                      const imgs = images.slice();
                      imgs[index] = newImg;
                      setImages(imgs);
                    }}
                  />
                );
              })
            }
          </Layer>
        </Stage>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Playground;