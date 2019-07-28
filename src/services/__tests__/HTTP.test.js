import http from '../HTTP';

const url = "https://swapi.co/api/people/?format=json";
describe('HTTP Class', () => {
    it('Should successfully make HTTP request.', async () => {
        const response = await http.request(url, 10000);
        expect(response.status).toEqual(200);
    });
    it('Should successfully parse JSON response.', async () => {
        const response = await http.request(url, 10000);
        expect(response.data.results[0].name).toEqual("Luke Skywalker");
    });
}, 15000);