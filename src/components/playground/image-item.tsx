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
  onSelect: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (newImg: any) => void
}

const ImageItem = ({ src, alt, imgProps, isSelected, onSelect, onChange }: ImageItemProps) => {
  const [image, imageStatus] = useImage(src);
  const imgRef = useRef<Image>(null);
  const transformerRef = useRef<Transformer>(null);

  // Set initial size to either match canvas width or height
  const [initSize, setInitSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (imgProps.id !== "baseImg" || !image || imageStatus !== "loaded") return;
    const canvasSize = imgRef.current?.getParent()?.getSize();
    if (!canvasSize) return;
    const aspectRatio = image.width / image.height;
    if (image.width < image.height)
      setInitSize({ width: canvasSize.height * aspectRatio, height: canvasSize.height });
    else
      setInitSize({ width: canvasSize.width, height: canvasSize.width * (1 / aspectRatio) });

  }, [imgProps.id, image, imageStatus]);

  useEffect(() => {
    if (isSelected && imgRef.current) {
      // Attach transformer manually
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
        onClick={onSelect}
        onTap={onSelect}
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