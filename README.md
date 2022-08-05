# sharp-ico

ICO encoder and decoder for [sharp](https://www.npmjs.com/package/sharp) base on [ico-endec](https://www.npmjs.com/package/ico-endec).

## Install

```bash
npm install sharp-ico
```

## Usage

### Create instances of sharp from an ICO image

#### `ico.sharpsFromIco(input, options?, resolveWithObject?)`

- `input` (string | Buffer) - A String containing the filesystem path to an ICO image file, or a Buffer containing ICO image data.
- `options` Object (optional) - sharp constructor [options](https://sharp.pixelplumbing.com/api-constructor#parameters).
- `resolveWithObject` boolean (optional) - Return an array of Object containing `image` (instance of sharp) properties and decoding info instead of only instance of sharp. Default by `false`.

Returns `Sharp[] | ImageData[]` - Return an array of instances of sharp or Object containing `image` (instance of sharp) properties and decoding info.

```js
const ico = require("sharp-ico");

ico
  .sharpsFromIco("input.ico", {
    // sharp constructor options
  }) // returns an array of instance of sharp
  .forEach(async (icon, index) => {
    icon.toFile(`output-${index}.png`);

    // Or
    const metadata = await icon.metadata();
    icon.toFile(`output-${metadata.width}x${metadata.height}.png`);
  });

// Set the third option to `true`, will return objects with decoding info
ico
  .sharpsFromIco("input.ico", null, true)
  .forEach((icon) => {
    icon.image.toFile(`output-${icon.width}x${icon.height}.png`);
  });
```

### Write an ICO file

#### `ico.sharpsToIco(icons, fileOut, options?)`

- `icons` Sharp[] - An array of instance of sharp.
- `fileOut` string - The path to write the image data to.
- `options` Object (optional)
  - `sizes` (number[] | `"default"`) - Array of sizes to use when resizing. `"default"` equal to `[256, 128, 64, 48, 32, 24, 16]`.
  - `resizeOptions` Object (optional) - sharp resize [options](https://sharp.pixelplumbing.com/api-resize#parameters).

Returns `Promise<Object>` - Resolve with an Object containing `size`, `width`, `height` properties.

```js
const sharp = require("sharp");
const ico= require("sharp-ico");
const bmp = require("sharp-bmp"); // if need to write bmp icons

ico
  .sharpsToIco(
    [
      sharp("input-256x256.png"),
      bmp.sharpFromBmp("input-64x64.bmp"),
      sharp("input-32x32.png"),
      // more sizes...
    ],
    "output.ico"
  )
  .then((info) => {
    console.log(info); // { size, width, height }
  })
  .catch((err) => {
    console.error(err);
  });

// sizes options
ico
  .sharpsToIco(
    [
      sharp("input-256x256.png")
    ],
    "output.ico",
    {
      sizes: [64, 32, 24],
      // sizes: "default", // equal to [256, 128, 64, 48, 32, 24, 16]
      resizeOptions: {}, // sharp resize optinos
    }
  ); // will output a 64x64 ico image (with 32x32 and 24x24 sizes)
```

### Decode ICO

#### `ico.decode(buffer)`

- `buffer` Buffer - A Buffer containing ICO image data.

Returns `Object[]` - Return an array of Object contains the following decoding info:

- `width` number - width of the image, maximum of `256`.
- `height` number - height of the image, maximum of `256`.
- `imageSize` number - (interal) size of imageData's buffer.
- `imageType` string - `"png"` or `"bmp"`.
- `imageData` Buffer - Original image data of the icon.
- `data` Buffer - sharp image data.
- `bmpData` Object - If `imageType` is `"bmp"`, will contains the bmp image data.
- ... (See `index.d.ts` for more detail.)

```js
const fs = require("fs");
const sharp = require("sharp");
const ico = require("sharp-ico");

const buffer = fs.readFileSync("input.ico");
const icons = ico.decode(buffer);

icons.forEach((icon) => {
  if (icon.imageType === "png") {
    sharp(icon.data).toFile(`output-${icon.width}x${icon.height}.png`);
  } else { // icon.imageType === "bmp"
    const image = sharp(icon.data, {
      raw: {
        width: icon.width,
        height: icon.height,
        channels: 4,
      },
    }).toFile(`output-${icon.width}x${icon.height}.jpg`);
  }
});
```

### Encode ICO

#### `ico.encode(bufferList)`

- `bufferList` Buffer[] - An array of Buffer containing PNG or BMP image data.

Returns `Buffer` - Return a buffer containing ICO image data.

```js
const fs = require("fs");
const sharp = require("sharp");
const ico = require("sharp-ico");
const bmp = require("sharp-bmp"); // if need to write bmp icons

(async () => {
  const icons = [
    sharp("input-256x256.png"),
    bmp.sharpFromBmp("input-64x64.bmp"),
    sharp("input-32x32.png"),
  ];
  const bufferList = [];
  for (let i = 0; i < icons.length; i++) {
    const buffer = await icons[i].toFormat("png").toBuffer();
    bufferList.push(buffer);
  }
  const icoBuffer = ico.encode(bufferList);
  fs.writeFileSync("output.ico", icoBuffer);

  console.log(icoBuffer.length); // size of output.ico
})();
```

## Change Log

### 0.1.1

- `sharpsToIco` support `sizes` option
