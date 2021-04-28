import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    role: '/org/role',
  },
};

export default class Role {
  constructor(user) {
    const userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) throw new Error('local config not found for user ' + user);

    this.client = new HttpClient(config.base_url, userConfig.role);
  }

  getAllRoles() {
    return this.client.get();
  }
}
