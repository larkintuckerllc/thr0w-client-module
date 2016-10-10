'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeChannel = exports.setChannel = exports.getChannel = exports.SET_CHANNEL = undefined;

var _ = require('../');

var _strings = require('../strings');

// API
// REDUCER MOUNT POINT
var reducerMountPoint = 'channel';
// ACTIONS
var SET_CHANNEL = exports.SET_CHANNEL = _strings.ACTION_PREFIX + 'SET_CHANNEL';
// ACTION CREATOR VALIDATORS
var validChannel = function validChannel(value) {
  return !(value === undefined || typeof value !== 'number');
};
// SCHEMA
// REDUCERS

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _.getChannel)();
  var action = arguments[1];

  switch (action.type) {
    case SET_CHANNEL:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS


var getChannel = exports.getChannel = function getChannel(state) {
  return state[_strings.REDUCER_MOUNT_POINT][reducerMountPoint];
};
// ACTION CREATORS
var setChannel = exports.setChannel = function setChannel(value) {
  if (!validChannel(value)) throw new Error();
  return {
    type: SET_CHANNEL,
    value: value
  };
};
var removeChannel = exports.removeChannel = function removeChannel() {
  return {
    type: SET_CHANNEL,
    value: null
  };
};