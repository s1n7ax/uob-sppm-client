import config from '../config.json';
import HttpClient from './HttpClient';

const localConfig = {
  admin: {
    appointment: '/org/appointment',
  },
  manager: {
    appointment: '/branch/appointment',
  },
  customer: {
    appointment: '/customer/appointment',
  },
};

export default class Appointment {
  constructor(user) {
    const userConfig = localConfig[user.toLowerCase()];

    if (!userConfig) throw new Error('local config not found for user ' + user);

    this.client = new HttpClient(config.base_url, userConfig.appointment);
  }

  createAppointment(appointment) {
    return this.client.post({ body: appointment });
  }

  updateAppointment(appointment) {
    return this.client.put({ body: appointment });
  }

  getAllAppointments() {
    return this.client.get();
  }
}
