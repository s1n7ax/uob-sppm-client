import config from '../config.json';

const BASE_URL = config.host.url;

export const login = async (username, password) => {
  const url = new URL(config.user.login.url, BASE_URL);

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(username + ':' + password),
    },
  }).then((res) => {
    if (res.ok) return res.json();

    throw new Error(res.status);
  });
};
