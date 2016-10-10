'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.getAuthenticated = exports.SET_AUTHENTICATED_ERROR = exports.SET_AUTHENTICATED_SUCCESS = exports.SET_AUTHENTICATED_REQUEST = undefined;

var _redux = require('redux');

var _ = require('../');

var fromThr0wClientModule = _interopRequireWildcard(_);

var _exceptions = require('../util/exceptions');

var _strings = require('../strings');

var fromStrings = _interopRequireWildcard(_strings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// API
// REDUCER MOUNT POINT
var reducerMountPoint = 'authenticated';
// ACTIONS
var SET_AUTHENTICATED_REQUEST = exports.SET_AUTHENTICATED_REQUEST = fromStrings.ACTION_PREFIX + 'SET_AUTHENTICATED_REQUEST';
var SET_AUTHENTICATED_SUCCESS = exports.SET_AUTHENTICATED_SUCCESS = fromStrings.ACTION_PREFIX + 'SET_AUTHENTICATED_SUCCESS';
var SET_AUTHENTICATED_ERROR = exports.SET_AUTHENTICATED_ERROR = fromStrings.ACTION_PREFIX + 'SET_AUTHENTICATED_ERROR';
// ACTION CREATOR VALIDATORS
// SCHEMA
// REDUCERS
var value = function value() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fromThr0wClientModule.authenticated();
  var action = arguments[1];

  switch (action.type) {
    case SET_AUTHENTICATED_SUCCESS:
      return action.value;
    default:
      return state;
  }
};
var isSetting = function isSetting() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case SET_AUTHENTICATED_REQUEST:
      return true;
    case SET_AUTHENTICATED_SUCCESS:
    case SET_AUTHENTICATED_ERROR:
      return false;
    default:
      return state;
  }
};
var settingErrorMessage = function settingErrorMessage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case SET_AUTHENTICATED_ERROR:
      return action.message;
    case SET_AUTHENTICATED_REQUEST:
    case SET_AUTHENTICATED_SUCCESS:
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

var getAuthenticated = exports.getAuthenticated = function getAuthenticated(state) {
  return state[reducerMountPoint].value;
};
// ACTION CREATORS
var login = exports.login = function login(username, password) {
  return function (dispatch) {
    dispatch({
      type: SET_AUTHENTICATED_REQUEST,
      value: true
    });
    return fromThr0wClientModule.login(username, password).then(function () {
      dispatch({
        type: SET_AUTHENTICATED_SUCCESS,
        value: true
      });
    }, function (error) {
      dispatch({
        type: SET_AUTHENTICATED_ERROR,
        message: error.message
      });
      throw new _exceptions.Thr0wException(error.message);
    });
  };
};
var logout = exports.logout = function logout() {
  return function (dispatch) {
    dispatch({
      type: SET_AUTHENTICATED_REQUEST,
      value: false
    });
    fromThr0wClientModule.logout();
    dispatch({
      type: SET_AUTHENTICATED_SUCCESS,
      value: false
    });
  };
};