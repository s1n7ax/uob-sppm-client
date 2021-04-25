import config from '../config.json';

const BASE_URL = config.host.url;
const org = config.organization;

let orgFetch = fetch;

// eslint-disable-next-line no-native-reassign
fetch = (url, options) => {
  return orgFetch(url, { ...options, credentials: 'include' });
};

const fetchJson = (url, body, options) => {
  return fetch(url, {
    ...options,
    headers: {
      ...((options && options.headers) || {}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export const resolveResponse = (res) => {
  if (res.ok) return;

  throw new Error(res.status);
};

export const resolveJsonResponse = (res) => {
  if (res.ok) return res.json();

  throw new Error(res.status);
};

export const getURL = (url, params) => {
  const _url = new URL(url, BASE_URL);
  _url.search = new URLSearchParams(params).toString();

  return _url;
};

export const getTodaySales = async () => {
  return fetch(
    getURL(org.sales.url, {
      from: new Date(),
    })
  ).then(resolveJsonResponse);
};

export const getSales = async (from, to) => {
  return fetch(getURL(org.sales.url, { from, to })).then(resolveJsonResponse);
};

export const getDailySales = async (from, to) => {
  return fetch(getURL(org.sales.daily.url, { from, to })).then(
    resolveJsonResponse
  );
};

export const getBranchSales = async (from, to) => {
  return fetch(getURL(org.sales.branch.url, { from, to })).then(
    resolveJsonResponse
  );
};

export const updateBranch = async (branch) => {
  return fetchJson(getURL(org.branch.url), branch, {
    method: 'PUT',
  }).then(resolveJsonResponse);
};
export const createBranch = async (branch) => {
  return fetchJson(getURL(org.branch.url), branch, {
    method: 'POST',
  }).then(resolveJsonResponse);
};

export const getAllEmployees = async () => {
  return fetch(getURL(org.employee.url)).then(resolveJsonResponse);
};

export const getEmployeeById = async (id) => {
  return fetch(getURL(org.employee.url.interpolate({ id }))).then(
    resolveJsonResponse
  );
};

export const getAllBranches = async () => {
  return fetch(getURL(org.branch.url)).then(resolveJsonResponse);
};

export const getAllRoles = async () => {
  return fetch(getURL(org.roles.url)).then(resolveJsonResponse);
};

export const createEmployee = async (emp) => {
  return fetch(getURL(org.employee.url), emp, {
    method: 'POST',
  });
};

export const updateEmployee = async (emp) => {
  return fetch(getURL(org.employee.url), emp, {
    method: 'PUT',
  });
};

export const deleteEmployee = async (empId) => {
  return fetch(getURL(`${org.employee.url}/${empId}`), {
    method: 'DELETE',
  });
};

export const getAllCustomers = async () => {
  return fetch(getURL(org.customer.url)).then(resolveJsonResponse);
};

export const createCustomer = async (customer) => {
  return fetch(getURL(org.customer.url), customer, {
    method: 'POST',
  }).then(resolveJsonResponse);
};

export const updateCustomer = async (customer) => {
  return fetch(getURL(org.customer.url), customer, {
    method: 'PUT',
  }).then(resolveJsonResponse);
};

export const getAllPackages = async () => {
  return fetch(getURL(config.package.url)).then(resolveJsonResponse);
};

export const createPackage = async (pkg) => {
  return fetch(getURL(org.package.url), pkg, {
    method: 'POST',
  }).then(resolveJsonResponse);
};

export const updatePackage = async (pkg) => {
  return fetchJson(getURL(org.package.url), pkg, {
    method: 'PUT',
  }).then(resolveJsonResponse);
};

export const getAllServices = async () => {
  return fetch(getURL(config.service.url)).then(resolveJsonResponse);
};

export const createService = async (service) => {
  return fetchJson(getURL(org.service.url), service, {
    method: 'POST',
  }).then(resolveJsonResponse);
};

export const updateService = async (service) => {
  return fetch(getURL(org.service.url), service, {
    method: 'PUT',
  }).then(resolveJsonResponse);
};

export const getAllOutOfStock = async () => {
  const params = { filterBy: 'out_of_stock' };

  return fetch(getURL(org.stock.url, params)).then(resolveJsonResponse);
};

export const getAllInStock = async () => {
  const params = { filterBy: 'in_stock' };

  return fetch(getURL(org.stock.url, params)).then(resolveJsonResponse);
};

export const getAllOutOfStockByBranch = async (branchId) => {
  const params = { filterBy: 'out_of_stock' };

  return fetch(getURL(org.stock.url.interpolate({ branchId }), params)).then(
    resolveJsonResponse
  );
};

export const getAllInStockByBranch = async (branchId) => {
  const params = { filterBy: 'in_stock' };

  return fetch(getURL(org.stock.url.interpolate({ branchId }), params)).then(
    resolveJsonResponse
  );
};

export const createStockItem = async (stockItem) => {
  return fetchJson(
    getURL(org.stock.url.interpolate({ branchId: '' })),
    stockItem,
    {
      method: 'POST',
    }
  ).then(resolveJsonResponse);
};
export const updateStockItem = async (stockItem) => {
  return fetchJson(
    getURL(org.stock.url.interpolate({ branchId: '' })),
    stockItem,
    {
      method: 'PUT',
    }
  ).then(resolveJsonResponse);
};

export const getAllItems = async () => {
  return fetch(getURL(org.item.url)).then(resolveJsonResponse);
};

export const updateItem = async (item) => {
  return fetchJson(getURL(org.item.url), item, {
    method: 'PUT',
  }).then(resolveJsonResponse);
};

export const createItem = async (item) => {
  return fetch(getURL(org.item.url), item, {
    method: 'POST',
  }).then(resolveJsonResponse);
};

export const getAllAppointmentsByCustomer = async () => {
  return fetch(getURL(org.customer.appointment.url)).then(resolveJsonResponse);
};

export const createCustomerAppointment = async (appointment) => {
  return fetchJson(getURL(org.customer.appointment.url), appointment, {
    method: 'POST',
  }).then(resolveJsonResponse);
};

export const updateCustomerAppointment = async (appointment) => {
  return fetchJson(getURL(org.customer.appointment.url), appointment, {
    method: 'PUT',
  }).then(resolveResponse);
};

export const getCurrentUserDetails = async () => {
  return fetch(getURL(config.user.details.url)).then(resolveJsonResponse);
};

export const logout = async () => {
  return fetch(getURL(config.user.logout.url)).then(resolveResponse);
};
