import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Stage } from "konva/lib/Stage";
import { Layer } from "konva/lib/Layer";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as KonvaStage, Layer as KonvaLayer, Image as KonvaImage } from "react-konva";
import ImageItem, { ImageProp } from "./image-item";
import HeroModal from "./hero-modal";
import MapModal from "./map-modal";
import { downloadFromURI } from "@/helper";
import useImage from "use-image";
import { showToast } from "@/helper";
import Toast from "@/components/toast";
import { FAVORITES_KEY } from "@/pages/favorites";

interface PlaygroundProps {
  baseImageURL: string
}

interface HeroData {
  id: string,
  name: string,
  img: string,
  items: []
}

interface ModeData {
  name: string,
  id: string,
  img: string,
  maps: []
}

const DEFAULT_EXPORT_NAME = "paw";

const Playground = ({ baseImageURL }: PlaygroundProps) => {
  /* eslint-disable */
  let bootstrap = useState(null);
  useEffect(() => {
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  });

  const stageRef = useRef<Stage>(null);
  const backgroundLayerRef = useRef<Layer>(null);
  const imageLayerRef = useRef<Layer>(null);
  const containerRef = useRef(null);

  // #region Handle image exporting/downloading

  const handleExport = () => {
    if (!stageRef.current) return;
    setSelectedId(null);
    const uri = stageRef.current.toDataURL();
    downloadFromURI(uri, `${exportName === "" ? DEFAULT_EXPORT_NAME : exportName}.png`);
  }
  const [exportName, setExportName] = useState("");

  //#endregion

  // #region Handle stage size

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

  //#endregion

  // #region Handle image operations

  const initImages: ImageProp[] = [
    // Always start with the base image
    {
      src: baseImageURL,
      x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0,
      id: "baseImg"
    }
  ];
  const [images, setImages] = useState<ImageProp[]>(initImages);
  const addImage = (image: ImageProp) => {
    setImages([...images, image]);
  }
  const deleteImage = (id: string | null) => {
    // Do not delete base image
    if (!id || id === "baseImg") return;
    setImages(images.filter(img => img.id != id));
  }

  //#endregion

  // #region Handle item selection

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 });
  const [selectedScale, setSelectedScale] = useState({ scaleX: 1, scaleY: 1 });
  const [selectedRotation, setSelectedRotation] = useState(0);
  const checkDeselect = (event: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    // Deselect when clicked on empty area
    const clickedOnEmpty = event.target === event.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
      setSelectedSrc("");
      setSelectedPosition({ x: 0, y: 0 });
      setSelectedScale({ scaleX: 1, scaleY: 1 });
      setSelectedRotation(0);
    }
  };

  //#endregion

  // #region Fetch hero data from JSON

  const [heroData, setHeroData] = useState<HeroData[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/data/heroes.json", { signal: controller.signal });
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        if (error instanceof Error)
          console.error(error.message);
      }
    };
    fetchHeroData();
    return () => { controller.abort(); }
  }, []);
  const [itemCount, setItemCount] = useState(0);
  const heroButtonsDisplay = () => {
    return (
      <div className="w-75 mx-auto">
        <p><strong>Heroes</strong></p>
        {
          heroData.map((hero) => {
            return (
              <div key={hero.name}>
                <button type="button" className="btn btn-secondary p-1 m-1" title={`${hero.name}`} data-bs-toggle="modal" data-bs-target={`#${hero.id}Modal`}>
                  <Image className="img-fluid rounded" src={`${hero.img}`} alt={`${hero.name}`} width={75} height={75} loading="lazy" />
                </button>
                <HeroModal
                  id={`${hero.id}Modal`}
                  name={hero.name}
                  icon={hero.img}
                  items={hero.items}
                  onItemClicked={(item) => {
                    addImage({
                      src: item,
                      x: 0, y: 0,
                      scaleX: 1, scaleY: 1,
                      rotation: 0,
                      id: `item${itemCount}`
                    });
                    setItemCount(itemCount + 1);
                  }}
                />
                <br />
              </div>
            );
          })
        }
      </div>
    );
  }

  // #endregion

  // #region Fetch map data from JSON

  const [modeData, setModeData] = useState<ModeData[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/data/modes.json", { signal: controller.signal });
        const data = await response.json();
        setModeData(data);
      } catch (error) {
        if (error instanceof Error)
          console.error(error.message);
      }
    };
    fetchHeroData();
    return () => { controller.abort(); }
  }, []);
  const [backgroundSrc, setBackgroundSrc] = useState("");
  const [background] = useImage(backgroundSrc, "anonymous");
  const mapButtonsDisplay = () => {
    return (
      <div className="mx-auto">
        <p><strong>Maps</strong></p>
        {
          modeData.map((mode) => {
            return (
              <div key={mode.id}>
                <button type="button" className="w-75 btn btn-info p-1 m-1" title={`${mode.name}`} data-bs-toggle="modal" data-bs-target={`#${mode.id}Modal`}>
                  <Image className="img-fluid rounded" src={`${mode.img}`} alt={`${mode.name}`} width={40} height={40} loading="lazy" />
                  <br />
                  {mode.name}
                </button>
                <MapModal
                  id={`${mode.id}Modal`}
                  name={mode.name}
                  icon={mode.img}
                  maps={mode.maps}
                  onMapClicked={(map) => { setBackgroundSrc(map) }}
                />
                <br />
              </div>
            );
          })
        }
        {/* No background */}
        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={() => { setBackgroundSrc("") }}>
          None <i className="bi bi-ban-fill ms-1"></i>
        </button>
      </div>
    );
  }

  // #endregion

  // #region Add edit to favorites

  const saveToFavorites = () => {
    if (!stageRef.current) return;

    // Save to local storage
    setSelectedId(null);
    const uri = stageRef.current.toDataURL();
    const favorites = localStorage.getItem(FAVORITES_KEY) ?? "";
    localStorage.setItem(FAVORITES_KEY, `${favorites};${uri}`);

    // Show message
    showToast(bootstrap, "savedToast");
  };

  // #endregion

  return (
    <div>
      {/* Main edit display */}
      <div className="row vh-80">
        <div className="col-1 text-center h-100 overflow-auto">
          {/* Hero buttons */}
          {heroButtonsDisplay()}
        </div>
        <div className="col-1 text-center h-100 overflow-auto">
          {/* Maps buttons */}
          {mapButtonsDisplay()}
        </div>
        <div className="col-7 border border-warning border-4 rounded bg-body-secondary" ref={containerRef}>
          <KonvaStage ref={stageRef} width={dimensions.width} height={dimensions.height} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
            {/* Draw background */}
            <KonvaLayer ref={backgroundLayerRef}>
              <KonvaImage
                image={background}
                x={0}
                y={0}
                width={dimensions.width}
                height={dimensions.height}
                listening={false}
                draggable={false}
              />
            </KonvaLayer>
            {/* Draw all images in array */}
            <KonvaLayer ref={imageLayerRef}>
              {
                images.map((img, index) => {
                  return <ImageItem
                    key={index}
                    src={img.src}
                    alt="Image"
                    imgProps={img}
                    isSelected={selectedId === img.id}
                    onSelect={(x, y, scaleX, scaleY, rotation) => {
                      setSelectedId(img.id);
                      setSelectedSrc(img.src);
                      setSelectedPosition({ x, y });
                      setSelectedScale({ scaleX, scaleY });
                      setSelectedRotation(rotation);
                    }}
                    onChange={(newImg: ImageProp) => {
                      const imgs = images.slice();
                      imgs[index] = newImg;
                      setImages(imgs);
                      setSelectedPosition({ x: newImg.x, y: newImg.y });
                      setSelectedScale({ scaleX: newImg.scaleX, scaleY: newImg.scaleY });
                      setSelectedRotation(newImg.rotation);
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
            <br />
            <div className="text-center">
              {/* Flip horizontal button */}
              <button
                type="button"
                className="btn btn-secondary m-1"
                disabled={selectedId == null}
                onClick={() => {
                  const imgs = images.slice();
                  const index = images.findIndex(img => img.id === selectedId);
                  imgs[index] = {
                    ...imgs[index],
                    scaleX: -imgs[index].scaleX
                  };
                  setImages(imgs);
                }}>
                Flip horizontal <i className="bi bi-arrow-left-right ms-1"></i>
              </button>
              {/* Flip vertical button */}
              <button
                type="button"
                className="btn btn-secondary m-1"
                disabled={selectedId == null}
                onClick={() => {
                  const imgs = images.slice();
                  const index = images.findIndex(img => img.id === selectedId);
                  imgs[index] = {
                    ...imgs[index],
                    scaleY: -imgs[index].scaleY
                  };
                  setImages(imgs);
                }}>
                Flip vertical <i className="bi bi-arrow-down-up ms-1"></i>
              </button>
              {/* Bring to front button */}
              <button
                type="button"
                className="btn btn-secondary m-1"
                disabled={selectedId == null}
                onClick={() => {
                  const imgs = images.slice();
                  const index = images.findIndex(img => img.id === selectedId);
                  if (index >= imgs.length - 1) return;
                  [imgs[index], imgs[index + 1]] = [imgs[index + 1], imgs[index]];
                  setImages(imgs);
                }}>
                Bring forward <i className="bi bi-front ms-1"></i>
              </button>
              {/* Bring to back button */}
              <button
                type="button"
                className="btn btn-secondary m-1"
                disabled={selectedId == null}
                onClick={() => {
                  const imgs = images.slice();
                  const index = images.findIndex(img => img.id === selectedId);
                  if (index <= 0) return;
                  [imgs[index], imgs[index - 1]] = [imgs[index - 1], imgs[index]];
                  setImages(imgs);
                }}>
                Bring backward <i className="bi bi-back ms-1"></i>
              </button>
              {/* Reset button */}
              <button
                type="button"
                className="btn btn-secondary m-1"
                disabled={selectedId == null}
                onClick={() => {
                  const imgs = images.slice();
                  const index = images.findIndex(img => img.id === selectedId);
                  imgs[index] = {
                    ...imgs[index],
                    x: 0, y: 0,
                    scaleX: 1, scaleY: 1,
                    rotation: 0
                  };
                  setImages(imgs);
                }}>
                Reset <i className="bi bi-arrow-counterclockwise ms-1"></i>
              </button>
              {/* Duplicate button */}
              <button
                type="button"
                className="btn btn-secondary m-1"
                disabled={selectedId == null || selectedId == "baseImg"}
                onClick={() => {
                  if (!selectedId || !selectedSrc) return;
                  addImage({
                    src: selectedSrc,
                    x: selectedPosition.x + 50, y: selectedPosition.y + 50,
                    scaleX: selectedScale.scaleX, scaleY: selectedScale.scaleY,
                    rotation: selectedRotation,
                    id: `item${itemCount}`
                  });
                  setItemCount(itemCount + 1);
                }}>
                Duplicate <i className="bi bi-copy ms-1"></i>
              </button>
              {/* Delete button */}
              <button
                type="button"
                className="btn btn-secondary m-1"
                disabled={selectedId == null || selectedId == "baseImg"}
                onClick={() => { deleteImage(selectedId) }}>
                Delete <i className="bi bi-trash-fill text-danger ms-1"></i>
              </button>
            </div>
            <hr />
          </div>
          {/* Exporting */}
          <div className="w-75 mx-auto">
            <strong>Exporting</strong>
            <input
              type="text"
              className="form-control"
              id="imgNameInput"
              aria-describedby="imgNameHelp"
              value={exportName}
              onChange={(event) => { setExportName(event.target.value) }}
              placeholder="paw" />
            <div id="imgNameHelp" className="form-text">Name your edit before saving</div>
            <br />
            <div className="text-center">
              {/* Save button */}
              <button
                type="button"
                className="btn btn-primary m-1"
                onClick={saveToFavorites}
              >
                Save <i className="bi bi-bookmark-fill ms-1"></i>
              </button>
              {/* Download button */}
              <button
                type="button"
                className="btn btn-success m-1"
                onClick={handleExport}>
                Download <i className="bi bi-cloud-arrow-down-fill ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast id="savedToast" header="Saved!" message="Image added to favorites" />
    </div>
  );
};

export default Playground;