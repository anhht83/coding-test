/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') > -1) {
    return response.json();
  }

  if (contentType && contentType.indexOf('application/json') < 0) {
    return response.blob();
  }
  return null;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') > -1) {
    return response.json().then(json => window.Promise.reject(json));
  }
  throw new Error(response.statusText);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = {}) {
  const {headers = {}} = options;
  headers['Content-Type'] = 'application/json';
  if (options.body) options.body = JSON.stringify(options.body);
  return fetch(url, {...options, headers})
    .then(checkStatus)
    .then(parseJSON);
}
