'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import io from 'socket.io-client';

var base = void 0;
var token = void 0;
var setBase = exports.setBase = function setBase(b) {
  base = b;
};
var authenticated = exports.authenticated = function authenticated() {
  return window.localStorage.getItem('token') !== null;
};
var login = exports.login = function login(username, password) {
  if (base === undefined) throw new Error();
  if (username === undefined || typeof username !== 'string') throw new Error();
  if (password === undefined || typeof password !== 'string') throw new Error();
  return new Promise(function (resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', base + '/api/login/', true);
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
      if (!token) {
        reject({ message: '500' });
        return;
      }
      window.localStorage.setItem('token', token);
      resolve();
    };
    xmlhttp.send('username=' + username + '&password=' + password);
  });
};
var logout = exports.logout = function logout() {
  window.localStorage.removeItem('token');
};