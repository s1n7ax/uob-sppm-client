import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    employee: '/org/employee',
  },

  manager: {
    employee: '/employee',
  },
};

export default class Employee {
  constructor(user) {
    const userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) throw new Error('local config not found for user ' + user);

    this.client = new HttpClient(config.base_url, userConfig.employee);
  }

  createEmployee(employee) {
    return this.client.post({ body: employee });
  }

  updateEmployee(employee) {
    return this.client.put({ body: employee });
  }

  getAllEmployees() {
    return this.client.get();
  }
}
