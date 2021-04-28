import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    orgService: '/org/service',
    service: '/service',
  },
  common: {
    service: '/service',
  },
};

export default class Service {
  constructor(user) {
    let userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) userConfig = localConfig['common'];

    this.userConfig = userConfig;
  }

  getClient(resource) {
    return new HttpClient(config.base_url, resource);
  }

  createService(service) {
    const client = this.getClient(this.userConfig.orgService);
    return client.post({ body: service });
  }

  updateService(service) {
    const client = this.getClient(this.userConfig.orgService);
    return client.put({ body: service });
  }

  getAllServices() {
    const client = this.getClient(this.userConfig.service);
    return client.get();
  }
}
