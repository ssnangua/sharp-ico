# sharp-ico

ICO encoder and decoder for [sharp](https://www.npmjs.com/package/sharp) base on [ico-endec](https://www.npmjs.com/package/ico-endec).

## Install

```bash
npm install sharp-ico
```

## Usage

### Create instances of sharp from an ICO image

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

// Set the third option to `true`, will return an object with decoding info
ico
  .sharpsFromIco("input.ico", null, true)
  .forEach((icon) => {
    icon.image.toFile(`output-${icon.width}x${icon.height}.png`);
  });
```

### Write an ICO file

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
      // more size...
    ],
    "output.ico"
  )
  .then((info) => {
    console.log(info); // { size, width, height }
  })
  .catch((err) => {
    console.error(err);
  });
```

### Decode ICO

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
