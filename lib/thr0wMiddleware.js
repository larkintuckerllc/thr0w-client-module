'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _connected = require('./ducks/connected');

exports.default = function (actionTypes, channels) {
  // TODO: VALIDATE
  var actionTypesLookup = {};
  for (var i = 0; i < actionTypes.length; i++) {
    actionTypesLookup[actionTypes[i]] = true;
  }
  return function (store) {
    var handleMessage = function handleMessage(data) {
      if (data.source !== (0, _.getChannel)()) {
        store.dispatch(data.message);
      }
    };
    return function (next) {
      return function (action) {
        if (action.type === _connected.SET_CONNECTED_SUCCESS && action.value) {
          (0, _.onMessage)(handleMessage);
        }
        if (action.type === _connected.SET_CONNECTED_REQUEST && !action.value) {
          (0, _.offMessage)(handleMessage);
        }
        if ((0, _connected.getConnected)(store.getState()) && !action.thr0w && actionTypesLookup[action.type] !== undefined) {
          var newAction = action;
          newAction.thr0w = true;
          (0, _.thr0w)(channels, newAction);
        }
        return next(action);
      };
    };
  };
};