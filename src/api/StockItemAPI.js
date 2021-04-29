import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    stockItem: '/org/stock_item',
    branchStockItem: '/org/branch/${branchId}/stock_item',
  },

  manager: {
    stockItem: '/branch/stock_item',
  },
};

export default class StockItem {
  constructor(user) {
    const userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) throw new Error('local config not found for user ' + user);

    this.userConfig = userConfig;
    this.client = new HttpClient(config.base_url, userConfig.stockItem);
  }

  getClient(resource) {
    return new HttpClient(config.base_url, resource);
  }

  getAllInStock() {
    return this.client.get({ queries: { filterBy: 'in_stock' } });
  }

  getAllOutOfStock() {
    return this.client.get({ queries: { filterBy: 'out_of_stock' } });
  }

  getAllInStockByBranch(branchId) {
    return this.getClient(this.userConfig.branchStockItem).get({
      paths: { branchId },
      queries: { filterBy: 'in_stock' },
    });
  }

  getAllOutOfStockByBranch(branchId) {
    return this.getClient(this.userConfig.branchStockItem).get({
      paths: { branchId },
      queries: { filterBy: 'out_of_stock' },
    });
  }

  createStockItem(stockItem) {
    return this.client.post({ body: stockItem });
  }

  updateStockItem(stockItem) {
    return this.client.put({ body: stockItem });
  }

  getAllStockItems() {
    return this.client.get();
  }
}
