'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offMessage = exports.onMessage = exports.thr0w = exports.connect = exports.disconnect = exports.logout = exports.login = exports.authenticated = exports.getChannel = exports.setBaseSocket = exports.setBaseHttp = undefined;

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseHttp = void 0;
var baseSocket = void 0;
var channelStorage = parseInt(window.localStorage.getItem('thr0w_channel'), 10);
var channel = isNaN(channelStorage) ? null : channelStorage;
var token = window.localStorage.getItem('thr0w_token');
var socket = null;
var setBaseHttp = exports.setBaseHttp = function setBaseHttp(b) {
  baseHttp = b;
};
var setBaseSocket = exports.setBaseSocket = function setBaseSocket(b) {
  baseSocket = b;
};
var getChannel = exports.getChannel = function getChannel() {
  return channel;
};
var authenticated = exports.authenticated = function authenticated() {
  return token !== null;
};
var login = exports.login = function login(username, password) {
  if (baseHttp === undefined) throw new Error();
  if (username === undefined || typeof username !== 'string') throw new Error();
  if (password === undefined || typeof password !== 'string') throw new Error();
  return new Promise(function (resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', baseHttp + '/api/login/', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function () {
      var status = xmlhttp.status;
      if (xmlhttp.readyState !== 4) return;
      if (status !== 200) {
        reject({ message: status.toString() });
        return;
      }
      try {
        token = JSON.parse(xmlhttp.responseText).token;
      } catch (error) {
        reject({ message: '500' });
        return;
      }
      if (token === null) {
        reject({ message: '500' });
        return;
      }
      window.localStorage.setItem('thr0w_token', token);
      resolve();
    };
    xmlhttp.send('username=' + username + '&password=' + password);
  });
};
var logout = exports.logout = function logout() {
  window.localStorage.removeItem('thr0w_token');
};
var disconnect = exports.disconnect = function disconnect() {
  if (socket === null) return;
  socket.disconnect();
  window.localStorage.removeItem('thr0w_channel');
  socket = null;
  channel = null;
};
var connect = exports.connect = function connect(c, msgCb) {
  if (baseSocket === undefined) throw new Error();
  if (!authenticated()) throw new Error();
  if (c === undefined || typeof c !== 'number') throw new Error();
  if (msgCb === undefined || typeof msgCb !== 'function') throw new Error();
  if (socket !== null) return Promise.resolve();
  return new Promise(function (resolve, reject) {
    var connected = false;
    var timeout = window.setTimeout(function () {
      if (socket !== null) socket.disconnect();
      socket = null;
      reject({ message: '500' });
    }, 5000);
    var authenticate = function authenticate() {
      socket.emit('authenticate', JSON.stringify({ token: token, channel: c }));
    };
    socket = (0, _socket2.default)(baseSocket);
    socket.on('authenticated', function () {
      if (connected) return;
      connected = true;
      channel = c;
      window.localStorage.setItem('thr0w_channel', channel.toString());
      window.clearTimeout(timeout);
      socket.on('message', msgCb);
      // TODO: HANDLE DUPLICATE
      socket.on('duplicate', function () {});
      resolve(channel);
    });
    socket.on('reconnect', authenticate);
    authenticate();
  });
};
var thr0w = exports.thr0w = function thr0w(channels, message) {
  if (socket == null) throw new Error();
  if (channels === undefined || !Array.isArray(channels)) {
    throw new Error();
  }
  if (message === undefined) throw new Error();
  if (channels.length === 0) {
    return;
  }
  socket.emit('thr0w', JSON.stringify({ channels: channels, message: message }));
};
var onMessage = exports.onMessage = function onMessage(messageCb) {
  if (socket == null) throw new Error();
  if (messageCb === undefined || typeof messageCb !== 'function') throw new Error();
  socket.on('message', messageCb);
};
var offMessage = exports.offMessage = function offMessage(messageCb) {
  if (socket == null) throw new Error();
  if (messageCb === undefined || typeof messageCb !== 'function') throw new Error();
  socket.off('message', messageCb);
};