'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// eslint-disable-next-line
var grid = exports.grid = function grid(channel, frameEl, contentEl, matrix, dimensions) {
  if (channel === undefined || typeof channel !== 'number') throw new Error();
  if (frameEl === undefined || (typeof frameEl === 'undefined' ? 'undefined' : _typeof(frameEl)) !== 'object') throw new Error();
  if (contentEl === undefined || (typeof contentEl === 'undefined' ? 'undefined' : _typeof(contentEl)) !== 'object') throw new Error();
  if (matrix === undefined || !Array.isArray(matrix)) throw new Error();
  if (dimensions === undefined || !Array.isArray(dimensions)) throw new Error();
  var modFrameEl = frameEl;
  var modContentEl = contentEl;
  var width = 0;
  var height = 0;
  var hpos = void 0;
  var vpos = void 0;
  var shiftTop = 0;
  for (var i = 0; i < matrix.length; i++) {
    width = Math.max(dimensions[i].scale * dimensions[i].width * matrix[i].length + // FRAMES
    dimensions[i].padding * 2 * dimensions[i].scale + // PADDING
    dimensions[i].spacing * (matrix[i].length - 1) * dimensions[i].scale, // SPACING
    width);
    height += dimensions[i].scale * dimensions[i].height + dimensions[i].scale * dimensions[i].margin;
    for (var j = 0; j < matrix[i].length; j++) {
      if (channel === matrix[i][j]) {
        hpos = j;
        vpos = i;
      }
    }
  }
  modFrameEl.style.width = dimensions[vpos].scale * dimensions[vpos].width + 'px';
  modFrameEl.style.height = dimensions[vpos].scale * dimensions[vpos].height + 'px';
  var tX = dimensions[vpos].width * (1 - dimensions[vpos].scale) / 2;
  var tY = dimensions[vpos].height * (1 - dimensions[vpos].scale) / 2;
  var sXY = 1 / dimensions[vpos].scale;
  modFrameEl.style.transform = 'translate(' + tX + 'px,' + tY + 'px) scale(' + sXY + ',' + sXY + ')';
  modContentEl.style.width = width + 'px';
  modContentEl.style.height = height + 'px';
  for (var _i = 0; _i < vpos; _i++) {
    shiftTop += dimensions[_i].scale * dimensions[_i].height + dimensions[_i].scale * dimensions[_i].margin;
  }
  var shiftLeftPadding = dimensions[vpos].padding * dimensions[vpos].scale;
  var shiftLeftWindows = hpos * dimensions[vpos].scale * dimensions[vpos].width;
  var shiftLeftSpacing = hpos * dimensions[vpos].spacing * dimensions[vpos].scale;
  var shiftLeft = shiftLeftPadding + shiftLeftWindows + shiftLeftSpacing;
  modContentEl.style.left = '-' + shiftLeft + 'px';
  modContentEl.style.top = '-' + shiftTop + 'px';
};