import config from '../config.json';

const BASE_URL = config.host.url;
const org = config.organization;

export const getTodaySales = async () => {
  const url = new URL(config.organization.sales.url, BASE_URL);
  const params = { from: new Date() };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getSales = async (from, to) => {
  const url = new URL(config.organization.sales.url, BASE_URL);
  const params = { from, to };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getDailySales = async (from, to) => {
  const url = new URL(config.organization.sales.daily.url, BASE_URL);
  const params = { from, to };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getBranchSales = async (from, to) => {
  const url = new URL(config.organization.sales.branch.url, BASE_URL);
  const params = { from, to };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const updateBranch = async (branch) => {
  const url = new URL(config.organization.branch.url, BASE_URL);

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(branch),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};
export const createBranch = async (branch) => {
  const url = new URL(config.organization.branch.url, BASE_URL);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(branch),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const getAllEmployees = async () => {
  const url = new URL(org.employees.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const getEmployeeById = async (id) => {
  const url = new URL(org.employee.url.interpolate({ id }), BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const getAllBranches = async () => {
  const url = new URL(config.organization.branch.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const getAllRoles = async () => {
  const url = new URL(config.organization.roles.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const createEmployee = async (emp) => {
  const url = new URL(config.organization.employee.url, BASE_URL);
  return fetch(url, {
    method: 'POSt',
    body: JSON.stringify(emp),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const updateEmployee = async (emp) => {
  const url = new URL(config.organization.employee.url, BASE_URL);
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(emp),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deconsteEmployee = async (empId) => {
  const url = new URL(`${config.organization.employee.url}/${empId}`, BASE_URL);
  return fetch(url, {
    method: 'DELETE',
  });
};

export const getAllCustomers = async () => {
  const url = new URL(org.customer.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const createCustomer = async (customer) => {
  const url = new URL(org.customer.url, BASE_URL);
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const updateCustomer = async (customer) => {
  const url = new URL(org.customer.url, BASE_URL);
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(customer),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const getAllPackages = async () => {
  const url = new URL(config.package.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const createPackage = async (pkg) => {
  const url = new URL(org.package.url, BASE_URL);
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pkg),
  }).then((res) => res.json());
};
export const updatePackage = async (pkg) => {
  const url = new URL(org.package.url, BASE_URL);
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pkg),
  }).then((res) => res.json());
};

export const getAllServices = async () => {
  const url = new URL(config.service.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const createService = async (service) => {
  const url = new URL(org.service.url, BASE_URL);
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  }).then((res) => res.json());
};
export const updateService = async (service) => {
  const url = new URL(org.service.url, BASE_URL);
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  }).then((res) => res.json());
};

export const getAllOutOfStock = async () => {
  const url = new URL(org.stock.url.interpolate({ branchId: '' }), BASE_URL);

  const params = { filterBy: 'out_of_stock' };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getAllInStock = async () => {
  const url = new URL(org.stock.url.interpolate({ branchId: '' }), BASE_URL);

  const params = { filterBy: 'in_stock' };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getAllOutOfStockByBranch = async (branchId) => {
  const url = new URL(org.stock.url.interpolate({ branchId }), BASE_URL);

  const params = { filterBy: 'out_of_stock' };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getAllInStockByBranch = async (branchId) => {
  const url = new URL(org.stock.url.interpolate({ branchId }), BASE_URL);

  const params = { filterBy: 'in_stock' };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const createStockItem = async (stockItem) => {
  const url = new URL(org.stock.url.interpolate({ branchId: '' }), BASE_URL);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(stockItem),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};
export const updateStockItem = async (stockItem) => {
  const url = new URL(org.stock.url.interpolate({ branchId: '' }), BASE_URL);

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(stockItem),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const getAllItems = async () => {
  const url = new URL(org.item.url, BASE_URL);

  return fetch(url).then((res) => res.json());
};

export const updateItem = async (item) => {
  const url = new URL(org.item.url, BASE_URL);

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const createItem = async (item) => {
  const url = new URL(org.item.url, BASE_URL);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const getAllAppointmentsByCustomer = async () => {
  const url = new URL(org.customer.appointment.url, BASE_URL);

  return fetch(url, {
    headers: {
      Authorization: 'Basic Y3VzdG9tZXI6Y3VzdG9tZXI=',
    },
  }).then((res) => res.json());
};

export const createCustomerAppointment = async (appointment) => {
  const url = new URL(org.customer.appointment.url, BASE_URL);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(appointment),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic Y3VzdG9tZXI6Y3VzdG9tZXI=',
    },
  }).then((res) => res.json());
};

export const updateCustomerAppointment = async (appointment) => {
  const url = new URL(org.customer.appointment.url, BASE_URL);

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(appointment),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic Y3VzdG9tZXI6Y3VzdG9tZXI=',
    },
  }).then((res) => res.json());
};
