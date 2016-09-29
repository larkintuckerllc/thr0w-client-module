// import io from 'socket.io-client';

let base;
let token;
export const setBase = (b) => {
  base = b;
};
export const authenticated = () =>
  window.localStorage.getItem('token') !== null;
export const login = (username, password) => {
  if (base === undefined) throw new Error();
  if (username === undefined || typeof username !== 'string') throw new Error();
  if (password === undefined || typeof password !== 'string') throw new Error();
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST',
      `${base}/api/login/`, true);
    xmlhttp.setRequestHeader('Content-type',
      'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = () => {
      const status = xmlhttp.status;
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
    xmlhttp.send(`username=${username}&password=${password}`);
  });
};
export const logout = () => {
  window.localStorage.removeItem('token');
};
