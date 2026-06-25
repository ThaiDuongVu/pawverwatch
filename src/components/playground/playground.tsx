import { Stage } from "konva/lib/Stage";
import { Stage as KonvaStage, Layer as KonvaLayer } from "react-konva";
import { useEffect, useState, useRef } from "react";
import ImageItem from "./image-item";
import { KonvaEventObject } from "konva/lib/Node";
import { downloadURI } from "@/helper";

interface PlaygroundProps {
  baseImageURL: string
}

interface ImageProp {
  src: string,
  x: number,
  y: number,
  id: string
}

const Playground = ({ baseImageURL }: PlaygroundProps) => {
  const stageRef = useRef<Stage>(null);
  const handleExport = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, `${exportName}.png`);
  }
  const [exportName, setExportName] = useState("paw");

  // Handle stage size
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
  const initImages: ImageProp[] = [
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
    <div>
      {/* Main edit display */}
      <div className="row vh-75">
        <div className="col-1"></div>
        <div className="col-8 border border-warning border-4 rounded" ref={containerRef}>
          <KonvaStage ref={stageRef} width={dimensions.width} height={dimensions.height} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
            <KonvaLayer>
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
            </KonvaLayer>
          </KonvaStage>
        </div>
        <div className="col-3">
          {/* Tertiary elements */}
          <form className="w-75 mx-auto">
            <label htmlFor="imgNameInput" className="form-label"><strong>Name</strong></label>
            <input type="text" className="form-control" id="imgNameInput" aria-describedby="imgNameHelp" value={exportName} onChange={(event) => {setExportName(event.target.value)}}/>
            <div id="imgNameHelp" className="form-text">Name your edit before saving</div>
            <hr />

            <div className="text-center">
              <button type="button" className="btn btn-danger me-1">Save <i className="bi bi-heart-fill ms-1"></i></button>
              <button type="button" className="btn btn-warning ms-1" onClick={handleExport}>Download <i className="bi bi-cloud-arrow-down-fill ms-1"></i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Playground;