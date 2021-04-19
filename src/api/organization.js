import config from '../config.json';

let BASE_URL = config.host.url;
let org = config.organization;

export const getTodaySales = async () => {
  var url = new URL(config.organization.sales.url, BASE_URL);
  let params = { from: new Date() };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getSales = async (from, to) => {
  var url = new URL(config.organization.sales.url, BASE_URL);
  let params = { from, to };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getDailySales = async (from, to) => {
  var url = new URL(config.organization.sales.daily.url, BASE_URL);
  let params = { from, to };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getBranchSales = async (from, to) => {
  var url = new URL(config.organization.sales.branch.url, BASE_URL);
  let params = { from, to };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const updateBranch = async (branch) => {
  var url = new URL(config.organization.branch.url, BASE_URL);

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(branch),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};
export const createBranch = async (branch) => {
  var url = new URL(config.organization.branch.url, BASE_URL);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(branch),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const getAllEmployees = async () => {
  var url = new URL(org.employees.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const getEmployeeById = async (id) => {
  var url = new URL(org.employee.url.interpolate({ id }), BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const getAllBranches = async () => {
  var url = new URL(config.organization.branch.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const getAllRoles = async () => {
  var url = new URL(config.organization.roles.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const createEmployee = async (emp) => {
  var url = new URL(config.organization.employee.url, BASE_URL);
  return fetch(url, {
    method: 'POSt',
    body: JSON.stringify(emp),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const updateEmployee = async (emp) => {
  var url = new URL(config.organization.employee.url, BASE_URL);
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(emp),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteEmployee = async (empId) => {
  var url = new URL(`${config.organization.employee.url}/${empId}`, BASE_URL);
  return fetch(url, {
    method: 'DELETE',
  });
};

export const getAllCustomers = async () => {
  var url = new URL(org.customer.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const createCustomer = async (customer) => {
  var url = new URL(org.customer.url, BASE_URL);
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const updateCustomer = async (customer) => {
  var url = new URL(org.customer.url, BASE_URL);
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(customer),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const getAllPackages = async () => {
  var url = new URL(config.package.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const createPackage = async (pkg) => {
  var url = new URL(org.package.url, BASE_URL);
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pkg),
  }).then((res) => res.json());
};
export const updatePackage = async (pkg) => {
  var url = new URL(org.package.url, BASE_URL);
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pkg),
  }).then((res) => res.json());
};

export const getAllServices = async () => {
  var url = new URL(config.service.url, BASE_URL);
  return fetch(url).then((res) => res.json());
};

export const createService = async (service) => {
  var url = new URL(org.service.url, BASE_URL);
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  }).then((res) => res.json());
};
export const updateService = async (service) => {
  var url = new URL(org.service.url, BASE_URL);
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  }).then((res) => res.json());
};

export const getAllOutOfStock = async () => {
  var url = new URL(org.stock.url.interpolate({ branchId: '' }), BASE_URL);

  let params = { filterBy: 'out_of_stock' };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getAllInStock = async () => {
  var url = new URL(org.stock.url.interpolate({ branchId: '' }), BASE_URL);

  let params = { filterBy: 'in_stock' };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getAllOutOfStockByBranch = async (branchId) => {
  var url = new URL(org.stock.url.interpolate({ branchId }), BASE_URL);

  let params = { filterBy: 'out_of_stock' };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const getAllInStockByBranch = async (branchId) => {
  var url = new URL(org.stock.url.interpolate({ branchId }), BASE_URL);

  let params = { filterBy: 'in_stock' };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
};

export const createStockItem = async (stockItem) => {
  var url = new URL(org.stock.url.interpolate({ branchId: '' }), BASE_URL);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(stockItem),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};
export const updateStockItem = async (stockItem) => {
  var url = new URL(org.stock.url.interpolate({ branchId: '' }), BASE_URL);

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(stockItem),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export const getAllItems = async () => {
  var url = new URL(org.item.url, BASE_URL);

  return fetch(url).then((res) => res.json());
};
