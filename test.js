const fs = require("fs");
const sharp = require("sharp");
const ico = require("./index");
const bmp = require("sharp-bmp");

if (!fs.existsSync("./out")) fs.mkdirSync("./out");

/**
 * Create instances of sharp from an ICO image
 */
// ico.sharpsFromIco("input.ico").forEach(async (icon, index) => {
//   icon.toFile(`out/output-${index}.png`);
//   const metadata = await icon.metadata();
//   icon.toFile(`out/output-${metadata.width}x${metadata.height}.png`);
// });

/**
 * Return an object with decoding info
 */
// ico.sharpsFromIco("input.ico", null, true).forEach((icon) => {
//   console.log(icon);
//   icon.image.toFile(`out/output-${icon.width}x${icon.height}.png`);
// });

/**
 * Write an ICO file
 */
// ico
//   .sharpsToIco(
//     [
//       sharp("input-256x256.png"),
//       bmp.sharpFromBmp("input-64x64.bmp"),
//       sharp("input-32x32.png"),
//     ],
//     "out/output.ico"
//   )
//   .then((info) => {
//     console.log(info);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

/**
 * Decode ICO
 */
// const buffer = fs.readFileSync("input.ico");
// const icons = ico.decode(buffer);
// icons.forEach((icon) => {
//   if (icon.imageType === "png") {
//     sharp(icon.data).toFile(`out/output-${icon.width}x${icon.height}.png`);
//   } else {
//     // icon.imageType === "bmp"
//     const image = sharp(icon.data, {
//       raw: {
//         width: icon.width,
//         height: icon.height,
//         channels: 4,
//       },
//     });
//     image.toFile(`out/output-${icon.width}x${icon.height}.jpg`);
//     bmp.sharpToBmp(image, `out/output-${icon.width}x${icon.height}.bmp`);
//   }
// });

/**
 * Encode ICO
 */
// (async () => {
//   const icons = [
//     sharp("input-256x256.png"),
//     bmp.sharpFromBmp("input-64x64.bmp"),
//     sharp("input-32x32.png"),
//   ];
//   const bufferList = [];
//   for (let i = 0; i < icons.length; i++) {
//     const buffer = await icons[i].toFormat("png").toBuffer();
//     bufferList.push(buffer);
//   }
//   const icoBuffer = ico.encode(bufferList);
//   fs.writeFileSync("out/output.ico", icoBuffer);

//   console.log(icoBuffer.length); // size of output.ico
// })();
