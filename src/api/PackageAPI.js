import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    orgPackage: '/org/package',
    package: '/package',
  },

  common: {
    package: '/package',
  },
};

export default class Package {
  constructor(user) {
    let userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) userConfig = localConfig['common'];

    this.userConfig = userConfig;
  }

  getClient(resource) {
    return new HttpClient(config.base_url, resource);
  }

  createPackage(pkg) {
    const client = this.getClient(this.userConfig.orgPackage);
    return client.post({ body: pkg });
  }

  updatePackage(pkg) {
    const client = this.getClient(this.userConfig.orgPackage);
    return client.put({ body: pkg });
  }

  getAllPackages() {
    const client = this.getClient(this.userConfig.package);
    return client.get();
  }
}
