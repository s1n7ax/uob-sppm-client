import config from '../config.json';

let BASE_URL = config.host.url;
let org = config.organization;

export const getTodaySales = async () => {
  var url = new URL(config.organization.sales.url, BASE_URL);
  let params = { from: new Date() };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
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
  var url = new URL(config.organization.branches.url, BASE_URL);
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
