import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    item: '/org/item',
  },
};

export default class Item {
  constructor(user) {
    const userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) throw new Error('local config not found for user ' + user);

    this.client = new HttpClient(config.base_url, userConfig.item);
  }

  createItem(item) {
    return this.client.post({ body: item });
  }

  updateItem(item) {
    return this.client.put({ body: item });
  }

  getAllItems() {
    return this.client.get();
  }
}
