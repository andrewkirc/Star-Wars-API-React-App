//Services
import http from "../../../services/HTTP";

export default class API {
  constructor() {
    this.apiURL = undefined;
    this.count = {
      total: undefined,
      current: undefined
    };
    this.characters = [];
    this.charactersFiltered = [];
  }

  /** Get all Star Wars API pages, for a particular endpoint.
   * @param {String} url - Accepts URL
   * @param {Number} [perPage=10] - Number of results per page. This is used to calculate total number of pages.
   */
  async getAllPages(url, perPage) {
    try {
      var res = await http.request(url);
    } catch (err) {
      return this.connectionError(err);
    }

    //Determine number of available pages.
    const _perPage = perPage || 10;
    const numOfPages = Math.floor(res.data.count / _perPage) + 1;

    //Push all requests to promises array.
    const promises = [];
    for (let i = 2; i <= numOfPages; i++) {
      promises.push(http.request(`${url}&page=${i}`));
    }

    //Calls all request methods asynchronously.
    try {
      var promiseAll = await Promise.all(promises);
    } catch (err) {
      return this.connectionError(err);
    }

    //Add first request's results to array.
    let results = [];
    results = results.concat(res.data.results);

    //Add subsequent request's results to array.
    promiseAll.forEach(item => {
      results = results.concat(item.data.results);
    });
    return results;
  }

  /** Get all Star Wars API pages, for a particular endpoint.
   * This method will wait for each result before continuing to the next.
   * @param {String} url - Accepts URL
   * @deprecated
   */
  async getAllPagesWait(url) {
    //Make API request
    try {
      var res = await http.request(url);
      this.apiURL = res.data.next;
    } catch (err) {
      return this.connectionError(err);
    }

    //Concat results to array.
    const arr = this.characters.concat(res.data.results);
    this.count.current = arr.length;
    this.characters = arr;
    this.count.total = res.data.count;

    //If a next URL is found, recursively call getAllPagesWait again.
    if (res.data.next) {
      return this.getAllPagesWait(res.data.next);
    }

    //If a next URL is NOT found, return promise.
    if (res.data.next === null) {
      return this.characters;
    }
  }

  connectionError = (err) => {
    return Promise.reject({
      error: err,
      message: "Having trouble communicating with the Star Wars server. Try again in a few moments."
    });
  }
}
