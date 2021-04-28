import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    branch: '/org/branch',
  },
  manager: {
    branch: '/org/branch',
  },
  customer: {
    branch: '/branch',
  },
};

export default class Branch {
  constructor(user) {
    const userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) throw new Error('local config not found for user ' + user);

    this.userConfig = userConfig;
    this.client = new HttpClient(config.base_url, userConfig.branch);
  }

  getClient(resource) {
    return new HttpClient(config.base_url, resource);
  }

  createBranch(branch) {
    return this.client.post({ body: branch });
  }

  updateBranch(branch) {
    return this.client.put({ body: branch });
  }

  getAllBranches() {
    return this.getClient(this.userConfig.branch).get();
  }
}
