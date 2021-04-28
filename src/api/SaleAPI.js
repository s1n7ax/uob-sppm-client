import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    sale: '/org/sale',
    branchSale: '/org/branch/sale',
  },
  manager: {
    sale: '/branch/sale',
  },
};

export default class Sale {
  constructor(user) {
    const userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) throw new Error('local config not found for user ' + user);

    this.client = new HttpClient(config.base_url, userConfig.sale);
  }

  getClient(resource) {
    return new HttpClient(config.base_url, resource);
  }

  createSale(sale) {
    return this.client.post({ body: sale });
  }

  updateSale(sale) {
    return this.client.put({ body: sale });
  }

  getAllSales(from, to) {
    if (from || to) return this.client.get({ queries: { from, to } });

    return this.client.get();
  }

  getAllBranchSales(from, to) {
    if (from || to)
      return this.getClient(this.userConfig.branchSale).get({
        queries: { from, to },
      });

    return this.getClient(this.userConfig.branchSale).get();
  }

  getDailySales(from, to) {
    return this.client.get({ queries: { from, to } });
  }

  getTodaySales() {
    return this.client.get({ queries: { from: new Date() } });
  }
}
