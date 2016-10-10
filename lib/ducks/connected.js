'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnect = exports.connect = exports.getConnected = exports.SET_CONNECTED_ERROR = exports.SET_CONNECTED_SUCCESS = exports.SET_CONNECTED_REQUEST = undefined;

var _redux = require('redux');

var _ = require('../');

var fromThr0wClientModule = _interopRequireWildcard(_);

var _channel = require('./channel');

var _exceptions = require('../util/exceptions');

var _strings = require('../strings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// API
// REDUCER MOUNT POINT
var reducerMountPoint = 'connected';
// ACTIONS
var SET_CONNECTED_REQUEST = exports.SET_CONNECTED_REQUEST = _strings.ACTION_PREFIX + 'SET_CONNECTED_REQUEST';
var SET_CONNECTED_SUCCESS = exports.SET_CONNECTED_SUCCESS = _strings.ACTION_PREFIX + 'SET_CONNECTED_SUCCESS';
var SET_CONNECTED_ERROR = exports.SET_CONNECTED_ERROR = _strings.ACTION_PREFIX + 'SET_CONNECTED_ERROR';
// ACTION CREATOR VALIDATORS
// SCHEMA
// REDUCERS
var value = function value() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case SET_CONNECTED_SUCCESS:
      return action.value;
    default:
      return state;
  }
};
var isSetting = function isSetting() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case SET_CONNECTED_REQUEST:
      return true;
    case SET_CONNECTED_SUCCESS:
    case SET_CONNECTED_ERROR:
      return false;
    default:
      return state;
  }
};
var settingErrorMessage = function settingErrorMessage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case SET_CONNECTED_ERROR:
      return action.message;
    case SET_CONNECTED_REQUEST:
    case SET_CONNECTED_SUCCESS:
      return null;
    default:
      return state;
  }
};
exports.default = (0, _redux.combineReducers)({
  value: value,
  isSetting: isSetting,
  settingErrorMessage: settingErrorMessage
});
// ACCESSORS

var getConnected = exports.getConnected = function getConnected(state) {
  return state[_strings.REDUCER_MOUNT_POINT][reducerMountPoint].value;
};
// ACTION CREATORS
var connect = exports.connect = function connect() {
  return function (dispatch, getState) {
    dispatch({
      type: SET_CONNECTED_REQUEST,
      value: true
    });
    return fromThr0wClientModule.connect((0, _channel.getChannel)(getState()), function () {}).then(function () {
      dispatch({
        type: SET_CONNECTED_SUCCESS,
        value: true
      });
    }, function (error) {
      dispatch({
        type: SET_CONNECTED_ERROR,
        message: error.message
      });
      throw new _exceptions.Thr0wException(error.message);
    });
  };
};
var disconnect = exports.disconnect = function disconnect() {
  return function (dispatch) {
    dispatch({
      type: SET_CONNECTED_REQUEST,
      value: false
    });
    fromThr0wClientModule.disconnect();
    dispatch({
      type: SET_CONNECTED_SUCCESS,
      value: false
    });
  };
};