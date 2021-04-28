import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  common: {
    userDetails: '/user/details',
  },
};

export default class UserDetails {
  constructor() {
    const userConfig = localConfig['common'];

    this.client = new HttpClient(config.base_url, userConfig.userDetails);
  }

  getPublicUserDetails() {
    return this.client.get();
  }
}
