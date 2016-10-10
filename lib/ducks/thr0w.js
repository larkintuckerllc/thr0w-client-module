'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _authenticated = require('./authenticated');

var _authenticated2 = _interopRequireDefault(_authenticated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  authenticated: _authenticated2.default
});