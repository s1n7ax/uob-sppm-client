export default class HttpClient {
  constructor(baseURL, resource) {
    this.BASE_URL = baseURL;
    this.resource = resource;

    this.getOptions = { credentials: 'include', method: 'GET' };

    this.deleteOptions = { credentials: 'include', method: 'DELETE' };

    this.postOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    };

    this.putOptions = {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    };
  }

  buildURL(paths, queries) {
    let url;

    // OBJECT PATHS
    if (typeof paths === 'object') {
      url = this.resource.interpolate(paths);
    }

    // ARRAY PATHS
    else if (paths && paths.length > 0) {
      url = `${this.resource}/${paths.join('/')}`;
    }

    // NO PATH
    else {
      url = this.resource;
    }

    const urlObj = new URL(url, this.BASE_URL);

    if (queries && Object.keys(queries).length > 0)
      urlObj.search = new URLSearchParams(queries).toString();

    return urlObj;
  }

  async handleResponse(response) {
    if (!response.ok) throw new Error(response.status);

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('json'))
      return await response.json();

    return;
  }

  async get({ paths, queries } = {}) {
    const url = this.buildURL(paths, queries);

    const response = await fetch(url, this.getOptions);

    return this.handleResponse(response);
  }

  async post({ paths, queries, body, headers }) {
    const url = this.buildURL(paths, queries);

    const response = await fetch(url, {
      ...this.postOptions,
      headers: { ...this.postOptions.headers, ...headers },
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  async put({ paths, queries, body }) {
    const url = this.buildURL(paths, queries);

    const response = await fetch(url, {
      ...this.putOptions,
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  async delete({ paths, queries }) {
    const url = this.buildURL(paths, queries);

    const response = await fetch(url, this.deleteOptions);

    return this.handleResponse(response);
  }
}
