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
const DEFAULT_EXPORT_NAME = "paw";

const Playground = ({ baseImageURL }: PlaygroundProps) => {
  const stageRef = useRef<Stage>(null);
  const containerRef = useRef(null);

  // Handle image exporting/downloading
  const handleExport = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, `${exportName === "" ? DEFAULT_EXPORT_NAME : exportName}.png`);
  }
  const [exportName, setExportName] = useState("");

  // Handle stage size
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

  // Image array
  const initImages: ImageProp[] = [
    // Always start with the base image
    {
      src: baseImageURL,
      x: 0,
      y: 0,
      id: "baseImg"
    }
  ];
  const [images, setImages] = useState(initImages);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addImage = (image: ImageProp) => {
    setImages([...images, image]);
  }
  const deleteImage = (id: string | null) => {
    // Do not delete base image
    if (!id || id === "baseImg") return;
    setImages(images.filter(img => img.id != id));
  }

  // Handle item selection
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
        <div className="col-1 text-center h-100 overflow-auto">

        </div>
        <div className="col-8 border border-warning border-4 rounded bg-body-secondary" ref={containerRef}>
          <KonvaStage ref={stageRef} width={dimensions.width} height={dimensions.height} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
            <KonvaLayer>
              {
                // Draw all images in array
                images.map((img, index) => {
                  return <ImageItem
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
                    }} />
                })
              }
            </KonvaLayer>
          </KonvaStage>
        </div>
        <div className="col-3 h-100 overflow-auto">
          {/* Side buttons */}
          {/* Operations */}
          <div className="w-75 mx-auto">
            <strong>Operations</strong>
            <div className="text-center">
              <button type="button" className="btn btn-secondary m-1">Reset <i className="bi bi-arrow-counterclockwise ms-1"></i></button>
              <button type="button" className="btn btn-secondary m-1">Duplicate <i className="bi bi-copy ms-1"></i></button>
              <button type="button" className="btn btn-danger m-1" onClick={() => { deleteImage(selectedId) }}>Delete <i className="bi bi-trash-fill ms-1"></i></button>
            </div>
            <hr />
          </div>
          {/* Exporting */}
          <div className="w-75 mx-auto">
            <strong>Exporting</strong>
            <input type="text" className="form-control" id="imgNameInput" aria-describedby="imgNameHelp" value={exportName} onChange={(event) => { setExportName(event.target.value) }} placeholder="paw" />
            <div id="imgNameHelp" className="form-text">Name your edit before saving</div>
            <br />
            <div className="text-center">
              <button type="button" className="btn btn-primary m-1" >Save <i className="bi bi-bookmark-fill ms-1"></i></button>
              <button type="button" className="btn btn-warning m-1" onClick={handleExport}>Download <i className="bi bi-cloud-arrow-down-fill ms-1"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;