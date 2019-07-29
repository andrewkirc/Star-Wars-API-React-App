export default class HTTP {
  /** HTTP Request
   * @param {String} url - Accepts URL
   * @param {Number} timeout - Future request timeout in milliseconds implementation.
   * @param {Object} [options] - Accepts Fetch API options (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options)
   * @returns {Object} { status: 200, data: {} }
   */
  static async request(url, timeout, options) {
    try {
      const resp = await fetch(url, options);
      const jsonData = await resp.json();
      return {
        status: resp.status,
        data: jsonData
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
