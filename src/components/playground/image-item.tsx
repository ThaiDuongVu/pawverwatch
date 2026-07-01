import { Image } from "konva/lib/shapes/Image";
import { Transformer } from "konva/lib/shapes/Transformer";
import { Fragment, useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Transformer as KonvaTransformer } from "react-konva";
import useImage from "use-image";

export interface ImageProp {
  src: string,
  x: number,
  y: number,
  id: string
}

interface ImageItemProps {
  src: string,
  alt?: string | "",
  imgProps: ImageProp,
  isSelected: boolean,
  onSelect: (x: number, y: number) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (newImg: any) => void
}

const ITEM_IMG_SIZE = 200;

const ImageItem = ({ src, alt, imgProps, isSelected, onSelect, onChange }: ImageItemProps) => {
  const [image, imageStatus] = useImage(src);
  const imgRef = useRef<Image>(null);
  const transformerRef = useRef<Transformer>(null);

  //#region Initial size

  const [initSize, setInitSize] = useState({ width: image?.width, height: image?.height });
  useEffect(() => {
    if (!image || imageStatus !== "loaded") return;
    const aspectRatio = image.width / image.height;

    // Set initial size for base image
    if (imgProps.id === "baseImg") {
      const canvasSize = imgRef.current?.getParent()?.getSize();
      if (!canvasSize) return;
      if (image.width < image.height)
        setInitSize({ width: canvasSize.height * aspectRatio, height: canvasSize.height });
      else
        setInitSize({ width: canvasSize.width, height: canvasSize.width * (1 / aspectRatio) });
      return
    }

    // Set initial size for item image
    if (image.width < image.height)
      setInitSize({ width: ITEM_IMG_SIZE * aspectRatio, height: ITEM_IMG_SIZE });
    else
      setInitSize({ width: ITEM_IMG_SIZE, height: ITEM_IMG_SIZE * (1 / aspectRatio) });
  }, [imgProps.id, image, imageStatus]);

  //#endregion

  // Attach transformer manually
  useEffect(() => {
    if (isSelected && imgRef.current) {
      transformerRef.current?.nodes([imgRef.current]);
    }
  }, [isSelected]);

  return (
    <Fragment>
      <KonvaImage
        image={image}
        alt={alt}
        width={initSize.width}
        height={initSize.height}
        onClick={() => {
          const node = imgRef.current;
          if (!node) return;
          onSelect(node.x(), node.y());
        }}
        onTap={() => {
          const node = imgRef.current;
          if (!node) return;
          onSelect(node.x(), node.y());
        }}
        ref={imgRef}
        {...imgProps}
        draggable
        onDragEnd={(event) => {
          onChange({
            ...imgProps,
            x: event.target.x(),
            y: event.target.y()
          })
        }}
        onTransformEnd={() => {
          // Transformer changes the scale of the node
          // but NOT its width or height
          // Reset scale on transform end
          const node = imgRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          // Reset
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...imgProps,
            x: node.x(),
            y: node.y(),
            // Set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <KonvaTransformer
          ref={transformerRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  )
};

export default ImageItem;