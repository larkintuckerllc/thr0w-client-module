'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _authenticated = require('./authenticated');

var _authenticated2 = _interopRequireDefault(_authenticated);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _connected = require('./connected');

var _connected2 = _interopRequireDefault(_connected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  authenticated: _authenticated2.default,
  channel: _channel2.default,
  connected: _connected2.default
});