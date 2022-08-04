import { Sharp, SharpOptions } from "sharp";
import { ImageData as BmpData } from "sharp-bmp";

export declare type IcoBuffer = Buffer;
export declare type PngOrBmpBuffer = Buffer;
export declare type SharpBuffer = Buffer;
export declare type ImageType = "png" | "bmp";

/**
 * ICO data
 * @param width - width of the image, maximum of 256
 * @param height - height of the image, maximum of 256
 * @param colors - number of colors
 * @param colorPlanes - color planes of an ICO image
 * @param bitsPerPixel - bits per pixel of an ICO image
 * @param horizontalHotspot - horizontal hotspot of a CUR image
 * @param verticalHotspot - vertical hotspot of a CUR image
 * @param imageSize - (interal) size of imageData's buffer
 * @param imageOffset - (interal) offset start of the image data
 * @param imageType - 'png' or 'bmp'
 * @param imageData - image data of the icon
 * @param data - sharp image data
 * @param bmpData - if imageType is 'bmp', will contains the bmp data
 * @param image - instance of sharp
 * @public
 */
export declare interface ImageData {
  width: number;
  height: number;
  colors: number;
  colorPlanes: number;
  bitsPerPixel: number;
  horizontalHotspot: number;
  verticalHotspot: number;
  imageSize: number;
  imageOffset: number;
  imageType: ImageType;
  imageData: PngOrBmpBuffer;
  data: SharpBuffer;
  bmpData?: BmpData;
  image?: Sharp;
}

export declare interface OutputInfo {
  height: number;
  width: number;
  size: number;
}

/**
 * Decode ICO
 */
export declare function decode(buffer: IcoBuffer): ImageData[];

/**
 * Encode ICO
 */
export declare function encode(bufferList: PngOrBmpBuffer[]): IcoBuffer;

/**
 * Create instances of sharp from an ICO image
 */
export declare function sharpsFromIco(
  input: string | Buffer,
  options?: SharpOptions,
  resolveWithObject?: Boolean
): Sharp[] | ImageData[];

/**
 * Write an ICO file
 */
export declare function sharpsToIco(
  icons: Sharp[],
  fileOut: string
): Promise<OutputInfo>;
