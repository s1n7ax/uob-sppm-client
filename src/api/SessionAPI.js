import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  common: {
    login: '/login',
    logout: '/logout',
  },
};

export default class Session {
  constructor() {
    this.userConfig = localConfig['common'];
  }

  getClient(resource) {
    return new HttpClient(config.base_url, resource);
  }

  login(username, password) {
    return this.getClient(this.userConfig.login).post({
      body: { username, password },
    });
  }

  logout() {
    return this.getClient(this.userConfig.logout).get();
  }
}
