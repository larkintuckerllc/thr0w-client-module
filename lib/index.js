'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.logout = exports.login = exports.authenticated = exports.getChannel = exports.setBaseSocket = exports.setBaseHttp = undefined;

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
var connect = exports.connect = function connect(c, msgCb) {
  if (baseSocket === undefined) throw new Error();
  if (!authenticated()) throw new Error();
  if (c === undefined || typeof c !== 'number') throw new Error();
  if (msgCb === undefined || typeof msgCb !== 'function') throw new Error();
  if (socket !== null) return Promise.resolve();
  return new Promise(function (resolve, reject) {
    var connected = false;
    var timeout = window.setTimeout(function () {
      socket.disconnect();
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