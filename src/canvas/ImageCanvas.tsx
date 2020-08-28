import * as React from "react";
import {CanvasHTMLAttributes} from "react";
import {SizedImage} from "../color-picker/types";


/**
 * should it create its own ref, or forward a passed-in ref?
 * right now it has its own ref and passes the ref back to the parent by calling onLoad
 */
export type Props = {
    image: SizedImage;
    onLoad: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
} & Omit<CanvasHTMLAttributes<HTMLCanvasElement>, 'onLoad'>

export const ImageCanvas = ({image, onLoad, ...props}: Props) => {

    const canvasRef = React.createRef<HTMLCanvasElement>();

    const onImageReceived = (img: HTMLImageElement) => {
        if (canvasRef.current === null) return;
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null) return;
        ctx.drawImage(img, 0, 0);

        /**
         * need to save the image blob to local storage in order to use getImageData on cross-domain images
         */
        try {
            localStorage.setItem(
                "saved-image-example",
                canvasRef.current.toDataURL("image/png")
            );
            onLoad(ctx, canvasRef.current);
        } catch (err) {
            console.log("Error: " + err);
        }
    };

    React.useEffect(() => {
        const downloadedImg = new Image();
        downloadedImg.crossOrigin = "Anonymous";
        downloadedImg.addEventListener(
            "load",
            (e) => onImageReceived(e.target as HTMLImageElement),
            false
        );
        downloadedImg.src = image.source_url;
    }, [image.source_url]);

    return (
        <canvas
            {...props}
            ref={canvasRef}
            width={image.width}
            height={image.height}
        />
    );
};

export default ImageCanvas;
