import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    customer: '/org/customer',
  },

  customer: {
    customer: '/customer',
  },
  '': {
    customer: '/org/customer',
  },
};

export default class Customer {
  constructor(user) {
    const userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) throw new Error('local config not found for user ' + user);

    this.client = new HttpClient(config.base_url, userConfig.customer);
  }

  createCustomer(customer) {
    return this.client.post({ body: customer });
  }

  updateCustomer(customer) {
    return this.client.put({ body: customer });
  }

  getAllCustomers() {
    return this.client.get();
  }
}
