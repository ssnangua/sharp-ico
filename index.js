const fs = require("fs");
const sharp = require("sharp");
const ico = require("ico-endec");
const bmp = require("sharp-bmp");

function decode(buffer) {
  return ico.decode(buffer).map((icon) => {
    if (icon.imageType === "png") {
      return Object.assign(icon, { data: icon.imageData });
    } else {
      const bmpData = bmp.decode(icon.imageData);
      return Object.assign(icon, {
        data: bmpData.data,
        bmpData,
      });
    }
  });
}

function encode(bufferList) {
  return ico.encode(bufferList);
}

function sharpsFromIco(input, options, resolveWithObject = false) {
  const buffer = typeof input === "string" ? fs.readFileSync(input) : input;
  return decode(buffer).map((icon) => {
    const image =
      icon.imageType === "png"
        ? sharp(icon.data, options || {})
        : sharp(icon.data, {
            ...options,
            raw: {
              width: icon.width,
              height: icon.height,
              channels: 4,
            },
          });
    return resolveWithObject ? Object.assign(icon, { image }) : image;
  });
}

async function sharpsToIco(imageList, fileOut) {
  const bufferList = [];
  for (let i = 0; i < imageList.length; i++) {
    const buffer = await imageList[i]
      .toFormat("png")
      .toBuffer({ resolveWithObject: true });
    bufferList.push(buffer);
  }
  try {
    const icoBuffer = ico.encode(bufferList.map((buffer) => buffer.data));
    fs.writeFileSync(fileOut, icoBuffer);
    return {
      width: Math.max(...bufferList.map((buffer) => buffer.info.width)),
      height: Math.max(...bufferList.map((buffer) => buffer.info.height)),
      size: icoBuffer.length,
    };
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  encode,
  decode,
  sharpsFromIco,
  sharpsToIco,
};
