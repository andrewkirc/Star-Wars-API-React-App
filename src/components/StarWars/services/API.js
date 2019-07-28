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
   * @param {Function} cb - Callback
   */
  getAllPages(url, perPage, cb) {
    console.time("getCharacters");
    http.request(url)
      .then(res => {
        //Determine number of available pages.
        const _perPage = perPage || 10;
        const numOfPages = Math.floor(res.data.count / _perPage) + 1;

        //Push all requests to promises array.
        const promises = [];
        for (let i = 2; i <= numOfPages; i++) {
          promises.push(http.request(`${url}&page=${i}`));
        }

        //Calls all request methods asynchronously.
        Promise.all(promises)
          .then(responses => {
            let results = [];
            //Add first request's results to array.
            results = results.concat(res.data.results);

            //Add subsequent request's results to array.
            responses.forEach(item => {
              results = results.concat(item.data.results);
            });
            console.timeEnd("getCharacters");
            return cb(null, results);
          })
          .catch(e => {
            return cb(e);
          });
      })
      .catch(err => {
        console.error("getCharacters Error:", err);
        return cb(
          "Having trouble communicating with the Star Wars server. Try again in a few moments.",
          err
        );
      });
  }

  /** Get all Star Wars API pages, for a particular endpoint.
   * This method will wait for each result before continuing to the next.
   * @param {String} url - Accepts URL
   * @param {Function} cb - Callback
   * @deprecated
   */
  async getAllPagesWait(url, cb) {
    if (!this.apiURL) console.time("getCharacters_Old");
    http.request(url)
      .then(res => {
        this.apiURL = res.data.next;

        const arr = this.characters.concat(res.data.results);
        this.count.current = arr.length;
        this.characters = arr;
        this.count.total = res.data.count;

        if (res.data.next) {
          this.getAllPagesWait(res.data.next, cb);
        }

        if (res.data.next === null) {
          console.log("END");
          console.timeEnd("getCharacters_Old");
          return cb(null, this.characters);
        }
      })
      .catch(err => {
        console.error("getCharacters Error:", err);
        return cb(
          "Having trouble communicating with the Star Wars server. Try again in a few moments.",
          err
        );
      });
  }
}
