// eslint-disable-next-line
export const grid = (channel, frameEl, contentEl, matrix, dimensions) => {
  if (channel === undefined || typeof channel !== 'number') throw new Error();
  if (frameEl === undefined || typeof frameEl !== 'object') throw new Error();
  if (contentEl === undefined || typeof contentEl !== 'object') throw new Error();
  if (matrix === undefined || !Array.isArray(matrix)) throw new Error();
  if (dimensions === undefined || !Array.isArray(dimensions)) throw new Error();
  const modFrameEl = frameEl;
  const modContentEl = contentEl;
  let width = 0;
  let height = 0;
  let hpos;
  let vpos;
  let shiftTop = 0;
  for (let i = 0; i < matrix.length; i++) {
    width = Math.max(
      (dimensions[i].scale * dimensions[i].width * matrix[i].length) + // FRAMES
      (dimensions[i].padding * 2 * dimensions[i].scale) + // PADDING
      (dimensions[i].spacing * (matrix[i].length - 1) * dimensions[i].scale), // SPACING
      width);
    height += (dimensions[i].scale * dimensions[i].height) +
      (dimensions[i].scale * dimensions[i].margin);
    for (let j = 0; j < matrix[i].length; j++) {
      if (channel === matrix[i][j]) {
        hpos = j;
        vpos = i;
      }
    }
  }
  modFrameEl.style.width = `${(dimensions[vpos].scale * dimensions[vpos].width)}px`;
  modFrameEl.style.height = `${(dimensions[vpos].scale * dimensions[vpos].height)}px`;
  const tX = (dimensions[vpos].width * (1 - dimensions[vpos].scale)) / 2;
  const tY = (dimensions[vpos].height * (1 - dimensions[vpos].scale)) / 2;
  const sX = (dimensions[vpos].width * (1 - dimensions[vpos].scale)) / 2;
  const sY = (dimensions[vpos].height * (1 - dimensions[vpos].scale)) / 2;
  modFrameEl.style.transform = `translate(${tX}px,${tY}px) scale(${sX},${sY})`;
  modContentEl.style.width = `${width}px`;
  modContentEl.style.height = `${height}px`;
  for (let i = 0; i < vpos; i++) {
    shiftTop += (dimensions[i].scale * dimensions[i].height) +
      (dimensions[i].scale * dimensions[i].margin);
  }
  const shiftLeftPadding = dimensions[vpos].padding * dimensions[vpos].scale;
  const shiftLeftWindows = hpos * dimensions[vpos].scale * dimensions[vpos].width;
  const shiftLeftSpacing = hpos * dimensions[vpos].spacing * dimensions[vpos].scale;
  const shiftLeft = shiftLeftPadding + shiftLeftWindows + shiftLeftSpacing;
  modContentEl.style.left = `-${shiftLeft}px`;
  modContentEl.style.top = `-${shiftTop}px`;
};
